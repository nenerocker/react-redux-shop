import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  editUser, fetchUser } from "../reducers/userSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const UserEdit = () => {
  const [userData, setUserData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image:"",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser);
    }
  }, [currentUser]);

  const handleSave = async () => {
    const result = userData.id
       await dispatch(editUser(userData))

    if (result.success) {
      setMessage("User saved successfully.");
      setIsError(false);
      history.push("/"); // Redirect after successful save
    } else {
      setMessage(result.message || "An error occurred.");
      setIsError(true);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        name="title"
        value={userData.title}
        onChange={handleChange}
        placeholder="title"
        className="mb-2 w-full rounded border p-2"
      />
      <input
        type="email"
        name="price"
        value={userData.price}
        onChange={handleChange}
        placeholder="price"
        className="mb-2 w-full rounded border p-2"
      />
      <input
        type="text"
        name="description"
        value={userData.description}
        onChange={handleChange}
        placeholder="description"
        className="mb-4 w-full rounded border p-2"
      />
      <input
        type="text"
        name="category"
        value={userData.category}
        onChange={handleChange}
        placeholder="category"
        className="mb-4 w-full rounded border p-2"
      />
      <input
        type="text"
        name="image"
        value={userData.image}
        onChange={handleChange}
        placeholder="image"
        className="mb-4 w-full rounded border p-2"
      />
      {message && <div className={isError ? "text-red-500" : "text-green-500"}>{message}</div>}
      <Link to={`/`}>
      <button onClick={handleSave} className="rounded bg-green-500 px-4 py-2 text-white">
        Save
      </button>
      </Link>
      <Link to={`/`}>
              <button className="rounded bg-green-500 px-3 py-1 text-white">back</button>
            </Link>
    </div>
  );
};

export default UserEdit;