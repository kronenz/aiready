import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { TopoNodeData } from '../../data/topology';

const statusColor: Record<string, string> = {
  healthy: '#4ade80',
  warning: '#fbbf24',
  error: '#f87171',
  deploying: '#38bdf8',
};

export function TopoNode({ data, selected }: NodeProps) {
  const d = data as TopoNodeData;
  const sc = statusColor[d.status] || '#4ade80';

  return (
    <div className={`rounded-xl border px-3.5 py-2.5 min-w-[160px] transition-all ${
      selected ? 'border-accent-purple bg-bg-selected shadow-lg shadow-accent-purple/10' : 'border-border bg-bg-secondary hover:border-border-hover'
    }`}>
      <Handle type="target" position={Position.Top} className="!bg-border !border-0 !w-2 !h-1 !rounded-sm" />

      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-base">{d.icon}</span>
        <span className="text-[11px] font-bold text-text-primary truncate">{d.label}</span>
        <div className="w-2 h-2 rounded-full ml-auto shrink-0" style={{ background: sc }} />
      </div>

      <div className="flex items-center gap-2">
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-bg-primary/60 text-text-secondary border border-border">
          v{d.version}
        </span>
        <span className="text-[9px] text-text-muted">{d.category}</span>
      </div>

      {d.replicas && (
        <div className="mt-1.5 flex items-center gap-3 text-[9px] text-text-muted font-mono">
          <span>CPU {d.cpu}</span>
          <span>MEM {d.memory}</span>
          <span>×{d.replicas}</span>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="!bg-border !border-0 !w-2 !h-1 !rounded-sm" />
    </div>
  );
}
