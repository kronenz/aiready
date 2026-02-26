import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

interface CustomNodeData {
  label: string;
  icon: string;
  version: string;
  color: string;
  isOperator: boolean;
  status: 'ok' | 'warn';
  [key: string]: unknown;
}

export const CustomNode = memo(({ data, selected }: NodeProps) => {
  const { label, icon, version, color, isOperator, status } = data as unknown as CustomNodeData;

  return (
    <div
      className="relative px-3 py-2 rounded-lg transition-all duration-150 min-w-[110px]"
      style={{
        background: selected ? '#1e1b4b' : '#0f172a',
        border: `1px solid ${selected ? '#a78bfa' : `${color}70`}`,
        boxShadow: selected ? '0 0 16px rgba(167, 139, 250, 0.25)' : 'none',
      }}
    >
      {/* Warning badge */}
      {status === 'warn' && (
        <span className="absolute -top-1.5 -left-1.5 text-xs">⚠️</span>
      )}

      {/* Operator badge */}
      {isOperator && (
        <span className="absolute -top-1.5 -right-1.5 px-1 py-0 rounded text-white font-bold"
          style={{ fontSize: '7px', background: '#eab308', lineHeight: '14px' }}>
          OPR
        </span>
      )}

      <div className="flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <div>
          <div className="font-bold text-white" style={{ fontSize: '11px', lineHeight: '14px' }}>{label}</div>
          <div className="font-mono" style={{ fontSize: '9px', color, lineHeight: '12px' }}>{version}</div>
        </div>
      </div>

      <Handle type="target" position={Position.Left} className="!w-1.5 !h-1.5 !border-0"
        style={{ background: '#334155' }} />
      <Handle type="source" position={Position.Right} className="!w-1.5 !h-1.5 !border-0"
        style={{ background: '#334155' }} />
    </div>
  );
});

CustomNode.displayName = 'CustomNode';
