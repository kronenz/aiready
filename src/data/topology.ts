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
  isLayerLabel?: boolean;
  [key: string]: unknown;
}

/* 7 layers — Compute & Network added at L0/L1 */
const layerY: Record<string, number> = {
  'L0-Compute': 0,
  'L1-Network': 180,
  'L2-Security': 360,
  'L3-Storage': 540,
  'L4-Monitor': 720,
  'L5-Data': 900,
  'L6-App': 1080,
};

/* Light theme node style */
const nodeStyle = (color: string) => ({
  background: '#ffffff',
  border: `1.5px solid ${color}`,
  borderRadius: 12,
  padding: 0,
  width: 180,
  boxShadow: `0 1px 4px ${color}18`,
});

/* Layer label nodes — rendered inside ReactFlow canvas */
const layerLabelNodes: Node<TopoNodeData>[] = [
  { id: 'label-l0', type: 'layerLabel', position: { x: -120, y: layerY['L0-Compute'] + 30 }, data: { label: 'L0 — Compute', icon: '', version: '', status: 'healthy', category: '', layer: '' }, draggable: false, selectable: false, connectable: false },
  { id: 'label-l1', type: 'layerLabel', position: { x: -120, y: layerY['L1-Network'] + 30 }, data: { label: 'L1 — Network', icon: '', version: '', status: 'healthy', category: '', layer: '' }, draggable: false, selectable: false, connectable: false },
  { id: 'label-l2', type: 'layerLabel', position: { x: -120, y: layerY['L2-Security'] + 30 }, data: { label: 'L2 — Security & GitOps', icon: '', version: '', status: 'healthy', category: '', layer: '' }, draggable: false, selectable: false, connectable: false },
  { id: 'label-l3', type: 'layerLabel', position: { x: -120, y: layerY['L3-Storage'] + 30 }, data: { label: 'L3 — Storage & Data', icon: '', version: '', status: 'healthy', category: '', layer: '' }, draggable: false, selectable: false, connectable: false },
  { id: 'label-l4', type: 'layerLabel', position: { x: -120, y: layerY['L4-Monitor'] + 30 }, data: { label: 'L4 — Monitoring', icon: '', version: '', status: 'healthy', category: '', layer: '' }, draggable: false, selectable: false, connectable: false },
  { id: 'label-l5', type: 'layerLabel', position: { x: -120, y: layerY['L5-Data'] + 30 }, data: { label: 'L5 — Data Processing', icon: '', version: '', status: 'healthy', category: '', layer: '' }, draggable: false, selectable: false, connectable: false },
  { id: 'label-l6', type: 'layerLabel', position: { x: -120, y: layerY['L6-App'] + 30 }, data: { label: 'L6 — Applications', icon: '', version: '', status: 'healthy', category: '', layer: '' }, draggable: false, selectable: false, connectable: false },
];

