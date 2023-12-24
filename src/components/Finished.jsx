function Finished({ points, maxPoints, dispatch }) {
  const percentage = (points / maxPoints) * 100;
  let emoji;

  if (percentage === 100) emoji = "🏅";
  if (percentage > 79 && percentage < 100) emoji = "👍";
  if (percentage > 29 && percentage < 80) emoji = "🫣";
  if (percentage >= 0 && percentage < 30) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You have scored {points} out of {maxPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default Finished;
