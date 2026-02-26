export interface VersionInfo {
  component: string;
  icon: string;
  current: string;
  latest: string;
  status: 'up-to-date' | 'update-available' | 'critical-update' | 'eol-warning';
  category: string;
  changelog?: string;
}

export const versionData: VersionInfo[] = [
  { component: 'Apache Spark', icon: '✨', current: '3.5.3', latest: '3.5.3', status: 'up-to-date', category: 'Data Processing' },
  { component: 'Trino', icon: '🔎', current: '460', latest: '463', status: 'update-available', category: 'Data Processing', changelog: '보안 패치 + 성능 개선' },
  { component: 'Apache Iceberg', icon: '🧊', current: '1.6.1', latest: '1.7.0', status: 'update-available', category: 'Table Format', changelog: 'Row-level delete 성능 30% 개선' },
  { component: 'Hive Metastore', icon: '🐝', current: '3.1.3', latest: '4.0.0', status: 'critical-update', category: 'Metadata', changelog: 'Major 업그레이드 — 스키마 마이그레이션 필요' },
  { component: 'Apache Kafka', icon: '📨', current: '3.8.0', latest: '3.8.0', status: 'up-to-date', category: 'Messaging' },
  { component: 'Prometheus', icon: '🔥', current: '2.54.1', latest: '2.55.0', status: 'update-available', category: 'Monitoring', changelog: 'OTLP native 수신 안정화' },
  { component: 'Thanos', icon: '📊', current: '0.36.1', latest: '0.36.1', status: 'up-to-date', category: 'Monitoring' },
  { component: 'OpenSearch', icon: '🔍', current: '2.17.0', latest: '2.17.0', status: 'up-to-date', category: 'Logging' },
  { component: 'MinIO', icon: '💾', current: '2024.11.7', latest: '2025.01.15', status: 'update-available', category: 'Storage', changelog: 'S3 호환성 개선 + 버그 수정' },
  { component: 'Cilium', icon: '🔒', current: '1.16.1', latest: '1.16.4', status: 'update-available', category: 'Networking', changelog: 'CVE-2024-XXXX 패치' },
  { component: 'ArgoCD', icon: '🔄', current: '2.12.3', latest: '2.13.0', status: 'update-available', category: 'GitOps', changelog: 'ApplicationSet 개선 + UI 리뉴얼' },
  { component: 'Airflow', icon: '🌊', current: '2.10.2', latest: '2.10.4', status: 'update-available', category: 'Orchestration', changelog: 'Task Flow 안정성 수정' },
];

export interface DriftItem {
  component: string;
  field: string;
  expected: string;
  actual: string;
  severity: 'critical' | 'warning' | 'info';
  detected: string;
}

export const driftData: DriftItem[] = [
  { component: 'Hive Metastore', field: 'replicas', expected: '2', actual: '1', severity: 'critical', detected: '2분 전' },
  { component: 'Prometheus', field: 'memory_limit', expected: '4Gi', actual: '2Gi', severity: 'warning', detected: '15분 전' },
  { component: 'Grafana', field: 'image_tag', expected: '11.3.0', actual: '11.2.2', severity: 'warning', detected: '1시간 전' },
];

export interface UpgradeStep {
  order: number;
  action: string;
  component: string;
  detail: string;
  status: 'pending' | 'in-progress' | 'done' | 'blocked';
}

export const upgradePathExample: UpgradeStep[] = [
  { order: 1, action: 'upgrade', component: 'Iceberg', detail: '1.6.1 → 1.7.0', status: 'done' },
  { order: 2, action: 'migrate', component: 'Hive Metastore', detail: 'schema-upgrade.sql', status: 'done' },
  { order: 3, action: 'rebuild', component: 'Spark Image', detail: '3.5.3-iceberg1.7', status: 'in-progress' },
  { order: 4, action: 'upgrade', component: 'Spark', detail: '3.5.3 → 3.6.0', status: 'pending' },
  { order: 5, action: 'verify', component: 'Trino', detail: 'catalog reconnect', status: 'pending' },
];
