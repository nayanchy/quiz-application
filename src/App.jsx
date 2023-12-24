import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./Header";
import Main from "./components/Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Progress from "./components/Progress";
import NextButton from "./components/NextButton";
import Finished from "./components/Finished";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
const initialState = {
  questions: [],
  //'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;
function redudcer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "resError":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer": {
      const currentQuestion = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "stop":
      return { ...state, status: "finished" };
    case "restart":
      return { ...initialState, questions: state.questions, status: "active" };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      return new Error("Unknown action");
  }
}
function App() {
  const [quizData, dispatchQuiz] = useReducer(redudcer, initialState);
  const { questions, status, index, answer, points, secondsRemaining } =
    quizData;

  const maxPossiblePoints = questions.reduce((prev, curr) => {
    return prev + curr.points;
  }, 0);

  const numQuestions = questions.length;
  useEffect(() => {
    async function fetchQues() {
      try {
        const res = await fetch("//localhost:8000/questions");
        if (!res.ok) {
          dispatchQuiz({
            type: "resError",
          });
          throw new Error("Something went wrong! Please try again");
        }
        const data = await res.json();
        dispatchQuiz({
          type: "dataReceived",
          payload: data,
        });
      } catch (error) {
        dispatchQuiz({
          type: "resError",
        });
        console.error(error);
      }
    }
    fetchQues();
  }, []);

  function startQuiz() {
    dispatchQuiz({
      type: "start",
    });
  }

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionsNo={questions.length} startQuiz={startQuiz} />
        )}
        {status === "active" && (
          <>
            <Progress
              questionNum={questions.length}
              currentQuestion={quizData.index + 1}
              points={points}
              maxPoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatchQuiz}
            />
            <Footer>
              <Timer
                dispatch={dispatchQuiz}
                secondsRemaining={secondsRemaining}
              />
              <NextButton
                dispatch={dispatchQuiz}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <Finished
            points={points}
            maxPoints={maxPossiblePoints}
            dispatch={dispatchQuiz}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
