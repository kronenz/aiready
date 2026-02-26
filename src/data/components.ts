import type { KubeComponent } from '../types';

export const components: KubeComponent[] = [
  // L0 · INFRASTRUCTURE (빨강 #ef4444)
  { id: 'kubernetes', name: 'Kubernetes', icon: '☸️', category: 'infrastructure', version: '1.30.4', healthScore: 98, cpu: 12, mem: 18, status: 'ok', color: '#ef4444', isOperator: false, dependsOn: [], compatibleWith: 'K8s ≥1.27' },
  { id: 'cilium', name: 'Cilium', icon: '🔒', category: 'infrastructure', version: '1.16.1', healthScore: 95, cpu: 8, mem: 14, status: 'ok', color: '#ef4444', isOperator: false, dependsOn: ['kubernetes'], compatibleWith: 'K8s ≥1.27' },
  { id: 'rook-ceph', name: 'Rook-Ceph', icon: '💾', category: 'infrastructure', version: '1.14.9', healthScore: 92, cpu: 22, mem: 35, status: 'ok', color: '#ef4444', isOperator: true, dependsOn: ['kubernetes'], compatibleWith: 'K8s ≥1.27', managedBy: 'Rook Operator (CRD)' },
  { id: 'metallb', name: 'MetalLB', icon: '🌐', category: 'infrastructure', version: '0.14.8', healthScore: 99, cpu: 2, mem: 4, status: 'ok', color: '#ef4444', isOperator: false, dependsOn: ['kubernetes'], compatibleWith: 'K8s ≥1.27' },

  // L1 · PLATFORM CORE (파랑 #3b82f6)
  { id: 'argocd', name: 'ArgoCD', icon: '🔄', category: 'platform', version: '2.12.4', healthScore: 97, cpu: 15, mem: 28, status: 'ok', color: '#3b82f6', isOperator: false, dependsOn: ['kubernetes'], compatibleWith: 'K8s ≥1.27' },
  { id: 'kargo', name: 'Kargo', icon: '📦', category: 'platform', version: '0.9.1', healthScore: 94, cpu: 5, mem: 12, status: 'ok', color: '#3b82f6', isOperator: false, dependsOn: ['argocd'], compatibleWith: 'K8s ≥1.28' },
  { id: 'keycloak', name: 'Keycloak', icon: '🔑', category: 'platform', version: '25.0.6', healthScore: 96, cpu: 18, mem: 42, status: 'ok', color: '#3b82f6', isOperator: true, dependsOn: ['kubernetes'], compatibleWith: 'K8s ≥1.27', managedBy: 'Keycloak Operator (CRD)' },
  { id: 'vault', name: 'Vault', icon: '🔐', category: 'platform', version: '1.17.5', healthScore: 99, cpu: 8, mem: 22, status: 'ok', color: '#3b82f6', isOperator: false, dependsOn: ['kubernetes'], compatibleWith: 'K8s ≥1.27' },

  // L2 · OBSERVABILITY (주황 #f97316)
  { id: 'prometheus', name: 'Prometheus', icon: '🔥', category: 'observability', version: '2.54.1', healthScore: 96, cpu: 32, mem: 48, status: 'ok', color: '#f97316', isOperator: true, dependsOn: ['kubernetes'], compatibleWith: 'K8s ≥1.27', managedBy: 'Prometheus Operator (CRD)' },
  { id: 'thanos', name: 'Thanos', icon: '📊', category: 'observability', version: '0.36.1', healthScore: 93, cpu: 25, mem: 38, status: 'ok', color: '#f97316', isOperator: false, dependsOn: ['prometheus', 'minio'], compatibleWith: 'K8s ≥1.27' },
  { id: 'grafana', name: 'Grafana', icon: '📈', category: 'observability', version: '11.2.2', healthScore: 98, cpu: 10, mem: 18, status: 'ok', color: '#f97316', isOperator: false, dependsOn: ['thanos'], compatibleWith: 'K8s ≥1.27' },
  { id: 'fluentbit', name: 'Fluent Bit', icon: '📝', category: 'observability', version: '3.1.7', healthScore: 72, cpu: 15, mem: 85, status: 'warn', color: '#f97316', isOperator: false, dependsOn: ['kubernetes'], compatibleWith: 'K8s ≥1.27' },
  { id: 'opensearch', name: 'OpenSearch', icon: '🔍', category: 'observability', version: '2.16.0', healthScore: 91, cpu: 45, mem: 62, status: 'ok', color: '#f97316', isOperator: true, dependsOn: ['fluentbit'], compatibleWith: 'K8s ≥1.27', managedBy: 'OpenSearch Operator (CRD)' },

  // L2B · DATA PLATFORM (시안 #06b6d4)
  { id: 'airflow', name: 'Airflow', icon: '🌊', category: 'data', version: '2.10.2', healthScore: 94, cpu: 20, mem: 35, status: 'ok', color: '#06b6d4', isOperator: true, dependsOn: ['kubernetes', 'postgresql'], compatibleWith: 'K8s ≥1.27', managedBy: 'Airflow Operator (CRD)' },
  { id: 'spark', name: 'Spark', icon: '✨', category: 'data', version: '3.5.3', healthScore: 78, cpu: 65, mem: 72, status: 'warn', color: '#06b6d4', isOperator: true, dependsOn: ['minio', 'hive-metastore'], compatibleWith: 'K8s ≥1.27', managedBy: 'Spark Operator (CRD)' },
  { id: 'trino', name: 'Trino', icon: '🔎', category: 'data', version: '453', healthScore: 95, cpu: 38, mem: 55, status: 'ok', color: '#06b6d4', isOperator: false, dependsOn: ['iceberg'], compatibleWith: 'K8s ≥1.27' },
  { id: 'iceberg', name: 'Iceberg', icon: '🧊', category: 'data', version: '1.6.1', healthScore: 97, cpu: 5, mem: 8, status: 'ok', color: '#06b6d4', isOperator: false, dependsOn: ['minio', 'hive-metastore'], compatibleWith: 'K8s ≥1.27' },
  { id: 'minio', name: 'MinIO', icon: '🗄️', category: 'data', version: '2024.10.02', healthScore: 96, cpu: 28, mem: 40, status: 'ok', color: '#06b6d4', isOperator: true, dependsOn: ['kubernetes'], compatibleWith: 'K8s ≥1.27', managedBy: 'MinIO Operator (CRD)' },
  { id: 'kafka', name: 'Kafka', icon: '📨', category: 'data', version: '3.8.0', healthScore: 94, cpu: 35, mem: 50, status: 'ok', color: '#06b6d4', isOperator: true, dependsOn: ['kubernetes'], compatibleWith: 'K8s ≥1.27', managedBy: 'Strimzi Operator (CRD)' },
  // Implicit dependencies
  { id: 'hive-metastore', name: 'Hive Metastore', icon: '🐝', category: 'data', version: '3.1.3', healthScore: 93, cpu: 10, mem: 20, status: 'ok', color: '#06b6d4', isOperator: false, dependsOn: ['postgresql'], compatibleWith: 'K8s ≥1.27' },
  { id: 'postgresql', name: 'PostgreSQL', icon: '🐘', category: 'data', version: '16.4', healthScore: 99, cpu: 12, mem: 25, status: 'ok', color: '#06b6d4', isOperator: true, dependsOn: ['kubernetes'], compatibleWith: 'K8s ≥1.27', managedBy: 'CloudNativePG (CRD)' },

  // L3 · AI AGENT (보라 #a78bfa)
  { id: 'kagent', name: 'kagent', icon: '🤖', category: 'agent', version: '0.3.1', healthScore: 88, cpu: 42, mem: 58, status: 'ok', color: '#a78bfa', isOperator: false, dependsOn: ['prometheus', 'opensearch', 'argocd'], compatibleWith: 'K8s ≥1.29' },
  { id: 'ollama', name: 'Ollama', icon: '🧠', category: 'agent', version: '0.3.12', healthScore: 90, cpu: 75, mem: 82, status: 'ok', color: '#a78bfa', isOperator: false, dependsOn: ['kubernetes'], compatibleWith: 'K8s ≥1.27' },
];

export const componentMap = new Map(components.map(c => [c.id, c]));
