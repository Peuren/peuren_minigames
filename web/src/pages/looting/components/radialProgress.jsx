function RadialProgress({ progress, children}) {
    const circumference = 20 * 2 * Math.PI;
  return (
    <div
      className="fixed inline-flex items-center justify-center overflow-hidden rounded-full"
    >
      <svg className="w-20 h-20">
        <circle
          className="text-input"
          strokeWidth="5"
          stroke="currentColor"
          fill="transparent"
          r="20"
          cx="40"
          cy="40"
        />
        <circle
          className="origin-center rotate-[-90deg]"
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress / 100 * circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="20"
          cx="40"
          cy="40"
        />
      </svg>
    </div>
  );
}

export default RadialProgress;