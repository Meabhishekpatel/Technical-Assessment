function Timer({ timeLeft }) {
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  const isLowTime = timeLeft <= 60;

  return (
    <div
      className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold ${
        isLowTime
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-indigo-200 bg-indigo-50 text-indigo-700"
      }`}
      aria-label={`Time remaining ${minutes}:${seconds}`}
    >
      <span className="text-base">⏱</span>
      <span>
        {minutes}:{seconds}
      </span>
    </div>
  );
}

export default Timer;