import { useEffect, useReducer } from "react";
import questionsData from "./data/questions.json";

import StartScreen from "./components/StartScreen";
import Assessment from "./components/Assessment";
import ResultScreen from "./components/ResultScreen";

const STORAGE_KEY = "assessment-app-state";
const TIME_LIMIT = 10 * 60;

const getInitialState = () => {
  const savedState = localStorage.getItem(STORAGE_KEY);

  if (savedState) {
    try {
      const parsedState = JSON.parse(savedState);

      if (
        parsedState &&
        Array.isArray(parsedState.questions) &&
        parsedState.questions.length > 0
      ) {
        return parsedState;
      }
    } catch (error) {
      console.error("Unable to restore assessment state:", error);
    }
  }

  return {
    questions: questionsData,
    currentQuestion: 0,
    userAnswers: {},
    timeLeft: TIME_LIMIT,
    status: "not-started",
    submittedAt: null
  };
};

const initialState = getInitialState();

function quizReducer(state, action) {
  switch (action.type) {
    case "START_ASSESSMENT":
      return {
        ...state,
        currentQuestion: 0,
        userAnswers: {},
        timeLeft: TIME_LIMIT,
        status: "in-progress",
        submittedAt: null
      };

    case "SELECT_ANSWER":
      return {
        ...state,
        userAnswers: {
          ...state.userAnswers,
          [action.payload.questionId]: action.payload.answer
        }
      };

    case "GO_TO_QUESTION":
      return {
        ...state,
        currentQuestion: Math.max(
          0,
          Math.min(action.payload, state.questions.length - 1)
        )
      };

    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestion: Math.min(
          state.currentQuestion + 1,
          state.questions.length - 1
        )
      };

    case "PREVIOUS_QUESTION":
      return {
        ...state,
        currentQuestion: Math.max(state.currentQuestion - 1, 0)
      };

    case "TICK":
      return {
        ...state,
        timeLeft: Math.max(state.timeLeft - 1, 0)
      };

    case "SUBMIT_ASSESSMENT":
      return {
        ...state,
        status: "submitted",
        submittedAt: new Date().toISOString()
      };

    case "RESTART_ASSESSMENT":
      return {
        ...state,
        currentQuestion: 0,
        userAnswers: {},
        timeLeft: TIME_LIMIT,
        status: "not-started",
        submittedAt: null
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (state.status !== "in-progress") {
      return undefined;
    }

    if (state.timeLeft <= 0) {
      dispatch({ type: "SUBMIT_ASSESSMENT" });
      return undefined;
    }

    const timerId = window.setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [state.status, state.timeLeft]);

  useEffect(() => {
    if (
      state.status === "in-progress" &&
      state.timeLeft === 0
    ) {
      dispatch({ type: "SUBMIT_ASSESSMENT" });
    }
  }, [state.status, state.timeLeft]);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {state.status === "not-started" && (
          <StartScreen
            questionsCount={state.questions.length}
            timeLimit={TIME_LIMIT}
            hasSavedProgress={
              Object.keys(state.userAnswers).length > 0 ||
              state.timeLeft < TIME_LIMIT
            }
            onStart={() => dispatch({ type: "START_ASSESSMENT" })}
          />
        )}

        {state.status === "in-progress" && (
          <Assessment state={state} dispatch={dispatch} />
        )}

        {state.status === "submitted" && (
          <ResultScreen state={state} dispatch={dispatch} />
        )}
      </div>
    </main>
  );
}

export default App;