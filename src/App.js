import React from "react";
import Clock from "./Clock";
import "./App.css";

function App() {
  const clocks = [
    { city: "L.A.", timezone: "America/Los_Angeles" },
    { city: "New York", timezone: "America/New_York" },
    { city: "Dublin", timezone: "Europe/Dublin" },
    { city: "Hong Kong", timezone: "Asia/Hong_Kong" },
    { city: "Jakarta", timezone: "Asia/Jakarta" },
    { city: "Tokyo", timezone: "Asia/Tokyo" },
  ];

  return (
    <div className="app-container">
      <div className="clock-grid">
        {clocks.map((c) => (
          <Clock key={c.city} city={c.city} timezone={c.timezone} />
        ))}
      </div>
    </div>
  );
}

export default App;