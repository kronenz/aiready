interface ProgressBarProps {
  value: number;
  color?: string;
  height?: number;
  showWarning?: boolean;
}

export function ProgressBar({ value, color, height = 5, showWarning = true }: ProgressBarProps) {
  const barColor = showWarning && value > 80 ? '#ef4444' : (color || '#a78bfa');

  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height, background: '#1e293b' }}>
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{ width: `${Math.min(value, 100)}%`, background: barColor }}
      />
    </div>
  );
}
