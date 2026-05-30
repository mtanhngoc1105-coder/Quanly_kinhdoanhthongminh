import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const { register, login } = useAuthStore();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password
    ) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setLoading(true);

    try {
      const result = await register(formData);
      setLoading(false);

      if (result && result.success) {
        // if API returned created user data, auto-login
        if (result.data) {
          login(result.data);
          navigate(result.data.roleId === 2 || result.data.role === "manager" ? "/admin" : "/");
          return;
        }

        setSuccess("Đăng ký thành công! Chuyển đến trang đăng nhập...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError((result && result.message) || "Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      setLoading(false);
      setError("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.");
      console.error("Register error:", err);
    }
  };

  return (
    <div className="auth-container auth-container-single">
      <div className="auth-left">
        <h2 className="auth-card-title">Đăng Ký Tài Khoản</h2>

        <form className="auth-form" onSubmit={handleRegister}>
          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <input
            type="text"
            name="fullName"
            placeholder="Họ tên"
            value={formData.fullName}
            onChange={handleChange}
            disabled={loading}
            className="auth-input"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            className="auth-input"
          />

          <div className="auth-field-group">
            <label className="field-label">Đăng ký với vai trò</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
              className="auth-input"
            >
              <option value="user">Người dùng</option>
              <option value="manager">Người quản lý</option>
            </select>
          </div>

          <input
            type="password"
            name="password"
            placeholder="Mật khẩu (ít nhất 6 ký tự)"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            className="auth-input"
          />

          <button type="submit" disabled={loading} className="primary-btn">
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        <p className="register-link">
          Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  formCard: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    background: "#fff",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  submitBtn: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#2e7d32",
    color: "#fff",
    cursor: "pointer",
  },

  error: {
    color: "red",
    textAlign: "center",
    backgroundColor: "#ffe6e6",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px",
  },

  success: {
    color: "green",
    textAlign: "center",
    backgroundColor: "#e6ffe6",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px",
  },

  loginLink: {
    marginTop: "20px",
    textAlign: "center",
  },
};

export default RegisterForm;