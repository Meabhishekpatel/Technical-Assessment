function QuestionCard({
  question,
  questionNumber,
  selectedAnswer,
  onSelectAnswer
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-6">
        <p className="mb-3 text-sm font-semibold text-indigo-600">
          Question {questionNumber}
        </p>

        <h2 className="text-xl font-bold leading-8 text-slate-900 sm:text-2xl">
          {question.question}
        </h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const optionLetter = String.fromCharCode(65 + index);

          return (
            <label
              key={option}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50 ring-2 ring-indigo-100"
                  : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50"
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={isSelected}
                onChange={() =>
                  onSelectAnswer(question.id, option)
                }
                className="sr-only"
              />

              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                  isSelected
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {optionLetter}
              </span>

              <span
                className={`pt-1 text-sm font-medium sm:text-base ${
                  isSelected ? "text-indigo-900" : "text-slate-700"
                }`}
              >
                {option}
              </span>
            </label>
          );
        })}
      </div>
    </section>
  );
}

export default QuestionCard;