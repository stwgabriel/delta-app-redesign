"use client";
import { useEffect, useState } from "react";
import "./clock.css";

export default function ClockPage() {
  const diallines = new Array(60).fill(0).map((_, i) => i);
  const [angle, setAngle] = useState(0);
  console.log(diallines);
  console.log("Teste");

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setAngle((x) => (x > 360 ? 0 : x + 6));
  //   }, 100);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div
      className="clock"
      style={{
        background: `conic-gradient(#3498db 0deg ${angle}deg,#ececec ${angle}deg 360deg)`,
      }}
    >
      <div>
        {diallines.map((i) => (
          <div key={`i-${i}`} className="diallines" style={{ transform: `rotate(${(i + 1) * 6}deg)` }}></div>
        ))}
      </div>
    </div>
  );
}
