import type { DeployWave, DeployLogEntry, ArgoApp } from '../types';

export const deployWaves: DeployWave[] = [
  { id: 0, name: 'CRDs', status: 'done' },
  { id: 1, name: 'Operators', status: 'done' },
  { id: 2, name: 'Infra', status: 'done' },
  { id: 3, name: 'Platform', status: 'done' },
  { id: 4, name: 'Data', status: 'active' },
];

export const deployLogs: DeployLogEntry[] = [
  { time: '14:32:01', message: 'ArgoCD Sync 시작 — wave-0-crds', status: 'done' },
  { time: '14:32:15', message: 'CRD 설치 완료 (6/6)', status: 'done' },
  { time: '14:32:18', message: 'wave-1-operators Sync 시작', status: 'done' },
  { time: '14:33:02', message: 'Spark Operator Ready, Strimzi Operator Ready', status: 'done' },
  { time: '14:33:05', message: 'wave-2-infra Sync 시작', status: 'done' },
  { time: '14:34:30', message: 'MinIO StatefulSet Ready (3/3), PostgreSQL Ready', status: 'done' },
  { time: '14:34:33', message: 'wave-3-platform Sync 시작', status: 'done' },
  { time: '14:36:10', message: 'Prometheus + Thanos + Grafana Ready', status: 'done' },
  { time: '14:36:12', message: 'wave-4-data Sync 시작', status: 'active' },
  { time: '14:36:45', message: 'Kafka 클러스터 생성 중... (2/3 brokers ready)', status: 'active' },
  { time: '—', message: 'Spark, Trino, Airflow 대기 중...', status: 'pending' },
];

export const argoApps: ArgoApp[] = [
  { name: 'Kubernetes', icon: '☸️', status: 'Synced' },
  { name: 'Cilium', icon: '🔒', status: 'Synced' },
  { name: 'Rook-Ceph', icon: '💾', status: 'Synced' },
  { name: 'MetalLB', icon: '🌐', status: 'Synced' },
  { name: 'ArgoCD', icon: '🔄', status: 'Synced' },
  { name: 'Keycloak', icon: '🔑', status: 'Synced' },
  { name: 'Vault', icon: '🔐', status: 'Synced' },
  { name: 'Prometheus', icon: '🔥', status: 'Synced' },
  { name: 'Thanos', icon: '📊', status: 'Synced' },
  { name: 'Grafana', icon: '📈', status: 'Synced' },
  { name: 'Fluent Bit', icon: '📝', status: 'Synced' },
  { name: 'OpenSearch', icon: '🔍', status: 'Synced' },
  { name: 'PostgreSQL', icon: '🐘', status: 'Synced' },
  { name: 'MinIO', icon: '🗄️', status: 'Synced' },
  { name: 'Kafka', icon: '📨', status: 'Syncing' },
  { name: 'Spark', icon: '✨', status: 'Syncing' },
];
