import React, { useEffect, useState } from "react";
import AppFooter from "./components/AppFooter";
import ReloadPrompt from "./components/ReloadPrompt";
import { getBuildMetadata } from "./buildMetadata";
import Clock from "./Clock";
import "./App.css";

const clocks = [
  { city: "L.A.", timezone: "America/Los_Angeles" },
  { city: "New York", timezone: "America/New_York" },
  { city: "Dublin", timezone: "Europe/Dublin" },
  { city: "Jakarta", timezone: "Asia/Jakarta" },
  { city: "Hong Kong", timezone: "Asia/Hong_Kong" },
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
    <div className="app-shell">
      <main className="app-container" aria-label="World clocks">
        <section className="clock-list">
          {clocks.map((c) => (
            <Clock key={c.city} city={c.city} timezone={c.timezone} now={now} />
          ))}
        </section>
      </main>
      <AppFooter {...getBuildMetadata()} />
      <ReloadPrompt />
    </div>
  );
}

export default App;
