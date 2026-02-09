/*

Week - 3

Build a traffic light where the lights switch from green to yellow to red after
predetermined intervals and loop indefinitely.

Each light should be lit for the following durations:

Red light: 4000ms
Yellow light: 500ms
Green light: 3000ms

You are free to exercise your creativity to style the appearance of the traffic light.

*/

import { useEffect, useState } from "react";

function Light({ color, enabled }) {
  return (
    <div
      style={{
        width: "2rem",
        height: "2rem",
        borderRadius: "50%",
        backgroundColor: enabled ? color : "lightgrey",
      }}
    ></div>
  );
}

const trafficLights = {
  red: { next: "yellow", time: 4000 },
  yellow: { next: "green", time: 500 },
  green: { next: "red", time: 3000 },
};

export default function TrafficLight() {
  const [activeLight, setActiveLight] = useState("green");

  useEffect(() => {
    const nextLight = trafficLights[activeLight].next;
    const timerId = setTimeout(() => {
      setActiveLight(nextLight);
    }, [trafficLights[activeLight].time]);
    return () => clearTimeout(timerId);
  }, [activeLight]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        border: "1px solid white",
        width: "min-content",
        padding: "0.5rem",
        margin: "auto",
      }}
    >
      {Object.keys(trafficLights).map((color) => (
        <Light key={color} color={color} enabled={color === activeLight} />
      ))}
    </div>
  );
}
