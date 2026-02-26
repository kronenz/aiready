function generateChartData(baseValue: number, variance: number): { time: string; value: number }[] {
  const data: { time: string; value: number }[] = [];
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, '0') + ':00';
    const sinComponent = Math.sin((i / 24) * Math.PI * 2) * variance * 0.5;
    const noise = (Math.random() - 0.5) * variance;
    const value = Math.max(0, Math.min(100, baseValue + sinComponent + noise));
    data.push({ time: hour, value: Math.round(value * 10) / 10 });
  }
  return data;
}

export const cpuChartData = generateChartData(42, 15);
export const memChartData = generateChartData(58, 12);
