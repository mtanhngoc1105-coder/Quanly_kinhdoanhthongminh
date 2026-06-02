import LoginForm from "../../components/auth/LoginForm";
import { useLocation } from 'react-router-dom';

function LoginPage() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const role = params.get('role');

  return <LoginForm defaultRole={role || undefined} />;
}

export default LoginPage;