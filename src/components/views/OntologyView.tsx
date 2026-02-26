import { useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
} from '@xyflow/react';
import { Database, ArrowRightLeft, Search, Zap } from 'lucide-react';
import { TopoNode } from '../shared/TopoNode';
import type { TopoNodeData } from '../../data/topology';

const nodeTypes = { default: TopoNode };

// Ontology-specific graph: shows component relationships
const ontoNodes: Node<TopoNodeData>[] = [
  { id: 'spark', position: { x: 300, y: 40 }, data: { label: 'Apache Spark', icon: '✨', version: '3.5.3', status: 'healthy', category: 'BatchProcessor', layer: 'provides: SparkSubmit, StructuredStreaming' } },
  { id: 'iceberg', position: { x: 80, y: 180 }, data: { label: 'Apache Iceberg', icon: '🧊', version: '1.6.1', status: 'healthy', category: 'TableFormat', layer: 'provides: IcebergCatalog' } },
  { id: 'trino', position: { x: 520, y: 180 }, data: { label: 'Trino', icon: '🔎', version: '460', status: 'healthy', category: 'SQLEngine', layer: 'provides: JDBCEndpoint' } },
  { id: 'hive', position: { x: 300, y: 320 }, data: { label: 'Hive Metastore', icon: '🐝', version: '3.1.3', status: 'warning', category: 'MetadataCatalog', layer: 'provides: HiveMetastoreThrift' } },
  { id: 'minio', position: { x: 80, y: 460 }, data: { label: 'MinIO', icon: '💾', version: '2024.11', status: 'healthy', category: 'ObjectStorage', layer: 'provides: S3API' } },
  { id: 'pg', position: { x: 520, y: 460 }, data: { label: 'PostgreSQL', icon: '🐘', version: '16.4', status: 'healthy', category: 'RDBMS', layer: 'provides: PostgresWire' } },
  { id: 'spark-op', position: { x: 600, y: 40 }, data: { label: 'Spark Operator', icon: '⚙️', version: '1.4.6', status: 'healthy', category: 'Operator', layer: 'manages: Spark' } },
  { id: 'flink', position: { x: 40, y: 40 }, data: { label: 'Apache Flink', icon: '🌊', version: '1.19', status: 'healthy', category: 'StreamProcessor', layer: 'conflicts_with: Spark (soft)' } },
];

const ontoEdges: Edge[] = [
  { id: 'e1', source: 'spark', target: 'iceberg', label: 'COMPATIBLE_WITH', type: 'smoothstep', animated: true, style: { stroke: '#a78bfa' }, labelStyle: { fill: '#8b949e', fontSize: 9 } },
  { id: 'e2', source: 'spark', target: 'hive', label: 'DEPENDS_ON (hard)', type: 'smoothstep', style: { stroke: '#fbbf24' }, labelStyle: { fill: '#fbbf24', fontSize: 9 } },
  { id: 'e3', source: 'spark', target: 'spark-op', label: 'MANAGED_BY', type: 'smoothstep', style: { stroke: '#4ade80' }, labelStyle: { fill: '#8b949e', fontSize: 9 } },
  { id: 'e4', source: 'spark', target: 'minio', label: 'DEPENDS_ON (hard)', type: 'smoothstep', style: { stroke: '#fbbf24' }, labelStyle: { fill: '#fbbf24', fontSize: 9 } },
  { id: 'e5', source: 'iceberg', target: 'hive', label: 'DEPENDS_ON (hard)', type: 'smoothstep', style: { stroke: '#fbbf24' }, labelStyle: { fill: '#fbbf24', fontSize: 9 } },
  { id: 'e6', source: 'iceberg', target: 'minio', label: 'DEPENDS_ON (hard)', type: 'smoothstep', style: { stroke: '#fbbf24' }, labelStyle: { fill: '#fbbf24', fontSize: 9 } },
  { id: 'e7', source: 'trino', target: 'hive', label: 'DEPENDS_ON', type: 'smoothstep', style: { stroke: '#38bdf8' }, labelStyle: { fill: '#8b949e', fontSize: 9 } },
  { id: 'e8', source: 'hive', target: 'pg', label: 'DEPENDS_ON (hard)', type: 'smoothstep', style: { stroke: '#fbbf24' }, labelStyle: { fill: '#fbbf24', fontSize: 9 } },
  { id: 'e9', source: 'hive', target: 'minio', label: 'DEPENDS_ON', type: 'smoothstep', style: { stroke: '#38bdf844' }, labelStyle: { fill: '#8b949e', fontSize: 9 } },
  { id: 'e10', source: 'spark', target: 'flink', label: 'CONFLICTS_WITH', type: 'smoothstep', style: { stroke: '#f87171', strokeDasharray: '5 5' }, labelStyle: { fill: '#f87171', fontSize: 9 } },
];

