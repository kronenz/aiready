import type { Node, Edge } from '@xyflow/react';

export interface TopoNodeData {
  label: string;
  icon: string;
  version: string;
  status: 'healthy' | 'warning' | 'error' | 'deploying';
  category: string;
  layer: string;
  cpu?: string;
  memory?: string;
  replicas?: number;
  [key: string]: unknown;
}

const layerY: Record<string, number> = {
  'L0-Infra': 0,
  'L1-Storage': 150,
  'L2-Platform': 300,
  'L3-Data': 450,
  'L4-App': 600,
};

const nodeStyle = (color: string) => ({
  background: '#0c1018',
  border: `1px solid ${color}44`,
  borderRadius: 12,
  padding: 0,
  width: 180,
});

export const topologyNodes: Node<TopoNodeData>[] = [
  // L0 - Infrastructure
  { id: 'cilium', position: { x: 50, y: layerY['L0-Infra'] }, data: { label: 'Cilium CNI', icon: '🔒', version: '1.16.1', status: 'healthy', category: 'Networking', layer: 'L0-Infra', cpu: '200m', memory: '256Mi', replicas: 3 }, style: nodeStyle('#22d3ee') },
  { id: 'cert-manager', position: { x: 280, y: layerY['L0-Infra'] }, data: { label: 'cert-manager', icon: '🔐', version: '1.15.3', status: 'healthy', category: 'Security', layer: 'L0-Infra', cpu: '100m', memory: '128Mi', replicas: 1 }, style: nodeStyle('#f472b6') },
  { id: 'external-secrets', position: { x: 510, y: layerY['L0-Infra'] }, data: { label: 'External Secrets', icon: '🗝️', version: '0.10.0', status: 'healthy', category: 'Security', layer: 'L0-Infra', cpu: '100m', memory: '128Mi', replicas: 1 }, style: nodeStyle('#f472b6') },
  { id: 'argocd', position: { x: 740, y: layerY['L0-Infra'] }, data: { label: 'ArgoCD', icon: '🔄', version: '2.12.3', status: 'healthy', category: 'GitOps', layer: 'L0-Infra', cpu: '500m', memory: '512Mi', replicas: 2 }, style: nodeStyle('#4ade80') },

  // L1 - Storage & DB
  { id: 'minio', position: { x: 50, y: layerY['L1-Storage'] }, data: { label: 'MinIO', icon: '💾', version: '2024.11.7', status: 'healthy', category: 'Object Storage', layer: 'L1-Storage', cpu: '2', memory: '8Gi', replicas: 4 }, style: nodeStyle('#fb923c') },
  { id: 'postgresql', position: { x: 280, y: layerY['L1-Storage'] }, data: { label: 'PostgreSQL', icon: '🐘', version: '16.4', status: 'healthy', category: 'RDBMS', layer: 'L1-Storage', cpu: '1', memory: '2Gi', replicas: 1 }, style: nodeStyle('#38bdf8') },
  { id: 'hive-metastore', position: { x: 510, y: layerY['L1-Storage'] }, data: { label: 'Hive Metastore', icon: '🐝', version: '3.1.3', status: 'warning', category: 'Metadata', layer: 'L1-Storage', cpu: '500m', memory: '1Gi', replicas: 2 }, style: nodeStyle('#fbbf24') },
  { id: 'kafka', position: { x: 740, y: layerY['L1-Storage'] }, data: { label: 'Kafka (Strimzi)', icon: '📨', version: '3.8.0', status: 'healthy', category: 'Messaging', layer: 'L1-Storage', cpu: '2', memory: '4Gi', replicas: 3 }, style: nodeStyle('#4ade80') },

  // L2 - Monitoring
  { id: 'prometheus', position: { x: 50, y: layerY['L2-Platform'] }, data: { label: 'Prometheus', icon: '🔥', version: '2.54.1', status: 'healthy', category: 'Monitoring', layer: 'L2-Platform', cpu: '1', memory: '4Gi', replicas: 2 }, style: nodeStyle('#f87171') },
  { id: 'thanos', position: { x: 280, y: layerY['L2-Platform'] }, data: { label: 'Thanos', icon: '📊', version: '0.36.1', status: 'healthy', category: 'Monitoring', layer: 'L2-Platform', cpu: '500m', memory: '2Gi', replicas: 3 }, style: nodeStyle('#f87171') },
  { id: 'opensearch', position: { x: 510, y: layerY['L2-Platform'] }, data: { label: 'OpenSearch', icon: '🔍', version: '2.17.0', status: 'healthy', category: 'Logging', layer: 'L2-Platform', cpu: '2', memory: '8Gi', replicas: 3 }, style: nodeStyle('#fb923c') },
  { id: 'grafana', position: { x: 740, y: layerY['L2-Platform'] }, data: { label: 'Grafana', icon: '📈', version: '11.3.0', status: 'healthy', category: 'Visualization', layer: 'L2-Platform', cpu: '500m', memory: '512Mi', replicas: 1 }, style: nodeStyle('#fbbf24') },

  // L3 - Data Processing
  { id: 'spark', position: { x: 120, y: layerY['L3-Data'] }, data: { label: 'Apache Spark', icon: '✨', version: '3.5.3', status: 'healthy', category: 'Batch Processing', layer: 'L3-Data', cpu: '2-8', memory: '4Gi-32Gi', replicas: 20 }, style: nodeStyle('#a78bfa') },
  { id: 'iceberg', position: { x: 350, y: layerY['L3-Data'] }, data: { label: 'Apache Iceberg', icon: '🧊', version: '1.6.1', status: 'healthy', category: 'Table Format', layer: 'L3-Data', cpu: '-', memory: '-' }, style: nodeStyle('#22d3ee') },
  { id: 'trino', position: { x: 580, y: layerY['L3-Data'] }, data: { label: 'Trino', icon: '🔎', version: '460', status: 'healthy', category: 'SQL Engine', layer: 'L3-Data', cpu: '4', memory: '16Gi', replicas: 6 }, style: nodeStyle('#38bdf8') },

  // L4 - App
  { id: 'airflow', position: { x: 200, y: layerY['L4-App'] }, data: { label: 'Apache Airflow', icon: '🌊', version: '2.10.2', status: 'healthy', category: 'Orchestration', layer: 'L4-App', cpu: '1', memory: '2Gi', replicas: 2 }, style: nodeStyle('#22d3ee') },
  { id: 'jupyterhub', position: { x: 480, y: layerY['L4-App'] }, data: { label: 'JupyterHub', icon: '📓', version: '4.1.5', status: 'healthy', category: 'Notebook', layer: 'L4-App', cpu: '500m', memory: '1Gi', replicas: 1 }, style: nodeStyle('#fbbf24') },
];

