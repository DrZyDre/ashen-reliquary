interface ProgressBarProps {
  percent: number;
}

export function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
      <div
        className="h-full rounded-full bg-gradient-to-r from-red-800 to-red-500 transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
