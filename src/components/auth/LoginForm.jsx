import React, { useState } from "react";
import useAuthStore from "../../stores/authStore";
import { useNavigate, Link } from "react-router-dom";
import { loginApi as defaultLoginApi, googleLogin, facebookLogin } from "../../services/authService";
import "../../assets/styles/loginForm.css";

function LoginForm({ loginApi, defaultRole }) {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(defaultRole || "user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) return setError("Vui lòng nhập đầy đủ thông tin");

    setLoading(true);
    try {
      const apiToUse = loginApi || defaultLoginApi;
      const res = await apiToUse(email, password, role);
      let user = null;
      if (Array.isArray(res) && res.length > 0) user = res[0];
      else if (res && typeof res === "object" && res.email) user = res;

      if (user) {
        login(user);
        setLoading(false);
        navigate(role === "manager" ? "/admin" : "/");
      } else {
        setLoading(false);
        setError("Sai email hoặc mật khẩu");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };

  const handleSocialLogin = async (provider) => {
    setError("");
    setLoading(true);
    try {
      let res = null;
      if (provider === "google") res = await googleLogin();
      else if (provider === "facebook") res = await facebookLogin();

      let user = Array.isArray(res) && res.length > 0 ? res[0] : res;
      if (user) {
        login(user);
        navigate(role === "manager" ? "/admin" : "/");
      } else {
        setError("Đăng nhập xã hội thất bại");
      }
    } catch (err) {
      console.error(err);
      setError("Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-tabs">
          <button
            className={"tab " + (role === "user" ? "active" : "")}
            onClick={() => setRole("user")}
            type="button"
          >
            Người mua
          </button>
          <button
            className={"tab " + (role === "manager" ? "active" : "")}
            onClick={() => setRole("manager")}
            type="button"
          >
            Quản lý
          </button>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          {error && <div className="auth-error">{error}</div>}

          <label className="field-label">Email</label>
          <div className="input-with-icon">
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              disabled={loading}
              className="auth-input"
            />
          </div>

          <label className="field-label">Mật khẩu</label>
          <div className="input-with-icon">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="●●●●●●●●"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              disabled={loading}
              className="auth-input"
            />
            <button
              type="button"
              className="show-hide"
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? "Ẩn" : "Hiện"}
            </button>
          </div>

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập ngay"}
          </button>

          <div className="divider">Hoặc đăng nhập với</div>

          <div className="social-row">
            <button type="button" className="social google" onClick={() => handleSocialLogin('google')} disabled={loading}>Google</button>
            <button type="button" className="social facebook" onClick={() => handleSocialLogin('facebook')} disabled={loading}>Facebook</button>
          </div>

          <p className="register-link">Hoặc <Link to="/register">đăng ký</Link> nếu chưa có tài khoản</p>
        </form>
      </div>

      <div className="auth-right" aria-hidden>
        <div
          className="illustration"
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL || ''}/image/ai/robot.png)` }}
        />
      </div>
    </div>
  );
}

export default LoginForm;