import LoginForm from "../../components/auth/LoginForm";

import { loginApi } from "../../services/authService";

function LoginPage() {

  return (
    <div className="auth-page">

      <h1>Đăng nhập</h1>

      <LoginForm
        loginApi={loginApi}
      />

    </div>
  );
}

export default LoginPage;