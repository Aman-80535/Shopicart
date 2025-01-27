import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../redux/cart/cartAction";
import { useDispatch } from "react-redux";


const auth = getAuth(app);

export const LogIn = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      console.log("User ID Token:", idToken);
      localStorage.setItem("userToken", idToken);

      alert("Login successful!");
      const cartData = dispatch(fetchCart()); 
      navigate("/")
    } catch (error) {
      setError(error.message);
      console.error("Error logging in:", error.message);
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      {error && (
        <div
          className="error-container"
          style={{
            color: "red",
            textAlign: "center",
            padding: "10px",
            fontSize: "16px",
            wordWrap: "break-word",
          }}
        >
          {error}
        </div>
      )}
      <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px" }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

