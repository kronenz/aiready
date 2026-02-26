import { useCallback, useMemo, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  type Node,
} from '@xyflow/react';
import { Info, CheckCircle, AlertTriangle, Layers } from 'lucide-react';
import { topologyNodes, topologyEdges, layerLabels, type TopoNodeData } from '../../data/topology';
import { sampleDesignChat } from '../../data/agents';
import { ChatPanel } from '../shared/ChatPanel';
import { TopoNode } from '../shared/TopoNode';

const nodeTypes = { default: TopoNode };

export function DesignStudioView() {
  const [nodes, , onNodesChange] = useNodesState(topologyNodes);
  const [edges, , onEdgesChange] = useEdgesState(topologyEdges);
  const [selected, setSelected] = useState<TopoNodeData | null>(null);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelected(node.data as TopoNodeData);
  }, []);

  const validations = useMemo(() => [
    { type: 'pass', msg: 'Spark ↔ Iceberg 호환성 확인 (>=1.4.0)' },
    { type: 'pass', msg: 'Hive Metastore → PostgreSQL 연결 OK' },
    { type: 'warn', msg: 'Hive Metastore 3.1.3 — EOL 예정, 4.0 마이그레이션 권장' },
    { type: 'pass', msg: '50노드 규모 → Thanos 자동 추가 완료' },
    { type: 'pass', msg: 'ArgoCD Sync Wave 순서 검증 OK' },
  ], []);

  return (
    <div className="flex h-full">
      {/* Chat Panel */}
      <div className="w-[340px] shrink-0 border-r border-border flex flex-col bg-bg-secondary">
        <div className="px-4 py-3 border-b border-border">
          <div className="text-[13px] font-bold text-text-primary flex items-center gap-2">
            💬 설계 대화
          </div>
          <div className="text-[10px] text-text-muted mt-0.5">자연어로 아키텍처를 설계하세요</div>
        </div>
        <ChatPanel
          messages={sampleDesignChat}
          placeholder="아키텍처 요구사항을 입력하세요..."
        />
      </div>

      {/* Topology Canvas */}
      <div className="flex-1 relative">
        {/* Layer labels */}
        {layerLabels.map((l) => (
          <div
            key={l.label}
            className="absolute left-3 z-10 flex items-center gap-1.5 text-[9px] font-mono text-text-muted pointer-events-none"
            style={{ top: l.y + 78 }}
          >
            <Layers size={10} />
            {l.label}
          </div>
        ))}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#1e293b40" />
          <Controls position="bottom-right" />
          <MiniMap
            position="bottom-left"
            nodeColor={(n: Node) => {
              const d = n.data as TopoNodeData;
              if (d.status === 'error') return '#f87171';
              if (d.status === 'warning') return '#fbbf24';
              return '#4ade80';
            }}
            maskColor="#06090fcc"
          />
        </ReactFlow>

        {/* Validation Panel */}
        <div className="absolute top-3 right-3 w-[260px] bg-bg-secondary/95 backdrop-blur-sm border border-border rounded-xl p-3 z-10">
          <div className="text-[11px] font-bold text-text-primary flex items-center gap-1.5 mb-2">
            <CheckCircle size={12} className="text-accent-green" />
            Validation
          </div>
          <div className="space-y-1.5">
            {validations.map((v, i) => (
              <div key={i} className="flex items-start gap-2 text-[10px]">
                {v.type === 'pass'
                  ? <CheckCircle size={10} className="text-accent-green mt-0.5 shrink-0" />
                  : <AlertTriangle size={10} className="text-accent-gold mt-0.5 shrink-0" />
                }
                <span className={v.type === 'pass' ? 'text-text-secondary' : 'text-accent-gold'}>
                  {v.msg}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Component Inspector */}
        {selected && (
          <div className="absolute bottom-16 right-3 w-[260px] bg-bg-secondary/95 backdrop-blur-sm border border-border rounded-xl p-3 z-10 anim-fade">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] font-bold text-text-primary flex items-center gap-1.5">
                <Info size={12} className="text-accent-blue" />
                Component Inspector
              </div>
              <button onClick={() => setSelected(null)} className="text-text-muted hover:text-text-primary text-xs">✕</button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{selected.icon}</span>
                <div>
                  <div className="text-[12px] font-bold text-text-primary">{selected.label}</div>
                  <div className="text-[9px] font-mono text-text-muted">v{selected.version} · {selected.category}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                {selected.cpu && (
                  <div className="bg-bg-primary rounded-lg p-1.5 border border-border">
                    <div className="text-[9px] text-text-muted">CPU</div>
                    <div className="text-[10px] font-mono font-bold text-text-primary">{selected.cpu}</div>
                  </div>
                )}
                {selected.memory && (
                  <div className="bg-bg-primary rounded-lg p-1.5 border border-border">
                    <div className="text-[9px] text-text-muted">Memory</div>
                    <div className="text-[10px] font-mono font-bold text-text-primary">{selected.memory}</div>
                  </div>
                )}
                {selected.replicas && (
                  <div className="bg-bg-primary rounded-lg p-1.5 border border-border">
                    <div className="text-[9px] text-text-muted">Replicas</div>
                    <div className="text-[10px] font-mono font-bold text-text-primary">{selected.replicas}</div>
                  </div>
                )}
              </div>
              <div className="text-[9px] text-text-muted">Layer: {selected.layer}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
