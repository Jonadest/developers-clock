import { useState, useEffect } from "react";
import "./Timer.css";
import Clock from "./Clock";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      handleFullscreen();
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const getSeconds = `0${time % 60}`.slice(-2);
  const minutes = `${Math.floor(time / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        // Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        // IE/Edge
        document.documentElement.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    if (isFullscreen) {
      screen.orientation.lock("landscape");
    } else {
      screen.orientation.unlock();
    }
  }, [isFullscreen]);

  return (
    <div>
      <div className="timer-wrapper">
        <p className="clock">
          <Clock />
        </p>
        <div className="timer ">
          <li>{getHours}</li>
          <li>{getMinutes}</li>
          <li className="sec1">
            {getSeconds}{" "}
            <span className={isRunning ? "sec2" : "disable"}>{getSeconds}</span>
          </li>
        </div>
        <div className="buttons">
          <button
            className={isRunning ? "btn" : "active"}
            onClick={handleStartPause}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button className="btn pause" onClick={handleReset} disabled={!time}>
            Reset
          </button>
          <button className="btn fullscreen" onClick={handleFullscreen}>
            {isFullscreen ? (
              <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
            ) : (
              <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
            )}
          </button>
        </div>
      </div>
      <footer>
        <p className="copyright">Copyright {currentYear} Jonadest</p>
      </footer>
    </div>
  );
};

export default Timer;
