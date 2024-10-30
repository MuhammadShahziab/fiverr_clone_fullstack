import React, { useRef, useState } from "react";
import "./Profile.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import GetColor from "../../components/GetColor";
import newRequest from "../../utils/newrequest";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";
import upload from "../../utils/upload";
const Profile = () => {
  const currentUser = getCurrentUser();
  const [user, setUser] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    country: currentUser?.country || "",
    desc: currentUser?.desc || "",
    img: currentUser?.img || "",
  });
  const [loading, setloading] = useState(false);
  const imgRef = useRef();
  console.log(user);
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    try {
      const url = await upload(file);
      setUser((prev) => ({ ...prev, img: url }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const updateUser = {
        phone: user.phone,
        country: user.country,
        desc: user.desc,
        img: user.img,
      };

      const updatedUser = await newRequest.post("/users/update", updateUser); // Change to `put` for update

      if (updatedUser.status === 200) {
        localStorage.setItem("currentUser", JSON.stringify(updatedUser.data));
        toast.success("Updated successfully");
        setUser(updatedUser.data); // Update user state in your component
      }

      l;
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="profile layout">
      <h1>Profile</h1>
      <div className="container">
        <div className="left">
          {user.img ? (
            <div className="user" onClick={() => imgRef.current.click()}>
              <img src={user?.img} alt="user" />
            </div>
          ) : (
            <p
              onClick={() => imgRef.current.click()}
              style={{ backgroundColor: GetColor(currentUser?.username) }}
            >
              {currentUser?.username.charAt()}
            </p>
          )}

          <input
            onChange={handleImage}
            ref={imgRef}
            type="file"
            style={{ display: "none" }}
          />
        </div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <div className="input_div">
              <label htmlFor="">Username</label>
              <input
                type="text"
                name="username"
                value={currentUser.username}
                placeholder="username"
                id=""
                disabled
              />
            </div>
            <div className="input_div">
              <label htmlFor="">Email</label>
              <input
                type="text"
                name="email"
                value={currentUser.email}
                disabled
                placeholder="email"
                id=""
              />
            </div>
            <div className="input_div">
              <label htmlFor="">Country</label>
              <input
                type="text"
                name="country"
                value={user.country}
                onChange={handleChange}
                placeholder="country"
                id=""
              />
            </div>
            <div className="input_div">
              <label htmlFor="">Phone</label>
              <input
                type="number"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                placeholder="+92123456789"
                id=""
              />
            </div>
            <div className="input_div">
              <label htmlFor="">About</label>
              <textarea
                rows={5}
                name="desc"
                value={user.desc}
                onChange={handleChange}
                placeholder="About yourself"
              />
            </div>
            <button>
              Submit{" "}
              {loading ? <ClipLoader color="white" size={20}></ClipLoader> : ""}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
