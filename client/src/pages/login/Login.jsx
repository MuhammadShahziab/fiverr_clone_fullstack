import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newrequest.js";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await newRequest.post("/auth/login", { username, password });

      localStorage.setItem("currentUser", JSON.stringify(res?.data));
      if (res?.status === 200) {
        navigate("/");
        toast.success("login");
      }
    } catch (error) {
      setError(error.response?.data || "An error occurred");
      toast.error(error.response?.data || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login layout">
      <div className="left">
        <img src="/img/fiverr.png" alt="logo" />
      </div>
      <div className="right">
        <form onSubmit={handleSubmit}>
          <h1>Sign in</h1>

          <div className="input_div">
            <label htmlFor="">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Shahzaib"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input_div">
            <label htmlFor="">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <span
            style={{
              color: "red",
              fontWeight: 500,
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {error && error}{" "}
          </span>

          <button disabled={loading || !username || !password} type="submit">
            Login {loading && <ClipLoader color="white" size={19} />}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
