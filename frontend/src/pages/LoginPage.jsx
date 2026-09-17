import React, { useState } from "react";
import useAppStore from "../store/appStore";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(() => location.state?.message || "");
  const api_url = useAppStore((state) => state.api_url);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  React.useEffect(() => {
    if (location.state?.message) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const url = isLogin
      ? `${api_url}/login`
      : `${api_url}/register`;

    const payload = isLogin
      ? {
          username: formData.username,
          password: formData.password,
        }
      : {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        };

    try {
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;

      if (isLogin) {
        localStorage.setItem("access_token", data.access_token);
        navigate("/app/dashboard");
      } else {
        localStorage.setItem("pending_verification_email", data.email);
        navigate("/otp", { state: { email: data.email } });
      }
    } catch (error) {
      console.error(error);

      const detail = error.response?.data?.detail;
      const fallback = error.response
        ? `Authentication endpoint returned ${error.response.status}.`
        : "Unable to connect to the server. Please try again.";
      setMessage(detail || fallback);
      toast.error(detail || fallback);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: "",
      email: "",
      password: "",
    });
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-blue-950/50 backdrop-blur-xl">
        <div className="grid min-h-[650px] md:grid-cols-2">
          
          {/* Left / Branding Section */}
          <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 p-12 md:flex md:flex-col md:justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_35%)]" />

            <div className="relative z-10">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold text-white shadow-lg backdrop-blur">
                ✦
              </div>

              <h1 className="max-w-md text-4xl font-bold leading-tight text-white">
                Welcome to your
                <span className="block text-blue-200">
                  digital space.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-blue-100/80">
                Securely access your account, manage your profile,
                and enjoy a seamless experience from anywhere.
              </p>
            </div>

            <div className="relative z-10">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
                <p className="text-sm leading-6 text-blue-50/80">
                  "Simple, secure, and designed to give you a
                  beautiful experience every time you sign in."
                </p>
              </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -bottom-10 -left-10 h-44 w-44 rounded-full border border-white/10" />
          </div>

          {/* Form Section */}
          <div className="relative flex items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-md">
              
              {/* Mobile Logo */}
              <div className="mb-8 flex items-center gap-3 md:hidden">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-600/30">
                  ✦
                </div>
                <span className="text-xl font-bold text-white">
                  YourApp
                </span>
              </div>

              {/* Heading */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  {isLogin ? "Welcome back" : "Create your account"}
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  {isLogin
                    ? "Enter your details to access your account."
                    : "Join us today and get started in minutes."}
                </p>
              </div>

              {/* Login / Register Switch */}
              <div className="relative mb-8 flex rounded-xl bg-slate-900/80 p-1">
                <div
                  className={`absolute top-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-lg bg-blue-600 shadow-lg shadow-blue-600/20 transition-all duration-500 ease-in-out ${
                    isLogin
                      ? "left-1"
                      : "left-[calc(50%+3px)]"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => {
                    if (!isLogin) switchMode();
                  }}
                  className={`relative z-10 w-1/2 rounded-lg py-2.5 text-sm font-semibold transition-colors duration-300 ${
                    isLogin
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (isLogin) switchMode();
                  }}
                  className={`relative z-10 w-1/2 rounded-lg py-2.5 text-sm font-semibold transition-colors duration-300 ${
                    !isLogin
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Register
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Username
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                      @
                    </span>

                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      placeholder="Enter your username"
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-3.5 pl-11 pr-4 text-white outline-none transition-all placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                {/* Email - Register only */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isLogin
                      ? "grid-rows-[0fr] opacity-0"
                      : "grid-rows-[1fr] opacity-100"
                  }`}
                >
                  <div className="overflow-hidden">
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Email address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required={!isLogin}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3.5 text-white outline-none transition-all placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-300">
                      Password
                    </label>

                    {isLogin && (
                      <button
                        type="button"
                        className="text-xs font-medium text-blue-400 transition hover:text-blue-300"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3.5 text-white outline-none transition-all placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                {/* Message */}
                {message && (
                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-300">
                    {message}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-900/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="relative z-10">
                    {loading
                      ? "Please wait..."
                      : isLogin
                      ? "Sign in"
                      : "Create account"}
                  </span>

                  <div className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
                </button>
              </form>

              {/* Bottom switch */}
              <p className="mt-8 text-center text-sm text-slate-500">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={switchMode}
                  className="font-semibold text-blue-400 transition hover:text-blue-300"
                >
                  {isLogin ? "Create one" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;