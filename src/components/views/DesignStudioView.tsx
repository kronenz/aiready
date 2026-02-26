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
import { Flex, Box, Text, Card, Heading, Separator, IconButton } from '@radix-ui/themes';
import { CheckCircle, AlertTriangle, Layers, X } from 'lucide-react';
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
    <Flex className="h-full">
      {/* Chat Panel */}
      <Flex direction="column" className="w-[340px] shrink-0" style={{ background: 'var(--color-bg-secondary)', borderRight: '1px solid var(--color-border)' }}>
        <Box px="4" py="3" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <Heading size="2" style={{ color: 'var(--color-text-primary)' }}>💬 설계 대화</Heading>
          <Text size="1" style={{ color: 'var(--color-text-muted)' }}>자연어로 아키텍처를 설계하세요</Text>
        </Box>
        <ChatPanel
          messages={sampleDesignChat}
          placeholder="아키텍처 요구사항을 입력하세요..."
        />
      </Flex>

      {/* Topology Canvas */}
      <Box className="flex-1 relative">
        {layerLabels.map((l) => (
          <Box
            key={l.label}
            className="absolute left-3 z-10 pointer-events-none"
            style={{ top: l.y + 78 }}
          >
            <Flex align="center" gap="1">
              <Layers size={10} style={{ color: 'var(--color-text-muted)' }} />
              <Text size="1" className="font-mono" style={{ color: 'var(--color-text-muted)', fontSize: 9 }}>{l.label}</Text>
            </Flex>
          </Box>
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
        <Card size="1" variant="surface" className="absolute top-3 right-3 w-[270px] z-10" style={{ background: 'rgba(12,16,24,0.95)', backdropFilter: 'blur(12px)', border: '1px solid var(--color-border)' }}>
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
          <Card size="2" variant="surface" className="absolute bottom-16 right-3 w-[270px] z-10 anim-fade" style={{ background: 'rgba(12,16,24,0.95)', backdropFilter: 'blur(12px)', border: '1px solid var(--color-border)' }}>
            <Flex align="center" justify="between" mb="2">
              <Flex align="center" gap="2">
                <Text size="2" weight="bold" style={{ color: 'var(--color-text-primary)' }}>Component Inspector</Text>
              </Flex>
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
                <Card size="1" variant="surface" style={{ background: 'var(--color-bg-primary)', border: '1px solid var(--color-border)' }}>
                  <Text size="1" style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: 9 }}>CPU</Text>
                  <Text size="1" weight="bold" className="font-mono" style={{ color: 'var(--color-text-primary)' }}>{selected.cpu}</Text>
                </Card>
              )}
              {selected.memory && (
                <Card size="1" variant="surface" style={{ background: 'var(--color-bg-primary)', border: '1px solid var(--color-border)' }}>
                  <Text size="1" style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: 9 }}>Memory</Text>
                  <Text size="1" weight="bold" className="font-mono" style={{ color: 'var(--color-text-primary)' }}>{selected.memory}</Text>
                </Card>
              )}
              {selected.replicas && (
                <Card size="1" variant="surface" style={{ background: 'var(--color-bg-primary)', border: '1px solid var(--color-border)' }}>
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
