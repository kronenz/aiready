import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { TopoNodeData } from '../../data/topology';

const statusColor: Record<string, string> = {
  healthy: '#22c55e',
  warning: '#eab308',
  error: '#ef4444',
  deploying: '#3b82f6',
};

export function TopoNode({ data, selected }: NodeProps) {
  const d = data as TopoNodeData;
  const sc = statusColor[d.status] || '#22c55e';

  return (
    <div
      className="rounded-xl border px-3.5 py-2.5 min-w-[160px] transition-all"
      style={{
        background: selected ? '#f5f3ff' : '#ffffff',
        borderColor: selected ? 'var(--color-accent-purple)' : 'var(--color-border)',
        boxShadow: selected ? '0 0 0 2px rgba(124,58,237,0.15), 0 2px 8px rgba(0,0,0,0.06)' : '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      <Handle type="target" position={Position.Top} className="!bg-border !border-0 !w-2 !h-1 !rounded-sm" />

      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-base">{d.icon}</span>
        <span className="text-[11px] font-bold text-text-primary truncate">{d.label}</span>
        <div className="w-2 h-2 rounded-full ml-auto shrink-0" style={{ background: sc }} />
      </div>

      <div className="flex items-center gap-2">
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded text-text-secondary border border-border" style={{ background: '#f8fafc' }}>
          v{d.version}
        </span>
        <span className="text-[9px] text-text-muted">{d.category}</span>
      </div>

      {d.replicas && (
        <div className="mt-1.5 flex items-center gap-3 text-[9px] text-text-muted font-mono">
          <span>CPU {d.cpu}</span>
          <span>MEM {d.memory}</span>
          <span>x{d.replicas}</span>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="!bg-border !border-0 !w-2 !h-1 !rounded-sm" />
    </div>
  );
}
