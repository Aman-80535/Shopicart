import { createAsyncThunk } from '@reduxjs/toolkit';
import { db, app } from '../../firebase';
import { doc, getDoc, setDoc, arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(app);;

export const waitForUser = () => new Promise((resolve) => {
  const checkUser = () => {
    if (auth.currentUser) {
      console.log(auth.currentUser);
      resolve(auth.currentUser);
    } else {
      setTimeout(checkUser, 100);
    }
  };
  checkUser();
})

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (_, { rejectWithValue }) => {

    const user = await waitForUser(); 

    if (!user) {
      return rejectWithValue('No user is logged in');
    }

    try {
      const userDocRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        return docSnap.data(); 
      } else {
        throw new Error('No user data found');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const logoutUser = createAsyncThunk(
  'logoutUser',
  async (_, { rejectWithValue }) => {
    const auth = getAuth();
    try {
      await signOut(auth);
      return true; 
    } catch (error) {
      return rejectWithValue(error.message); 
    }
  }
);


export const fetchProducts = createAsyncThunk(
  "/products",
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products`);
      if (!response.ok) {
        throw new Error("Failed to fetch products data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


