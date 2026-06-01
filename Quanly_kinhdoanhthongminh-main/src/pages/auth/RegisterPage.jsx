import "../../assets/styles/loginForm.css";
import RegisterForm from "../../components/auth/RegisterForm";

function RegisterPage() {
  return (
    <div className="auth-page">
      <h1>Đăng ký</h1>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;