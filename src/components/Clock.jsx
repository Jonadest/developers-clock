import { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      //const seconds = now.getSeconds().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12 || 12; // Convert to 12-hour format, '0' becomes '12'
      hours = hours.toString().padStart(2, "0");

      setTime(`${hours} : ${minutes} ${ampm}`);
    };

    const intervalId = setInterval(updateClock, 1000);
    updateClock(); // Set initial time

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return <p id="clock">{time}</p>;
};

export default Clock;
