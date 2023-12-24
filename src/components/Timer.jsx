import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  useEffect(() => {
    const timer = setInterval(function () {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  return (
    <div className="timer">
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  );
}

export default Timer;
