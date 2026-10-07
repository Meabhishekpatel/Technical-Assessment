function ProgressBar({ currentQuestion, totalQuestions }) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between gap-3 text-xs font-semibold text-slate-500 sm:text-sm">
        <span>
          Question {currentQuestion + 1} of {totalQuestions}
        </span>

        <span>{Math.round(progress)}% complete</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;