import React, { useState, useEffect } from "react";
import "./Clock.css";

function Clock({ city, timezone }) {
  const [time, setTime] = useState("");
  const [dateParts, setDateParts] = useState({ weekday: "", month: "", day: "", year: "" });

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
      
      const dateStr = now.toLocaleDateString("en-US", {
        timeZone: timezone,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      
      // Parse the date string to extract parts
      // Format is typically "Monday, January 15, 2024"
      const parts = dateStr.split(", ");
      const weekday = parts[0];
      const monthDay = parts[1].split(" ");
      const month = monthDay[0];
      const day = monthDay[1];
      const year = parts[2];
      
      setDateParts({ weekday, month, day, year });
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
        <p className="clock-date">
          {dateParts.weekday}, {dateParts.month} <span className="clock-day">{dateParts.day}</span>, {dateParts.year}
        </p>
        <span className="clock-timezone">{timezone}</span>
      </div>
    </div>
  );
}

export default Clock;