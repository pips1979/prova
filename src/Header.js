
// Header.js
import logo from './assets/Logo.svg';

export default function Header({ user, onLogout }) {
  return (
    <header>
      <img src={logo} alt="Little Lemon Logo" height="100" />
      <div style={{ float: "right" }}>
        {user ? (
          <>
            <span>Benvenuto, {user.first_name}!</span>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <a href="/login">Login</a>
        )}
      </div>
    </header>
  );
}

