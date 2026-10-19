interface ProgressBarProps {
  value: number;
  color?: "purple" | "blue" | "orange" | "green";
  size?: "small" | "medium";
}

export default function ProgressBar({
  value,
  color = "purple",
  size = "medium",
}: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`progress-track progress-track--${size}`}
      role="progressbar"
      aria-label="Progres"
      aria-valuenow={safeValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`progress-fill progress-fill--${color}`}
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}
