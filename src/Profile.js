import { useEffect, useState } from "react";

export default function Profile({ token }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      // Recupera utenti salvati in locale
      const users = JSON.parse(localStorage.getItem("users")) || [];
      
      // Recupera l'username dal token fittizio (localToken_<timestamp>)
      // Assumiamo che tu salvi anche il nome utente corrente in localStorage
      const currentUsername = localStorage.getItem("current_user");
      
      if (currentUsername) {
        const foundUser = users.find(u => u.username === currentUsername);
        if (foundUser) setUser(foundUser);
      }
    }
  }, [token]);

  if (!user) return <p>Caricamento...</p>;

  return (
    <div className="reservation-page">
      <h2 style={{ color: "var(--primary-yellow)", textAlign: "center" }}>Profilo</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Nome:</strong> {user.first_name}</p>
      <p><strong>Cognome:</strong> {user.last_name}</p>
      <p><strong>Indirizzo:</strong> {user.address || "—"}</p>
    </div>
  );
}
