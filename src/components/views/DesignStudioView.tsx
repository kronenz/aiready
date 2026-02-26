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
  type NodeProps,
} from '@xyflow/react';
import { Flex, Box, Text, Card, Heading, Separator, IconButton } from '@radix-ui/themes';
import { CheckCircle, AlertTriangle, Layers, X } from 'lucide-react';
import { topologyNodes, topologyEdges, type TopoNodeData } from '../../data/topology';
import { sampleDesignChat } from '../../data/agents';
import { ChatPanel } from '../shared/ChatPanel';
import { TopoNode } from '../shared/TopoNode';

/* Layer label node — rendered inside the canvas so it zooms/pans with the graph */
function LayerLabelNode({ data }: NodeProps) {
  const d = data as TopoNodeData;
  return (
    <div style={{ pointerEvents: 'none', userSelect: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Layers size={10} style={{ color: 'var(--color-text-muted)' }} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
          {d.label}
        </span>
      </div>
    </div>
  );
}

const nodeTypes = { default: TopoNode, layerLabel: LayerLabelNode };

export function DesignStudioView() {
  const [nodes, , onNodesChange] = useNodesState(topologyNodes);
  const [edges, , onEdgesChange] = useEdgesState(topologyEdges);
  const [selected, setSelected] = useState<TopoNodeData | null>(null);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    if (node.type === 'layerLabel') return;
    setSelected(node.data as TopoNodeData);
  }, []);

  const validations = useMemo(() => [
    { type: 'pass', msg: 'Spark ↔ Iceberg 호환성 확인 (>=1.4.0)' },
    { type: 'pass', msg: 'Hive Metastore → PostgreSQL 연결 OK' },
    { type: 'warn', msg: 'Hive Metastore 3.1.3 — EOL 예정, 4.0 권장' },
    { type: 'pass', msg: '50노드 규모 → Thanos 자동 추가 완료' },
    { type: 'pass', msg: 'ArgoCD Sync Wave 순서 검증 OK' },
    { type: 'pass', msg: 'K8s 1.31.2 Control Plane HA (3-node) 확인' },
    { type: 'pass', msg: 'GPU Node Pool A100×4 — Spark ML 호환 OK' },
  ], []);

  return (
    <Flex className="h-full" style={{ minWidth: 0 }}>
      {/* Chat Panel */}
      <Flex direction="column" className="w-[340px] shrink-0" style={{ background: 'var(--color-bg-secondary)', borderRight: '1px solid var(--color-border)', minWidth: 0 }}>
        <Box px="4" py="3" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <Heading size="2" style={{ color: 'var(--color-text-primary)' }}>설계 대화</Heading>
          <Text size="1" style={{ color: 'var(--color-text-muted)' }}>자연어로 아키텍처를 설계하세요</Text>
        </Box>
        <ChatPanel
          messages={sampleDesignChat}
          placeholder="아키텍처 요구사항을 입력하세요..."
        />
      </Flex>

      {/* Topology Canvas */}
      <Box className="flex-1 relative" style={{ minWidth: 0 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.12 }}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#94a3b820" />
          <Controls position="bottom-right" />
          <MiniMap
            position="bottom-left"
            nodeColor={(n: Node) => {
              if (n.type === 'layerLabel') return 'transparent';
              const d = n.data as TopoNodeData;
              if (d.status === 'error') return '#ef4444';
              if (d.status === 'warning') return '#eab308';
              return '#22c55e';
            }}
            maskColor="#f1f5f9cc"
          />
        </ReactFlow>

        {/* Validation Panel */}
        <Card size="1" variant="surface" className="absolute top-3 right-3 w-[270px]" style={{ zIndex: 20, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', border: '1px solid var(--color-border)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <Flex align="center" gap="2" mb="2">
            <CheckCircle size={13} style={{ color: 'var(--color-accent-green)' }} />
            <Text size="2" weight="bold" style={{ color: 'var(--color-text-primary)' }}>Validation</Text>
          </Flex>
          <Flex direction="column" gap="2">
            {validations.map((v, i) => (
              <Flex key={i} align="start" gap="2">
                {v.type === 'pass'
                  ? <CheckCircle size={11} style={{ color: 'var(--color-accent-green)', marginTop: 2, flexShrink: 0 }} />
                  : <AlertTriangle size={11} style={{ color: 'var(--color-accent-gold)', marginTop: 2, flexShrink: 0 }} />
                }
                <Text size="1" style={{ color: v.type === 'pass' ? 'var(--color-text-secondary)' : 'var(--color-accent-gold)', lineHeight: 1.5 }}>
                  {v.msg}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Card>

        {/* Component Inspector */}
        {selected && (
          <Card size="2" variant="surface" className="absolute bottom-16 right-3 w-[270px] anim-fade" style={{ zIndex: 20, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', border: '1px solid var(--color-border)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Flex align="center" justify="between" mb="2">
              <Text size="2" weight="bold" style={{ color: 'var(--color-text-primary)' }}>Component Inspector</Text>
              <IconButton size="1" variant="ghost" color="gray" onClick={() => setSelected(null)}>
                <X size={12} />
              </IconButton>
            </Flex>
            <Separator size="4" mb="3" style={{ background: 'var(--color-border)' }} />
            <Flex align="center" gap="3" mb="3">
              <Text size="5">{selected.icon}</Text>
              <Box>
                <Text size="2" weight="bold" style={{ color: 'var(--color-text-primary)', display: 'block' }}>{selected.label}</Text>
                <Text size="1" className="font-mono" style={{ color: 'var(--color-text-muted)' }}>v{selected.version} · {selected.category}</Text>
              </Box>
            </Flex>
            <div className="grid grid-cols-3 gap-2 text-center">
              {selected.cpu && (
                <Card size="1" variant="surface" style={{ background: '#f8fafc', border: '1px solid var(--color-border)' }}>
                  <Text size="1" style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: 9 }}>CPU</Text>
                  <Text size="1" weight="bold" className="font-mono" style={{ color: 'var(--color-text-primary)' }}>{selected.cpu}</Text>
                </Card>
              )}
              {selected.memory && (
                <Card size="1" variant="surface" style={{ background: '#f8fafc', border: '1px solid var(--color-border)' }}>
                  <Text size="1" style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: 9 }}>Memory</Text>
                  <Text size="1" weight="bold" className="font-mono" style={{ color: 'var(--color-text-primary)' }}>{selected.memory}</Text>
                </Card>
              )}
              {selected.replicas && (
                <Card size="1" variant="surface" style={{ background: '#f8fafc', border: '1px solid var(--color-border)' }}>
                  <Text size="1" style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: 9 }}>Replicas</Text>
                  <Text size="1" weight="bold" className="font-mono" style={{ color: 'var(--color-text-primary)' }}>{selected.replicas}</Text>
                </Card>
              )}
            </div>
            <Text size="1" style={{ color: 'var(--color-text-muted)', marginTop: 8, display: 'block' }}>Layer: {selected.layer}</Text>
          </Card>
        )}
      </Box>
    </Flex>
  );
}
