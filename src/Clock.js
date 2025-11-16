import React, { useState, useEffect } from "react";
import "./Clock.css";

function Clock({ city, timezone }) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: timezone,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          timeZone: timezone,
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    };

    updateTimeAndDate();
    const interval = setInterval(updateTimeAndDate, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="clock-card">
      <div className="clock-content">
        <h2 className="clock-city">{city}</h2>
        <p className="clock-time">{time}</p>
        <p className="clock-date">{date}</p>
        <span className="clock-timezone">{timezone}</span>
      </div>
    </div>
  );
}

export default Clock;