function formatMinutes(seconds) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
}

function StartScreen({
  questionsCount,
  timeLimit,
  hasSavedProgress,
  onStart
}) {
  return (
    <section className="flex min-h-[calc(100vh-2.5rem)] items-center justify-center py-6">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-3xl text-white shadow-lg shadow-indigo-200">
            ?
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Technical Assessment
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Test Your Knowledge
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            Answer all questions before the timer ends. Your progress will be
            saved automatically if you refresh the page.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">
              Number of questions
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {questionsCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">
              Time limit
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {formatMinutes(timeLimit)}
            </p>
          </div>
        </div>

        {hasSavedProgress && (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
            Your previous assessment progress was restored. Press the button
            below to continue from the beginning of the active attempt state.
          </div>
        )}

        <button
          type="button"
          onClick={onStart}
          className="mt-8 w-full rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
        >
          {hasSavedProgress ? "Continue Assessment" : "Start Assessment"}
        </button>
      </div>
    </section>
  );
}

export default StartScreen;