export const topologyNodes: Node<TopoNodeData>[] = [
  ...layerLabelNodes,

  /* ── L0 — Compute ── */
  { id: 'k8s-api', position: { x: 50, y: layerY['L0-Compute'] }, data: { label: 'K8s API Server', icon: '☸️', version: '1.31.2', status: 'healthy', category: 'Control Plane', layer: 'L0-Compute', cpu: '4', memory: '8Gi', replicas: 3 }, style: nodeStyle('#4f46e5') },
  { id: 'worker-pool', position: { x: 280, y: layerY['L0-Compute'] }, data: { label: 'Worker Pool (x86)', icon: '🖥️', version: '1.31.2', status: 'healthy', category: 'Node Pool', layer: 'L0-Compute', cpu: '16×50', memory: '64Gi×50', replicas: 50 }, style: nodeStyle('#4f46e5') },
  { id: 'gpu-pool', position: { x: 510, y: layerY['L0-Compute'] }, data: { label: 'GPU Node Pool', icon: '🎮', version: '1.31.2', status: 'healthy', category: 'Node Pool (A100)', layer: 'L0-Compute', cpu: '8×4', memory: '128Gi×4', replicas: 4 }, style: nodeStyle('#7c3aed') },
  { id: 'autoscaler', position: { x: 740, y: layerY['L0-Compute'] }, data: { label: 'Cluster Autoscaler', icon: '📐', version: '1.31.0', status: 'healthy', category: 'Scaling', layer: 'L0-Compute', cpu: '200m', memory: '256Mi', replicas: 1 }, style: nodeStyle('#4f46e5') },

  /* ── L1 — Network ── */
  { id: 'cilium', position: { x: 50, y: layerY['L1-Network'] }, data: { label: 'Cilium CNI', icon: '🔒', version: '1.16.1', status: 'healthy', category: 'CNI / eBPF', layer: 'L1-Network', cpu: '200m', memory: '256Mi', replicas: 3 }, style: nodeStyle('#0d9488') },
  { id: 'ingress', position: { x: 280, y: layerY['L1-Network'] }, data: { label: 'NGINX Ingress', icon: '🌐', version: '1.11.3', status: 'healthy', category: 'Ingress Controller', layer: 'L1-Network', cpu: '500m', memory: '512Mi', replicas: 3 }, style: nodeStyle('#0d9488') },
  { id: 'coredns', position: { x: 510, y: layerY['L1-Network'] }, data: { label: 'CoreDNS', icon: '🔤', version: '1.11.3', status: 'healthy', category: 'DNS', layer: 'L1-Network', cpu: '100m', memory: '128Mi', replicas: 2 }, style: nodeStyle('#0d9488') },
  { id: 'metallb', position: { x: 740, y: layerY['L1-Network'] }, data: { label: 'MetalLB', icon: '⚖️', version: '0.14.8', status: 'healthy', category: 'Load Balancer', layer: 'L1-Network', cpu: '100m', memory: '128Mi', replicas: 2 }, style: nodeStyle('#0d9488') },

  /* ── L2 — Security & GitOps ── */
  { id: 'cert-manager', position: { x: 50, y: layerY['L2-Security'] }, data: { label: 'cert-manager', icon: '🔐', version: '1.15.3', status: 'healthy', category: 'TLS/Security', layer: 'L2-Security', cpu: '100m', memory: '128Mi', replicas: 1 }, style: nodeStyle('#be185d') },
  { id: 'external-secrets', position: { x: 280, y: layerY['L2-Security'] }, data: { label: 'External Secrets', icon: '🗝️', version: '0.10.0', status: 'healthy', category: 'Secrets Mgmt', layer: 'L2-Security', cpu: '100m', memory: '128Mi', replicas: 1 }, style: nodeStyle('#be185d') },
  { id: 'argocd', position: { x: 510, y: layerY['L2-Security'] }, data: { label: 'ArgoCD', icon: '🔄', version: '2.12.3', status: 'healthy', category: 'GitOps', layer: 'L2-Security', cpu: '500m', memory: '512Mi', replicas: 2 }, style: nodeStyle('#16a34a') },
  { id: 'vault', position: { x: 740, y: layerY['L2-Security'] }, data: { label: 'HashiCorp Vault', icon: '🏦', version: '1.17.6', status: 'healthy', category: 'Secrets Engine', layer: 'L2-Security', cpu: '250m', memory: '256Mi', replicas: 3 }, style: nodeStyle('#be185d') },

  /* ── L3 — Storage & Data ── */
  { id: 'minio', position: { x: 50, y: layerY['L3-Storage'] }, data: { label: 'MinIO', icon: '💾', version: '2024.11.7', status: 'healthy', category: 'Object Storage', layer: 'L3-Storage', cpu: '2', memory: '8Gi', replicas: 4 }, style: nodeStyle('#c2410c') },
  { id: 'postgresql', position: { x: 280, y: layerY['L3-Storage'] }, data: { label: 'PostgreSQL', icon: '🐘', version: '16.4', status: 'healthy', category: 'RDBMS', layer: 'L3-Storage', cpu: '1', memory: '2Gi', replicas: 1 }, style: nodeStyle('#2563eb') },
  { id: 'hive-metastore', position: { x: 510, y: layerY['L3-Storage'] }, data: { label: 'Hive Metastore', icon: '🐝', version: '3.1.3', status: 'warning', category: 'Metadata', layer: 'L3-Storage', cpu: '500m', memory: '1Gi', replicas: 2 }, style: nodeStyle('#ca8a04') },
  { id: 'kafka', position: { x: 740, y: layerY['L3-Storage'] }, data: { label: 'Kafka (Strimzi)', icon: '📨', version: '3.8.0', status: 'healthy', category: 'Messaging', layer: 'L3-Storage', cpu: '2', memory: '4Gi', replicas: 3 }, style: nodeStyle('#16a34a') },

  /* ── L4 — Monitoring ── */
  { id: 'prometheus', position: { x: 50, y: layerY['L4-Monitor'] }, data: { label: 'Prometheus', icon: '🔥', version: '2.54.1', status: 'healthy', category: 'Metrics', layer: 'L4-Monitor', cpu: '1', memory: '4Gi', replicas: 2 }, style: nodeStyle('#dc2626') },
  { id: 'thanos', position: { x: 280, y: layerY['L4-Monitor'] }, data: { label: 'Thanos', icon: '📊', version: '0.36.1', status: 'healthy', category: 'Metrics HA', layer: 'L4-Monitor', cpu: '500m', memory: '2Gi', replicas: 3 }, style: nodeStyle('#dc2626') },
  { id: 'opensearch', position: { x: 510, y: layerY['L4-Monitor'] }, data: { label: 'OpenSearch', icon: '🔍', version: '2.17.0', status: 'healthy', category: 'Logging', layer: 'L4-Monitor', cpu: '2', memory: '8Gi', replicas: 3 }, style: nodeStyle('#ea580c') },
  { id: 'grafana', position: { x: 740, y: layerY['L4-Monitor'] }, data: { label: 'Grafana', icon: '📈', version: '11.3.0', status: 'healthy', category: 'Visualization', layer: 'L4-Monitor', cpu: '500m', memory: '512Mi', replicas: 1 }, style: nodeStyle('#ca8a04') },

  /* ── L5 — Data Processing ── */
  { id: 'spark', position: { x: 120, y: layerY['L5-Data'] }, data: { label: 'Apache Spark', icon: '✨', version: '3.5.3', status: 'healthy', category: 'Batch Processing', layer: 'L5-Data', cpu: '2-8', memory: '4Gi-32Gi', replicas: 20 }, style: nodeStyle('#7c3aed') },
  { id: 'iceberg', position: { x: 400, y: layerY['L5-Data'] }, data: { label: 'Apache Iceberg', icon: '🧊', version: '1.6.1', status: 'healthy', category: 'Table Format', layer: 'L5-Data', cpu: '-', memory: '-' }, style: nodeStyle('#0891b2') },
  { id: 'trino', position: { x: 650, y: layerY['L5-Data'] }, data: { label: 'Trino', icon: '🔎', version: '460', status: 'healthy', category: 'SQL Engine', layer: 'L5-Data', cpu: '4', memory: '16Gi', replicas: 6 }, style: nodeStyle('#2563eb') },

  /* ── L6 — Applications ── */
  { id: 'airflow', position: { x: 200, y: layerY['L6-App'] }, data: { label: 'Apache Airflow', icon: '🌊', version: '2.10.2', status: 'healthy', category: 'Orchestration', layer: 'L6-App', cpu: '1', memory: '2Gi', replicas: 2 }, style: nodeStyle('#0891b2') },
  { id: 'jupyterhub', position: { x: 530, y: layerY['L6-App'] }, data: { label: 'JupyterHub', icon: '📓', version: '4.1.5', status: 'healthy', category: 'Notebook', layer: 'L6-App', cpu: '500m', memory: '1Gi', replicas: 1 }, style: nodeStyle('#ca8a04') },
];

