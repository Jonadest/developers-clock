import { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    const intervalId = setInterval(updateClock, 1000);
    updateClock(); // Set initial time

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return <p id="clock">{time}</p>;
};

export default Clock;
