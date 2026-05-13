import React, { useState } from "react";
import "./Clock.css";

function getTimeInTimezone(now, timezone) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });
  const parts = formatter.formatToParts(now);
  const value = (type) =>
    parseInt(parts.find((p) => p.type === type)?.value ?? "0", 10);
  return {
    hour: value("hour"),
    minute: value("minute"),
    second: value("second"),
  };
}

function AnalogueClock({ timezone, now }) {
  const { hour, minute, second } = getTimeInTimezone(now, timezone);
  const hourAngle =
    ((hour % 12) + minute / 60 + second / 3600) * 30;
  const minuteAngle = (minute + second / 60) * 6;
  const secondAngle = second * 6;

  const ticks = Array.from({ length: 12 }, (_, i) => {
    const isMajor = i % 3 === 0;
    const len = isMajor ? 8 : 4;
    return (
      <line
        key={i}
        x1="50"
        y1="6"
        x2="50"
        y2={6 + len}
        stroke="rgba(255,255,255,0.35)"
        strokeWidth={isMajor ? 2 : 1}
        strokeLinecap="round"
        transform={`rotate(${i * 30} 50 50)`}
      />
    );
  });

  return (
    <svg
      className="clock-analog-svg"
      viewBox="0 0 100 100"
      aria-hidden
    >
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="rgba(0,0,0,0.35)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="2"
      />
      {ticks}
      <g transform={`rotate(${hourAngle} 50 50)`}>
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="30"
          className="clock-analog-hand clock-analog-hand-hour"
          strokeLinecap="round"
        />
      </g>
      <g transform={`rotate(${minuteAngle} 50 50)`}>
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="18"
          className="clock-analog-hand clock-analog-hand-minute"
          strokeLinecap="round"
        />
      </g>
      <g transform={`rotate(${secondAngle} 50 50)`}>
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="14"
          className="clock-analog-hand clock-analog-hand-second"
          strokeLinecap="round"
        />
      </g>
      <circle cx="50" cy="50" r="3" className="clock-analog-cap" />
    </svg>
  );
}

function Clock({ city, timezone, now }) {
  const [isAnalogue, setIsAnalogue] = useState(false);

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

  const labelToggleAnalogue = `Show analogue clock for ${city}`;
  const labelToggleDigital = `Show digital time for ${city}`;

  return (
    <article className="clock-card">
      <div className="clock-place">
        <h2 className="clock-city">{city}</h2>
        <p className="clock-timezone">{timezone}</p>
      </div>

      <div className="clock-reading">
        <button
          type="button"
          className="clock-reading-toggle"
          onClick={() => setIsAnalogue((v) => !v)}
          aria-pressed={isAnalogue}
          aria-label={isAnalogue ? labelToggleDigital : labelToggleAnalogue}
        >
          {isAnalogue ? (
            <AnalogueClock timezone={timezone} now={now} />
          ) : (
            <>
              <p className="clock-time">{time}</p>
              <p className="clock-date">{date}</p>
            </>
          )}
        </button>
      </div>
    </article>
  );
}

export default Clock;
