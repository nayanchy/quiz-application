function Progress({ questionNum, currentQuestion, points, maxPoints, answer }) {
  return (
    <header className="progress">
      <progress
        max={questionNum}
        value={currentQuestion - 1 + Number(answer !== null)}
      />
      <p>
        Question <strong>{currentQuestion}</strong>/{questionNum}
      </p>
      <p>
        <strong>{points}</strong>/{maxPoints}
      </p>
    </header>
  );
}

export default Progress;
