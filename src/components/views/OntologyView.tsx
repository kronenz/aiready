import { useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Panel,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
} from '@xyflow/react';
import { Flex, Box, Text, Card, Heading, Code, ScrollArea } from '@radix-ui/themes';
import { Database, ArrowRightLeft, Search, Zap } from 'lucide-react';
import { TopoNode } from '../shared/TopoNode';
import type { TopoNodeData } from '../../data/topology';

const nodeTypes = { default: TopoNode };

/* Spread nodes apart for readable edge labels */
const ontoNodes: Node<TopoNodeData>[] = [
  { id: 'flink', position: { x: 0, y: 0 }, data: { label: 'Apache Flink', icon: '🌊', version: '1.19', status: 'healthy', category: 'StreamProcessor', layer: 'conflicts_with: Spark (soft)' } },
  { id: 'spark', position: { x: 380, y: 0 }, data: { label: 'Apache Spark', icon: '✨', version: '3.5.3', status: 'healthy', category: 'BatchProcessor', layer: 'provides: SparkSubmit, StructuredStreaming' } },
  { id: 'spark-op', position: { x: 750, y: 0 }, data: { label: 'Spark Operator', icon: '⚙️', version: '1.4.6', status: 'healthy', category: 'Operator', layer: 'manages: Spark' } },
  { id: 'iceberg', position: { x: 60, y: 250 }, data: { label: 'Apache Iceberg', icon: '🧊', version: '1.6.1', status: 'healthy', category: 'TableFormat', layer: 'provides: IcebergCatalog' } },
  { id: 'trino', position: { x: 680, y: 250 }, data: { label: 'Trino', icon: '🔎', version: '460', status: 'healthy', category: 'SQLEngine', layer: 'provides: JDBCEndpoint' } },
  { id: 'hive', position: { x: 370, y: 480 }, data: { label: 'Hive Metastore', icon: '🐝', version: '3.1.3', status: 'warning', category: 'MetadataCatalog', layer: 'provides: HiveMetastoreThrift' } },
  { id: 'minio', position: { x: 60, y: 700 }, data: { label: 'MinIO', icon: '💾', version: '2024.11', status: 'healthy', category: 'ObjectStorage', layer: 'provides: S3API' } },
  { id: 'pg', position: { x: 680, y: 700 }, data: { label: 'PostgreSQL', icon: '🐘', version: '16.4', status: 'healthy', category: 'RDBMS', layer: 'provides: PostgresWire' } },
];

/* Edge label with white bg for light theme */
const edgeLabelBg = { edgeLabelBgPadding: [6, 3] as [number, number], edgeLabelBgBorderRadius: 4, edgeLabelBgStyle: { fill: '#ffffff', stroke: '#e2e8f0', strokeWidth: 1 } };

