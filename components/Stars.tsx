export default function Stars({ value }: { value?: number | string }) {
  const n = value == null ? 0 : Number(value);
  if (!n) return null;
  const full = Math.round(n);
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`${n} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`w-4 h-4 ${i < full ? "text-amber-400" : "text-gray-300"}`}
          fill="currentColor"
        >
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.78L10 14.77l-5.2 2.73.99-5.78L1.58 7.62l5.82-.85L10 1.5z" />
        </svg>
      ))}
      <span className="ml-1 text-[13px] text-amber-700 font-medium">{n}</span>
    </span>
  );
}
