import { useState, useEffect } from "react";
import Hero from "./Hero";
import Specials from "./Specials";
import Testimonials from "./Testimonials";
import { fetchAPI } from "./apiesterna";

export default function Main({ token }) {
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    const today = new Date();
    const times = fetchAPI(today);
    setAvailableTimes(times);
  }, []);

  return (
    <main>
      <Hero token={token} availableTimes={availableTimes} />
      <Specials />
      <Testimonials />
    </main>
  );
}





