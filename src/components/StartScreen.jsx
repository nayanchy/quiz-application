function StartScreen({ questionsNo, startQuiz }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{questionsNo} questions to test your React Mastery</h3>
      <button className="btn btn-ui" onClick={startQuiz}>
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
