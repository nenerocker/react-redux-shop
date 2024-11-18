import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AddCart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart data from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Calculate total price
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toLocaleString("en-US");
  };

  // Remove item from the cart
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="container mx-auto p-4">
      <h4 style={{ fontSize: "30px" }}>Your Cart</h4>
      <Link to={`/`}>
        <button className="rounded bg-green-500 px-3 py-1 text-white">Back</button>
      </Link>

      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className=" items-center justify-between border-b py-2">
              <div className="Cart">
                <img src={item.image} alt={item.title} width="150px" height="150px" />
                <p style={{ fontSize: "20px" }}>{item.title}</p>
                <p style={{ fontSize: "14px" }}>Price: {item.price}$</p>
              </div>
              <div>
                <button
                  className="rounded bg-red-500 px-3 py-1 text-white"
                  onClick={() => handleRemove(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: "20px", fontSize: "20px" }}>
            <p>
              <strong>Total Price: {calculateTotalPrice()}$</strong>
            </p>
          </div>
        </>
      ) : (
        <p style={{ fontSize: "20px", marginTop: "20px" }}>Your cart is empty.</p>
      )}
    </div>
  );
};

export default AddCart;
