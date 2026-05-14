import React, { useEffect, useState } from "react";
import Clock from "./Clock";
import "./App.css";

const clocks = [
  { city: "L.A.", timezone: "America/Los_Angeles" },
  { city: "Hong Kong", timezone: "Asia/Hong_Kong" },
  { city: "New York", timezone: "America/New_York" },
  { city: "Dublin", timezone: "Europe/Dublin" },
  { city: "Paris", timezone: "Europe/Paris" },
  { city: "Jakarta", timezone: "Asia/Jakarta" },
  { city: "Tokyo", timezone: "Asia/Tokyo" },
];

function App() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="app-container" aria-label="World clocks">
      <section className="clock-list">
        {clocks.map((c) => (
          <Clock key={c.city} city={c.city} timezone={c.timezone} now={now} />
        ))}
      </section>
    </main>
  );
}

export default App;