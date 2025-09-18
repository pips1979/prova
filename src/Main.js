// Header.js
import { Helmet } from "react-helmet";

export default function Main() {
  return (
    <main>
      <Helmet>
        <title>Home - Little Lemon</title>
        <meta name="description" content="Benvenuto nella home del sito Little Lemon" />
      </Helmet>
      <h1>Benvenuto su Little Lemon</h1>
    </main>
  );
}