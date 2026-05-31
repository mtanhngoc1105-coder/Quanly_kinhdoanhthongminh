import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">

      <div className="logo">
        <Link to="/">
          Smart Food
        </Link>
      </div>

      <div className="header-right">
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
      </div>

    </header>
  );
}

export default Header;