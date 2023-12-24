import Options from "./Options";

function Question({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        <Options questions={question} dispatch={dispatch} answer={answer} />
      </div>
    </div>
  );
}

export default Question;
