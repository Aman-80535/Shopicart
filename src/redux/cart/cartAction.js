import {  createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc, setDoc, arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';
import {app, db } from '../../firebase';
import { getAuth } from "firebase/auth";

const auth = getAuth(app);


export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (item, { rejectWithValue }) => {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");
  
        const cartRef = doc(db, "carts", user.uid);
  
        // Fetch the current cart
        const cartSnap = await getDoc(cartRef);
  
        let updatedItems = [];
  
        if (cartSnap.exists()) {
          const cartData = cartSnap.data();
          const existingItems = cartData.items || [];
  
          // Check if the item already exists
          const itemIndex = existingItems.findIndex(
            (cartItem) => cartItem.id === item.id
          );
  
          if (itemIndex > -1) {
            // If item exists, update its quantity
            updatedItems = existingItems.map((cartItem, index) =>
              index === itemIndex
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            );
          } else {
            // If item doesn't exist, add it with quantity 1
            updatedItems = [...existingItems, { ...item, quantity: 1 }];
          }
        } else {
          // If no cart exists, create a new one with the item
          updatedItems = [{ ...item, quantity: 1 }];
        }
  
        // Update Firestore with the new cart items
        await setDoc(
          cartRef,
          {
            items: updatedItems,
          },
          { merge: true }
        );
  
        return updatedItems; // Return the updated items
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  
  // Async Thunk to Fetch Cart Items
  export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");
  
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);
        console.log("before",cartSnap.data().items)
        if (cartSnap.exists()) {
            console.log("ewdwea",cartSnap.data().items)
          return cartSnap.data().items;
        } else {
          return [];
        }
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  // Async Thunk to Remove an Item from the Cart
  export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (itemId, { rejectWithValue }) => {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");
  
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);
  
        if (cartSnap.exists()) {
          const cartData = cartSnap.data();
          const updatedItems = cartData.items.filter((item) => item.id !== itemId); // Remove item by ID
  
          // Update Firestore with the filtered items
          await updateDoc(cartRef, {
            items: updatedItems,
          });
  
          return updatedItems; // Return the updated cart items
        } else {
          throw new Error("Cart not found");
        }
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

  
  // Async Thunk to Update Cart Item Quantity
  export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ itemId, newQuantity }, { rejectWithValue }) => {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");
  
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);
  
        if (cartSnap.exists()) {
          const cartData = cartSnap.data();
          const updatedItems = cartData.items.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          );
  
          await updateDoc(cartRef, {
            items: updatedItems,
          });
  
          return updatedItems;
        }
        throw new Error("Cart not found");
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const decrementQuantity = createAsyncThunk(
    "cart/decrementQuantity",
    async (itemId, { rejectWithValue }) => {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");
  
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);
        console.log("cwefiwe",cartSnap === true)
        if (cartSnap.exists()) {
          const cartData = cartSnap.data();
          const updatedItems = cartData.items
            .map((cartItem) =>
              cartItem.id === itemId
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            )
            .filter((cartItem) => cartItem.quantity > 0); // Remove items with 0 quantity
  
          // Update Firestore
          await setDoc(cartRef, { items: updatedItems }, { merge: true });
  
          return updatedItems;
        }
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

  export const incrementQuantity = createAsyncThunk(
    "cart/incrementQuantity",
    async (itemId, { rejectWithValue }) => {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");
  
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);
        console.log("cwefiwe",cartSnap === true)
        if (cartSnap.exists()) {
          const cartData = cartSnap.data();
          const updatedItems = cartData.items
            .map((cartItem) =>
              cartItem.id === itemId
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
            .filter((cartItem) => cartItem.quantity > 0); // Remove items with 0 quantity
  
          // Update Firestore
          await setDoc(cartRef, { items: updatedItems }, { merge: true });
  
          return updatedItems;
        }
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );