interface CompItemProps {
  icon: string;
  name: string;
  role: string;
  tech?: string;
  techColor?: string;
  className?: string;
}

export function CompItem({ icon, name, role, tech, techColor, className = '' }: CompItemProps) {
  return (
    <div className={`comp-item ${className}`}>
      <span className="comp-icon">{icon}</span>
      <div className="comp-info">
        <div className="comp-name">{name}</div>
        <div className="comp-role">{role}</div>
        {tech && <div className="comp-tech" style={{ color: techColor }}>{tech}</div>}
      </div>
    </div>
  );
}
