import { useEffect, useState } from "react";
//import { getProfile } from "./Api";

export default function Profile({ token }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      getProfile(token)
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));
    }
  }, [token]);

  if (!user) return <p>Caricamento...</p>;

  return (
    <div>
      <h2>Profilo</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Nome: {user.first_name}</p>
      <p>Cognome: {user.last_name}</p>
      <p>Indirizzo: {user.address}</p>
    </div>
  );
}
