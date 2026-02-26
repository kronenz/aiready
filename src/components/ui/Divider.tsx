interface DividerProps {
  text: string;
}

export function Divider({ text }: DividerProps) {
  return <div className="divider">{text}</div>;
}