const ontoEdges: Edge[] = [
  { id: 'e10', source: 'flink', target: 'spark', label: 'CONFLICTS_WITH', type: 'smoothstep', style: { stroke: '#dc2626', strokeDasharray: '5 5' }, labelStyle: { fill: '#dc2626', fontSize: 9, fontWeight: 600 }, ...edgeLabelBg },
  { id: 'e1', source: 'spark', target: 'iceberg', label: 'COMPATIBLE', type: 'smoothstep', animated: true, style: { stroke: '#7c3aed' }, labelStyle: { fill: '#7c3aed', fontSize: 9, fontWeight: 600 }, ...edgeLabelBg },
  { id: 'e3', source: 'spark', target: 'spark-op', label: 'MANAGED_BY', type: 'smoothstep', style: { stroke: '#16a34a' }, labelStyle: { fill: '#16a34a', fontSize: 9, fontWeight: 600 }, ...edgeLabelBg },
  { id: 'e2', source: 'spark', target: 'hive', label: 'DEPENDS_ON', type: 'smoothstep', style: { stroke: '#ca8a04' }, labelStyle: { fill: '#ca8a04', fontSize: 9 }, ...edgeLabelBg },
  { id: 'e4', source: 'spark', target: 'minio', label: 'DEPENDS_ON', type: 'smoothstep', style: { stroke: '#ca8a04' }, labelStyle: { fill: '#ca8a04', fontSize: 9 }, ...edgeLabelBg },
  { id: 'e5', source: 'iceberg', target: 'hive', label: 'DEPENDS_ON', type: 'smoothstep', style: { stroke: '#ca8a04' }, labelStyle: { fill: '#ca8a04', fontSize: 9 }, ...edgeLabelBg },
  { id: 'e6', source: 'iceberg', target: 'minio', label: 'DEPENDS_ON', type: 'smoothstep', style: { stroke: '#ca8a04' }, labelStyle: { fill: '#ca8a04', fontSize: 9 }, ...edgeLabelBg },
  { id: 'e7', source: 'trino', target: 'hive', label: 'DEPENDS_ON', type: 'smoothstep', style: { stroke: '#2563eb' }, labelStyle: { fill: '#2563eb', fontSize: 9 }, ...edgeLabelBg },
  { id: 'e8', source: 'hive', target: 'pg', label: 'DEPENDS_ON', type: 'smoothstep', style: { stroke: '#ca8a04' }, labelStyle: { fill: '#ca8a04', fontSize: 9 }, ...edgeLabelBg },
  { id: 'e9', source: 'hive', target: 'minio', label: 'DEPENDS_ON', type: 'smoothstep', style: { stroke: '#94a3b8' }, labelStyle: { fill: '#94a3b8', fontSize: 9 }, ...edgeLabelBg },
];

const queryExamples = [
  { q: 'Spark의 모든 의존성은?', endpoint: 'GET /api/v1/dependencies/spark' },
  { q: 'Iceberg 1.7.0으로 올릴 수 있어?', endpoint: 'POST /api/v1/compatibility/check' },
  { q: 'MinIO 장애 시 영향 범위는?', endpoint: 'POST /api/v1/resolve' },
  { q: 'Spark 3.6.0 업그레이드 경로', endpoint: 'POST /api/v1/upgrade-path' },
];

const queryResults = [
  `{\n  "component": "spark",\n  "dependencies": [\n    {"component":"minio","type":"hard","interface":"S3API"},\n    {"component":"hive-metastore","type":"hard","interface":"HiveMetastoreThrift"},\n    {"component":"spark-operator","type":"hard"},\n    {"component":"postgresql","type":"transitive","via":"hive-metastore"}\n  ]\n}`,
  `{\n  "compatible": true,\n  "current": {"iceberg":"1.6.1","spark":"3.5.3"},\n  "target": {"iceberg":"1.7.0"},\n  "warnings": [\n    "hive-metastore 스키마 마이그레이션 필요",\n    "spark image rebuild 권장"\n  ]\n}`,
  `{\n  "component": "minio",\n  "impact_chain": [\n    {"component":"spark","severity":"critical","reason":"checkpoint & data storage"},\n    {"component":"iceberg","severity":"critical","reason":"storage backend"},\n    {"component":"trino","severity":"high","reason":"data read path"},\n    {"component":"thanos","severity":"high","reason":"metrics storage"}\n  ],\n  "total_affected": 4\n}`,
  `{\n  "steps": [\n    {"order":1,"action":"upgrade","component":"iceberg","to":"1.7.0"},\n    {"order":2,"action":"migrate","component":"hive-metastore","script":"schema-upgrade.sql"},\n    {"order":3,"action":"rebuild","component":"spark-image","tag":"3.6.0-iceberg1.7"},\n    {"order":4,"action":"upgrade","component":"spark","to":"3.6.0"},\n    {"order":5,"action":"verify","component":"trino","check":"catalog reconnect"}\n  ],\n  "estimated_downtime": "15min"\n}`,
];

