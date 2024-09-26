import React from "react";
import "./SellerForm.scss";
import { ClipLoader } from "react-spinners";
const SellerForm = ({
  user,
  handleInputChange,
  handleSubmit,
  loading,
  setFile,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="inner_div">
        <div className="item">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            value={user.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="item">
          {" "}
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="item">
          {" "}
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="item">
          <label htmlFor="img">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="item">
          {" "}
          <label htmlFor="country">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Pakistan"
            value={user.country}
            onChange={handleInputChange}
          />
        </div>
        <div className="item">
          <label htmlFor="username">Phone</label>
          <input
            name="phone"
            type="text"
            placeholder="+92 41414141"
            value={user.phone}
            onChange={handleInputChange}
          />
        </div>{" "}
        <div className="item">
          <label htmlFor="username">Descrition</label>
          <textarea
            name="desc"
            placeholder="Description"
            value={user.desc}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button type="submit">
        Register {loading && <ClipLoader color="white" size={19} />}
      </button>
    </form>
  );
};

export default SellerForm;
