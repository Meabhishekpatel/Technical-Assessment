function ResultScreen({ state, dispatch }) {
  const { questions, userAnswers } = state;

  const score = questions.reduce((total, question) => {
    return total + (
      userAnswers[question.id] === question.correctAnswer ? 1 : 0
    );
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);

  const getResultMessage = () => {
    if (percentage >= 80) {
      return "Excellent work! You have a strong understanding of the topics.";
    }

    if (percentage >= 50) {
      return "Good effort! Review the incorrect answers and keep practicing.";
    }

    return "Keep practicing. Revising the fundamentals will help improve your score.";
  };

  return (
    <section className="py-2 sm:py-6">
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
          ✓
        </div>

        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
          Assessment Completed
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
          Your Result
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
          {getResultMessage()}
        </p>

        <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Score</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {score}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">
              Total Questions
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {questions.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">
              Percentage
            </p>
            <p className="mt-2 text-3xl font-bold text-indigo-600">
              {percentage}%
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => dispatch({ type: "RESTART_ASSESSMENT" })}
          className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
        >
          Restart Assessment
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Review Answers
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Review your selected answers and compare them with the correct answers.
          </p>
        </div>

        <div className="space-y-5">
          {questions.map((question, index) => {
            const selectedAnswer = userAnswers[question.id];
            const isCorrect = selectedAnswer === question.correctAnswer;

            return (
              <article
                key={question.id}
                className={`rounded-2xl border p-5 ${
                  isCorrect
                    ? "border-emerald-200 bg-emerald-50/50"
                    : "border-red-200 bg-red-50/50"
                }`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-500">
                      Question {index + 1}
                    </p>

                    <h3 className="mt-1 text-base font-bold leading-7 text-slate-900 sm:text-lg">
                      {question.question}
                    </h3>
                  </div>

                  <span
                    className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                      isCorrect
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Your answer
                    </p>

                    <p
                      className={`mt-2 break-words text-sm font-semibold ${
                        selectedAnswer
                          ? "text-slate-800"
                          : "italic text-slate-400"
                      }`}
                    >
                      {selectedAnswer || "Not answered"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-emerald-200 bg-white p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-600">
                      Correct answer
                    </p>

                    <p className="mt-2 break-words text-sm font-semibold text-slate-800">
                      {question.correctAnswer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ResultScreen;