export function OntologyView() {
  const [nodes, , onNodesChange] = useNodesState(ontoNodes);
  const [edges, , onEdgesChange] = useEdgesState(ontoEdges);
  const [selectedQuery, setSelectedQuery] = useState(0);

  return (
    <Flex className="h-full">
      {/* Graph */}
      <Box className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.25 }}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#94a3b820" />
          <Controls position="bottom-right" />
          {/* Legend */}
          <Panel position="top-left">
            <Card size="1" variant="surface" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', border: '1px solid var(--color-border)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <Flex align="center" gap="2" mb="2">
                <Database size={13} style={{ color: 'var(--color-accent-purple)' }} />
                <Text size="2" weight="bold" style={{ color: 'var(--color-text-primary)' }}>관계 범례</Text>
              </Flex>
              <Flex direction="column" gap="2">
                <LegendItem color="#ca8a04" label="DEPENDS_ON" />
                <LegendItem color="#7c3aed" label="COMPATIBLE" />
                <LegendItem color="#16a34a" label="MANAGED_BY" />
                <LegendItem color="#2563eb" label="DEPENDS_ON (query)" />
                <LegendItem color="#dc2626" label="CONFLICTS_WITH" dashed />
              </Flex>
            </Card>
          </Panel>
        </ReactFlow>
      </Box>

      {/* Query Panel */}
      <Flex direction="column" className="w-[330px] shrink-0" style={{ background: 'var(--color-bg-secondary)', borderLeft: '1px solid var(--color-border)' }}>
        <Box px="4" py="3" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <Flex align="center" gap="2">
            <Search size={14} style={{ color: 'var(--color-accent-cyan)' }} />
            <Heading size="2" style={{ color: 'var(--color-text-primary)' }}>Ontology Query API</Heading>
          </Flex>
          <Text size="1" style={{ color: 'var(--color-text-muted)' }}>온톨로지를 쿼리하여 의존성·호환성 탐색</Text>
        </Box>

        <ScrollArea scrollbars="vertical" className="flex-1">
          <Flex direction="column" gap="2" p="3">
            {queryExamples.map((q, i) => (
              <Card
                key={i}
                size="1"
                variant={selectedQuery === i ? 'classic' : 'surface'}
                onClick={() => setSelectedQuery(i)}
                style={{
                  cursor: 'pointer',
                  background: selectedQuery === i ? 'rgba(124,58,237,0.04)' : '#ffffff',
                  border: `1px solid ${selectedQuery === i ? 'rgba(124,58,237,0.25)' : 'var(--color-border)'}`,
                }}
              >
                <Text size="1" weight="medium" style={{ color: 'var(--color-text-primary)' }}>{q.q}</Text>
                <Flex align="center" gap="1" mt="1">
                  <Zap size={8} style={{ color: 'var(--color-accent-cyan)' }} />
                  <Code size="1" color="cyan" variant="ghost" style={{ fontSize: 9 }}>{q.endpoint}</Code>
                </Flex>
              </Card>
            ))}
          </Flex>
        </ScrollArea>

        <Box p="3" style={{ borderTop: '1px solid var(--color-border)' }}>
          <Text size="1" className="font-mono" style={{ color: 'var(--color-text-muted)', marginBottom: 6, display: 'block' }}>Response</Text>
          <Card size="1" variant="surface" style={{ background: '#f8fafc', border: '1px solid var(--color-border)', maxHeight: 280, overflow: 'auto' }}>
            <Text size="1" className="font-mono" style={{ color: 'var(--color-text-secondary)', whiteSpace: 'pre-wrap', wordBreak: 'break-word', lineHeight: 1.7, fontSize: 10 }}>
              {queryResults[selectedQuery]}
            </Text>
          </Card>
        </Box>
      </Flex>
    </Flex>
  );
}

function LegendItem({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <Flex align="center" gap="2">
      <div style={{ width: 24, height: 2, borderRadius: 2, background: dashed ? 'transparent' : color, borderTop: dashed ? `2px dashed ${color}` : undefined, flexShrink: 0 }} />
      <ArrowRightLeft size={8} style={{ color, flexShrink: 0 }} />
      <Text size="1" style={{ color: 'var(--color-text-secondary)', fontSize: 9, whiteSpace: 'nowrap' }}>{label}</Text>
    </Flex>
  );
}
