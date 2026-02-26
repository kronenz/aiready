import { type Node, type Edge } from '@xyflow/react';
import { components } from '../../data/components';

const layerY: Record<string, number> = {
  infrastructure: 0,
  platform: 120,
  observability: 240,
  data: 370,
  agent: 520,
};

const layerLabels: Record<string, string> = {
  infrastructure: 'L0 · INFRASTRUCTURE',
  platform: 'L1 · PLATFORM CORE',
  observability: 'L2 · OBSERVABILITY',
  data: 'L2B · DATA PLATFORM',
  agent: 'L3 · AI AGENT',
};

const categoryOrder: Record<string, string[]> = {
  infrastructure: ['kubernetes', 'cilium', 'rook-ceph', 'metallb'],
  platform: ['argocd', 'kargo', 'keycloak', 'vault'],
  observability: ['prometheus', 'thanos', 'grafana', 'fluentbit', 'opensearch'],
  data: ['kafka', 'airflow', 'spark', 'iceberg', 'trino', 'minio', 'hive-metastore', 'postgresql'],
  agent: ['kagent', 'ollama'],
};

export function buildNodes(): Node[] {
  const nodes: Node[] = [];

  Object.entries(layerLabels).forEach(([cat, label]) => {
    nodes.push({
      id: `label-${cat}`,
      type: 'default',
      position: { x: -30, y: layerY[cat] + 15 },
      data: { label },
      selectable: false,
      draggable: false,
      style: {
        background: 'transparent',
        border: 'none',
        color: '#475569',
        fontSize: '9px',
        fontWeight: 600,
        letterSpacing: '2px',
        textTransform: 'uppercase' as const,
        opacity: 0.4,
        width: 'auto',
        padding: 0,
        pointerEvents: 'none' as const,
      },
    });
  });

  Object.entries(categoryOrder).forEach(([cat, ids]) => {
    const xStart = 170;
    const spacing = 155;
    ids.forEach((id, idx) => {
      const comp = components.find(c => c.id === id);
      if (!comp) return;
      nodes.push({
        id: comp.id,
        type: 'custom',
        position: { x: xStart + idx * spacing, y: layerY[cat] },
        data: {
          label: comp.name,
          icon: comp.icon,
          version: comp.version,
          color: comp.color,
          isOperator: comp.isOperator,
          status: comp.status,
        },
      });
    });
  });

  return nodes;
}

export function buildEdges(): Edge[] {
  return [
    // Platform → Infra
    { id: 'e-argocd-k8s', source: 'argocd', target: 'kubernetes', style: { stroke: '#3b82f6' } },
    // Observability
    { id: 'e-prom-thanos', source: 'prometheus', target: 'thanos', style: { stroke: '#f97316' } },
    { id: 'e-thanos-grafana', source: 'thanos', target: 'grafana', style: { stroke: '#f97316' } },
    { id: 'e-fb-os', source: 'fluentbit', target: 'opensearch', style: { stroke: '#f97316' } },
    // Data pipeline (animated)
    { id: 'e-airflow-spark', source: 'airflow', target: 'spark', animated: true, style: { stroke: '#06b6d4' } },
    { id: 'e-spark-iceberg', source: 'spark', target: 'iceberg', animated: true, style: { stroke: '#06b6d4' } },
    { id: 'e-iceberg-minio', source: 'iceberg', target: 'minio', animated: true, style: { stroke: '#06b6d4' } },
    { id: 'e-kafka-spark', source: 'kafka', target: 'spark', animated: true, style: { stroke: '#06b6d4' } },
    // Data deps
    { id: 'e-trino-iceberg', source: 'trino', target: 'iceberg', style: { stroke: '#06b6d4' } },
    { id: 'e-thanos-minio', source: 'thanos', target: 'minio', style: { stroke: '#f97316' } },
    { id: 'e-hive-pg', source: 'hive-metastore', target: 'postgresql', style: { stroke: '#06b6d4' } },
    { id: 'e-iceberg-hive', source: 'iceberg', target: 'hive-metastore', style: { stroke: '#06b6d4' } },
    // Agent (animated, purple)
    { id: 'e-kagent-prom', source: 'kagent', target: 'prometheus', animated: true, style: { stroke: '#a78bfa' } },
    { id: 'e-kagent-os', source: 'kagent', target: 'opensearch', animated: true, style: { stroke: '#a78bfa' } },
    { id: 'e-kagent-argocd', source: 'kagent', target: 'argocd', animated: true, style: { stroke: '#a78bfa' } },
  ];
}