export const topologyEdges: Edge[] = [
  // Spark dependencies
  { id: 'e-spark-minio', source: 'spark', target: 'minio', type: 'smoothstep', animated: true, style: { stroke: '#a78bfa44' } },
  { id: 'e-spark-hive', source: 'spark', target: 'hive-metastore', type: 'smoothstep', animated: true, style: { stroke: '#a78bfa44' } },
  { id: 'e-spark-iceberg', source: 'spark', target: 'iceberg', type: 'smoothstep', style: { stroke: '#a78bfa44' } },

  // Iceberg dependencies
  { id: 'e-iceberg-minio', source: 'iceberg', target: 'minio', type: 'smoothstep', style: { stroke: '#22d3ee44' } },
  { id: 'e-iceberg-hive', source: 'iceberg', target: 'hive-metastore', type: 'smoothstep', style: { stroke: '#22d3ee44' } },

  // Trino
  { id: 'e-trino-hive', source: 'trino', target: 'hive-metastore', type: 'smoothstep', style: { stroke: '#38bdf844' } },
  { id: 'e-trino-minio', source: 'trino', target: 'minio', type: 'smoothstep', style: { stroke: '#38bdf844' } },

  // Hive -> PostgreSQL
  { id: 'e-hive-pg', source: 'hive-metastore', target: 'postgresql', type: 'smoothstep', style: { stroke: '#fbbf2444' } },

  // Monitoring
  { id: 'e-prom-thanos', source: 'prometheus', target: 'thanos', type: 'smoothstep', animated: true, style: { stroke: '#f8717144' } },
  { id: 'e-thanos-minio', source: 'thanos', target: 'minio', type: 'smoothstep', style: { stroke: '#f8717144' } },
  { id: 'e-grafana-prom', source: 'grafana', target: 'prometheus', type: 'smoothstep', style: { stroke: '#fbbf2444' } },
  { id: 'e-grafana-thanos', source: 'grafana', target: 'thanos', type: 'smoothstep', style: { stroke: '#fbbf2444' } },

  // Airflow
  { id: 'e-airflow-spark', source: 'airflow', target: 'spark', type: 'smoothstep', animated: true, style: { stroke: '#22d3ee44' } },
  { id: 'e-airflow-pg', source: 'airflow', target: 'postgresql', type: 'smoothstep', style: { stroke: '#22d3ee44' } },

  // Jupyter
  { id: 'e-jupyter-spark', source: 'jupyterhub', target: 'spark', type: 'smoothstep', style: { stroke: '#fbbf2444' } },
  { id: 'e-jupyter-trino', source: 'jupyterhub', target: 'trino', type: 'smoothstep', style: { stroke: '#fbbf2444' } },
];

export const layerLabels = [
  { label: 'L0 — Infrastructure', y: layerY['L0-Infra'] - 30, color: '#64748b' },
  { label: 'L1 — Storage & Data', y: layerY['L1-Storage'] - 30, color: '#64748b' },
  { label: 'L2 — Monitoring & Logging', y: layerY['L2-Platform'] - 30, color: '#64748b' },
  { label: 'L3 — Data Processing', y: layerY['L3-Data'] - 30, color: '#64748b' },
  { label: 'L4 — Applications', y: layerY['L4-App'] - 30, color: '#64748b' },
];
