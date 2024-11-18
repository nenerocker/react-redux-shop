import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers, deleteUser } from "../reducers/userSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  // State for cart items
  const [cart, setCart] = useState([]);

  // Load cart data from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Add item to the cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      // Prevent duplicates
      const isAlreadyInCart = prevCart.some((cartItem) => cartItem.id === item.id);
      if (isAlreadyInCart) {
        return prevCart;
      }
      return [...prevCart, item];
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="mb-4 text-lg font-semibold">Product List</h3>
      <Link to="/cart">
        <button className="rounded bg-green-500 px-3 py-1 text-white">Your Cart ({cart.length})</button>
      </Link>
      {users.map((user) => (
        <div key={user.id} className="flex items-center justify-between border-b py-2">
          <div>
            <p>
              <img src={user.image} width="250px" height="250px" alt={user.title} />
            </p>
            <p style={{ fontSize: "40px" }}>{user.title}</p>
            <p style={{ fontSize: "20px" }}>Price: {user.price}$</p>
            <p style={{ display: "flex", width: "50%" }}>Description: {user.description}</p>
            <p>Category: {user.category}</p>
            <p>Count: {user.count}</p>
          </div>
          <div>

            <button
              className="rounded bg-green-500 px-3 py-1 text-white"
              onClick={() => addToCart(user)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
