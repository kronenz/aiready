import type { ReactNode } from 'react';

interface ArchBlockProps {
  borderColor: string;
  label?: string;
  labelColor?: string;
  title: string;
  desc?: string;
  children: ReactNode;
  className?: string;
}

export function ArchBlock({ borderColor, label, labelColor, title, desc, children, className = '' }: ArchBlockProps) {
  return (
    <div className={`arch-block ${className}`} style={{ borderTop: `3px solid ${borderColor}` }}>
      {label && <div className="arch-label" style={{ color: labelColor || borderColor }}>{label}</div>}
      <div className="arch-title">{title}</div>
      {desc && <div className="arch-desc">{desc}</div>}
      {children}
    </div>
  );
}
