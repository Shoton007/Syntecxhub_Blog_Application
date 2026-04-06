import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8080/user/register", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Registration Successful!");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-pink-200 py-12 flex items-center justify-center">
      <div className="w-full bg-white max-w-md p-8 border shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">Create Account</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-5 mt-5">
          <input name="name" value={formData.name} onChange={onChangeHandler} type="text" placeholder="Full Name" className="p-3 border rounded outline-none" required />
          <input name="email" value={formData.email} onChange={onChangeHandler} type="email" placeholder="Email Address" className="p-3 border rounded outline-none" required />
          <input name="password" value={formData.password} onChange={onChangeHandler} type="password" placeholder="Password" className="p-3 border rounded outline-none" required />
          <button disabled={loading} className="bg-orange-600 text-white py-3 rounded font-bold hover:bg-orange-700">
            {loading ? "Creating..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600 font-medium">
          Already have an account? <Link to="/login" className="text-orange-600 hover:underline">Login Here</Link>
        </p>
      </div>
    </div>
  );
};
export default Signup;