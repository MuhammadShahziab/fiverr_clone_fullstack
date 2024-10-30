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
    setLoading(true);
    setError(null); // Clear previous errors before starting the request

    try {
      const res = await newRequest.post("/auth/login", { username, password });

      if (res.status === 200) {
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        toast.success("Login successful");
        navigate("/");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
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
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Shahzaib"
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError(null); // Clear error when user starts typing
              }}
              required
            />
          </div>
          <div className="input_div">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(null); // Clear error when user starts typing
              }}
              required
            />
          </div>

          {error && (
            <span
              style={{
                color: "red",
                fontWeight: 500,
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              {error}
            </span>
          )}

          <button disabled={loading || !username || !password} type="submit">
            Login {loading && <ClipLoader color="white" size={19} />}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
