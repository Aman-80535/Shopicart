import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/CartPopup.css"
import { decrementQuantity, incrementQuantity, removeFromCart } from "../redux/cart/cartAction";

const CartPopup = ({ setIsOpen, isOpen, togglePopup }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const closePopup = () => setIsOpen(false);

  const handleDecrement = async (itemID) => {
    try{
      await dispatch(decrementQuantity(itemID))
    }
    catch(error){
      console.log(error.message)
    }
  }

  const handleIncrement = async (itemID) => {
    try{
      await dispatch(incrementQuantity(itemID))
    }
    catch(error){
      console.log(error.message)
    }
  }

  const removeItemFromCart = async (itemID) => {
    try{
      await dispatch(removeFromCart(itemID))
    }
    catch(error){
      console.log(error.message)
    }
  }

  return (
    <div>

      {isOpen && (
        <div className="cart-popup" onClick={closePopup}>
          <div
            className="cart-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h4>Your Cart</h4>
            {items.map((item) => (
              <div style={{ padding: "0px 0px 18px" }}>
                <hr />
                <div key={item?.id}>
                  <img src={item?.images?.[0]} alt="" width="50px" height="70px" className="float-start" />
                </div>
                <p>{item.title}</p>
                <div>
                  <button style={{float: "right", textColor: "black"}} onClick={() =>removeItemFromCart(item.id)}>X</button>
                  <p> ${item.price}</p>
                </div>


                <div style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center"
                }}>
                  <button style={{ background: "#ce88a8" }} onClick={() =>handleDecrement(item.id)}>-</button>
                  <button style={{ background: "grey" }}>{item.quantity}</button>
                  <button onClick={() => handleIncrement(item.id)}>+</button>
                </div>
              </div>
            ))}

            <hr />
            <p>
              Total: $
              {items.reduce(
                (total, item) => total + item.quantity * item.price,
                0
              )}
            </p>
            <button onClick={togglePopup}>Close</button>

          </div>
        </div>
      )
      }
    </div >
  );
};

export default CartPopup;
