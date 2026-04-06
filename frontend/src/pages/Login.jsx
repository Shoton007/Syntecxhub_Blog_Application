import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loginUser } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8080/user/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, 
        }
      );

      if (res.data.success) {
        loginUser(res.data.user, res.data.token);
        toast.success(res.data.message || "Login Success!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-pink-200 py-12 mx-auto flex items-center justify-center">
      <div className="w-full bg-white max-w-md p-8 border shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-5 mt-5">
          <input name="email" value={formData.email} onChange={onChangeHandler} type="email" placeholder="Your Email" className="p-3 border rounded outline-none" required />
          <input name="password" value={formData.password} onChange={onChangeHandler} type="password" placeholder="Password" className="p-3 border rounded outline-none" required />
          <button disabled={loading} className="bg-orange-600 text-white py-3 rounded font-bold hover:bg-orange-700">
            {loading ? "Please wait..." : "Signin"}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600 font-medium">
          Don't have an account? <Link to="/register" className="text-orange-600 hover:underline">Register Here</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;