import React, { useState } from "react";
import "./Register.scss";
import SellerForm from "../../components/sellerForm/SellerForm";
import BuyerForm from "../../components/buyerForm/BuyerForm";
import axios from "axios";
import upload from "../../utils/upload";
import newRequest from "../../utils/newrequest";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const [file, setFile] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAccountSelection = (type) => {
    setAccountType(type);

    if (type === "Seller") {
      setUser((prev) => ({ ...prev, isSeller: true }));
    } else {
      setUser((prev) => ({ ...prev, isSeller: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = await upload(file);
    try {
      const res = await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      if (res?.status === 201) {
        toast.success(res?.data);
        navigate("/login");
      } else {
        toast.error("Username or Email is already exist!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register layout">
      {!accountType && (
        <div className="account-selection">
          <h2>Choose Your Account Type</h2>
          <div className="options">
            <button
              className="btn buyer"
              onClick={() => handleAccountSelection("Buyer")}
            >
              Buyer Account
            </button>
            <button
              className="btn seller"
              onClick={() => handleAccountSelection("Seller")}
            >
              Seller Account
            </button>
          </div>
        </div>
      )}

      {accountType && (
        <h1>
          Create a new{" "}
          <span style={{ color: "#1dbf73" }}>{accountType.toLowerCase()}</span>{" "}
          account
        </h1>
      )}

      {/* Display BuyerForm when accountType is "Buyer" */}
      {accountType === "Buyer" && (
        <BuyerForm
          user={user}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          setFile={setFile}
          loading={loading}
        />
      )}

      {/* Display SellerForm when accountType is "Seller" */}
      {accountType === "Seller" && (
        <SellerForm
          handleSubmit={handleSubmit}
          user={user}
          setFile={setFile}
          handleInputChange={handleInputChange}
          loading={loading}
        />
      )}
    </div>
  );
}

export default Register;
