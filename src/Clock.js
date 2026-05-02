import React from "react";
import "./Clock.css";

function Clock({ city, timezone, now }) {
  const time = now.toLocaleTimeString("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const date = now.toLocaleDateString("en-US", {
    timeZone: timezone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="clock-card">
      <div className="clock-place">
        <h2 className="clock-city">{city}</h2>
        <p className="clock-timezone">{timezone}</p>
      </div>

      <div className="clock-reading">
        <p className="clock-time">{time}</p>
        <p className="clock-date">{date}</p>
      </div>
    </article>
  );
}

export default Clock;