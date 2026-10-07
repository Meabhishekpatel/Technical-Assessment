import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import Timer from "./Timer";

function Assessment({ state, dispatch }) {
  const {
    questions,
    currentQuestion,
    userAnswers,
    timeLeft
  } = state;

  const activeQuestion = questions[currentQuestion];
  const selectedAnswer = userAnswers[activeQuestion.id];

  const answeredCount = Object.keys(userAnswers).length;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleSelectAnswer = (questionId, answer) => {
    dispatch({
      type: "SELECT_ANSWER",
      payload: {
        questionId,
        answer
      }
    });
  };

  const handleSubmit = () => {
    const shouldSubmit = window.confirm(
      "Are you sure you want to submit the assessment?"
    );

    if (shouldSubmit) {
      dispatch({ type: "SUBMIT_ASSESSMENT" });
    }
  };

  return (
    <section className="py-2 sm:py-6">
      <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Technical Assessment
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Answer the questions
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {answeredCount} of {questions.length} questions answered
          </p>
        </div>

        <Timer timeLeft={timeLeft} />
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <ProgressBar
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
          />

          <QuestionCard
            question={activeQuestion}
            questionNumber={currentQuestion + 1}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleSelectAnswer}
          />

          <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              disabled={currentQuestion === 0}
              onClick={() => dispatch({ type: "PREVIOUS_QUESTION" })}
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40 sm:w-auto"
            >
              Previous
            </button>

            {!isLastQuestion ? (
              <button
                type="button"
                onClick={() => dispatch({ type: "NEXT_QUESTION" })}
                className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 sm:w-auto"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 sm:w-auto"
              >
                Submit Assessment
              </button>
            )}
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            Questions
          </h2>

          <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-10 lg:grid-cols-5">
            {questions.map((question, index) => {
              const isCurrent = currentQuestion === index;
              const isAnswered = Boolean(userAnswers[question.id]);

              return (
                <button
                  key={question.id}
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: "GO_TO_QUESTION",
                      payload: index
                    })
                  }
                  className={`flex h-10 w-full items-center justify-center rounded-lg text-sm font-bold transition ${
                    isCurrent
                      ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                      : isAnswered
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                  aria-label={`Go to question ${index + 1}`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-indigo-600" />
              Current
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-emerald-100" />
              Answered
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-slate-100" />
              Not answered
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="mt-6 w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100"
          >
            Submit Now
          </button>
        </aside>
      </div>
    </section>
  );
}

export default Assessment;