const queryExamples = [
  { q: 'Spark의 모든 의존성은?', endpoint: 'GET /api/v1/dependencies/spark' },
  { q: 'Iceberg 1.7.0으로 올릴 수 있어?', endpoint: 'POST /api/v1/compatibility/check' },
  { q: 'MinIO 장애 시 영향 범위는?', endpoint: 'POST /api/v1/resolve' },
  { q: 'Spark 3.6.0 업그레이드 경로', endpoint: 'POST /api/v1/upgrade-path' },
];

export function OntologyView() {
  const [nodes, , onNodesChange] = useNodesState(ontoNodes);
  const [edges, , onEdgesChange] = useEdgesState(ontoEdges);
  const [selectedQuery, setSelectedQuery] = useState(0);

  return (
    <div className="flex h-full">
      {/* Graph */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#1e293b40" />
          <Controls position="bottom-right" />
        </ReactFlow>

        {/* Legend */}
        <div className="absolute top-3 left-3 bg-bg-secondary/95 backdrop-blur-sm border border-border rounded-xl p-3 z-10">
          <div className="text-[11px] font-bold text-text-primary mb-2 flex items-center gap-1.5">
            <Database size={12} className="text-accent-purple" />
            Ontology Graph — 관계 범례
          </div>
          <div className="space-y-1.5">
            <LegendItem color="#fbbf24" label="DEPENDS_ON (hard)" />
            <LegendItem color="#a78bfa" label="COMPATIBLE_WITH" />
            <LegendItem color="#4ade80" label="MANAGED_BY" />
            <LegendItem color="#f87171" label="CONFLICTS_WITH" dashed />
          </div>
        </div>
      </div>

      {/* Query Panel */}
      <div className="w-[320px] shrink-0 border-l border-border bg-bg-secondary flex flex-col">
        <div className="px-4 py-3 border-b border-border">
          <div className="text-[13px] font-bold text-text-primary flex items-center gap-2">
            <Search size={14} className="text-accent-cyan" />
            Ontology Query API
          </div>
          <div className="text-[10px] text-text-muted mt-0.5">온톨로지를 쿼리하여 의존성·호환성 탐색</div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {queryExamples.map((q, i) => (
            <button
              key={i}
              onClick={() => setSelectedQuery(i)}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                selectedQuery === i
                  ? 'bg-accent-purple/10 border-accent-purple/30'
                  : 'bg-bg-primary border-border hover:border-border-hover'
              }`}
            >
              <div className="text-[11px] font-semibold text-text-primary">{q.q}</div>
              <div className="text-[9px] font-mono text-accent-cyan mt-1 flex items-center gap-1">
                <Zap size={8} /> {q.endpoint}
              </div>
            </button>
          ))}
        </div>

        {/* Query Result */}
        <div className="border-t border-border p-3">
          <div className="text-[10px] font-mono text-text-muted mb-1.5">Response</div>
          <div className="bg-bg-primary border border-border rounded-lg p-3 text-[10px] font-mono text-text-secondary max-h-[200px] overflow-y-auto whitespace-pre-wrap leading-relaxed">
            {selectedQuery === 0 && `{
  "component": "spark",
  "dependencies": [
    {"component":"minio","type":"hard","interface":"S3API"},
    {"component":"hive-metastore","type":"hard","interface":"HiveMetastoreThrift"},
    {"component":"spark-operator","type":"hard"},
    {"component":"postgresql","type":"transitive","via":"hive-metastore"}
  ]
}`}
            {selectedQuery === 1 && `{
  "compatible": true,
  "current": {"iceberg":"1.6.1","spark":"3.5.3"},
  "target": {"iceberg":"1.7.0"},
  "warnings": [
    "hive-metastore 스키마 마이그레이션 필요",
    "spark image rebuild 권장"
  ]
}`}
            {selectedQuery === 2 && `{
  "component": "minio",
  "impact_chain": [
    {"component":"spark","severity":"critical","reason":"checkpoint & data storage"},
    {"component":"iceberg","severity":"critical","reason":"storage backend"},
    {"component":"trino","severity":"high","reason":"data read path"},
    {"component":"thanos","severity":"high","reason":"metrics storage"}
  ],
  "total_affected": 4
}`}
            {selectedQuery === 3 && `{
  "steps": [
    {"order":1,"action":"upgrade","component":"iceberg","to":"1.7.0"},
    {"order":2,"action":"migrate","component":"hive-metastore","script":"schema-upgrade.sql"},
    {"order":3,"action":"rebuild","component":"spark-image","tag":"3.6.0-iceberg1.7"},
    {"order":4,"action":"upgrade","component":"spark","to":"3.6.0"},
    {"order":5,"action":"verify","component":"trino","check":"catalog reconnect"}
  ],
  "estimated_downtime": "15min"
}`}
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <div className="flex items-center gap-2 text-[9px] text-text-secondary">
      <div className="w-6 h-0.5 rounded" style={{
        background: dashed ? 'transparent' : color,
        borderTop: dashed ? `2px dashed ${color}` : undefined,
      }} />
      <ArrowRightLeft size={8} style={{ color }} />
      <span>{label}</span>
    </div>
  );
}