export const topologyEdges: Edge[] = [
  /* ── Compute ── */
  { id: 'e-api-worker', source: 'k8s-api', target: 'worker-pool', type: 'smoothstep', animated: true, style: { stroke: '#4f46e540' } },
  { id: 'e-api-gpu', source: 'k8s-api', target: 'gpu-pool', type: 'smoothstep', animated: true, style: { stroke: '#7c3aed40' } },
  { id: 'e-scaler-api', source: 'autoscaler', target: 'k8s-api', type: 'smoothstep', style: { stroke: '#4f46e530' } },

  /* ── Network ── */
  { id: 'e-metallb-ingress', source: 'metallb', target: 'ingress', type: 'smoothstep', style: { stroke: '#0d948840' } },
  { id: 'e-ingress-cilium', source: 'ingress', target: 'cilium', type: 'smoothstep', style: { stroke: '#0d948830' } },

  /* ── Security → Infrastructure ── */
  { id: 'e-ext-vault', source: 'external-secrets', target: 'vault', type: 'smoothstep', style: { stroke: '#be185d30' } },

  /* ── Spark dependencies ── */
  { id: 'e-spark-minio', source: 'spark', target: 'minio', type: 'smoothstep', animated: true, style: { stroke: '#7c3aed50' } },
  { id: 'e-spark-hive', source: 'spark', target: 'hive-metastore', type: 'smoothstep', animated: true, style: { stroke: '#7c3aed50' } },
  { id: 'e-spark-iceberg', source: 'spark', target: 'iceberg', type: 'smoothstep', style: { stroke: '#7c3aed40' } },

  /* ── Iceberg dependencies ── */
  { id: 'e-iceberg-minio', source: 'iceberg', target: 'minio', type: 'smoothstep', style: { stroke: '#0891b240' } },
  { id: 'e-iceberg-hive', source: 'iceberg', target: 'hive-metastore', type: 'smoothstep', style: { stroke: '#0891b240' } },

  /* ── Trino ── */
  { id: 'e-trino-hive', source: 'trino', target: 'hive-metastore', type: 'smoothstep', style: { stroke: '#2563eb40' } },
  { id: 'e-trino-minio', source: 'trino', target: 'minio', type: 'smoothstep', style: { stroke: '#2563eb40' } },

  /* ── Hive → PostgreSQL ── */
  { id: 'e-hive-pg', source: 'hive-metastore', target: 'postgresql', type: 'smoothstep', style: { stroke: '#ca8a0440' } },

  /* ── Monitoring ── */
  { id: 'e-prom-thanos', source: 'prometheus', target: 'thanos', type: 'smoothstep', animated: true, style: { stroke: '#dc262640' } },
  { id: 'e-thanos-minio', source: 'thanos', target: 'minio', type: 'smoothstep', style: { stroke: '#dc262630' } },
  { id: 'e-grafana-prom', source: 'grafana', target: 'prometheus', type: 'smoothstep', style: { stroke: '#ca8a0430' } },
  { id: 'e-grafana-thanos', source: 'grafana', target: 'thanos', type: 'smoothstep', style: { stroke: '#ca8a0430' } },

  /* ── App → Compute/Data ── */
  { id: 'e-airflow-spark', source: 'airflow', target: 'spark', type: 'smoothstep', animated: true, style: { stroke: '#0891b250' } },
  { id: 'e-airflow-pg', source: 'airflow', target: 'postgresql', type: 'smoothstep', style: { stroke: '#0891b230' } },
  { id: 'e-airflow-api', source: 'airflow', target: 'k8s-api', type: 'smoothstep', style: { stroke: '#0891b220' } },
  { id: 'e-jupyter-spark', source: 'jupyterhub', target: 'spark', type: 'smoothstep', style: { stroke: '#ca8a0440' } },
  { id: 'e-jupyter-trino', source: 'jupyterhub', target: 'trino', type: 'smoothstep', style: { stroke: '#ca8a0440' } },
  { id: 'e-jupyter-api', source: 'jupyterhub', target: 'k8s-api', type: 'smoothstep', style: { stroke: '#ca8a0420' } },

  /* ── Spark → Compute scheduling ── */
  { id: 'e-spark-worker', source: 'spark', target: 'worker-pool', type: 'smoothstep', style: { stroke: '#7c3aed20' } },
];
