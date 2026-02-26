export interface DeployStage {
  id: string;
  label: string;
  status: 'done' | 'active' | 'pending' | 'error';
  detail: string;
  time?: string;
}

export const deployPipeline: DeployStage[] = [
  { id: 'approve', label: '토폴로지 승인', status: 'done', detail: 'admin@kubeforge 승인', time: '14:20:01' },
  { id: 'codegen', label: 'IaC 코드 생성', status: 'done', detail: '15개 values.yaml + 5 wave manifests', time: '14:20:08' },
  { id: 'gitpr', label: 'Git PR 생성', status: 'done', detail: 'PR #142 — feat: prod-cluster-01 initial deploy', time: '14:20:12' },
  { id: 'review', label: '리뷰 & 머지', status: 'done', detail: 'SRE팀 승인 후 머지', time: '14:35:00' },
  { id: 'sync', label: 'ArgoCD Sync', status: 'active', detail: 'Wave 3/5 진행 중 — Monitoring 배포 중', time: '14:35:15' },
  { id: 'health', label: 'Health Check', status: 'pending', detail: '대기 중' },
];

export interface ArgoApp {
  name: string;
  wave: number;
  status: 'Synced' | 'Progressing' | 'OutOfSync' | 'Healthy' | 'Degraded';
  health: 'Healthy' | 'Progressing' | 'Degraded' | 'Missing';
  namespace: string;
}

export const argoApps: ArgoApp[] = [
  { name: 'cert-manager', wave: 0, status: 'Synced', health: 'Healthy', namespace: 'cert-manager' },
  { name: 'external-secrets', wave: 0, status: 'Synced', health: 'Healthy', namespace: 'external-secrets' },
  { name: 'spark-operator', wave: 1, status: 'Synced', health: 'Healthy', namespace: 'spark-operator' },
  { name: 'strimzi-operator', wave: 1, status: 'Synced', health: 'Healthy', namespace: 'strimzi' },
  { name: 'minio', wave: 2, status: 'Synced', health: 'Healthy', namespace: 'minio' },
  { name: 'postgresql', wave: 2, status: 'Synced', health: 'Healthy', namespace: 'databases' },
  { name: 'hive-metastore', wave: 2, status: 'Synced', health: 'Healthy', namespace: 'hive' },
  { name: 'kube-prometheus-stack', wave: 3, status: 'Progressing', health: 'Progressing', namespace: 'monitoring' },
  { name: 'thanos', wave: 3, status: 'OutOfSync', health: 'Missing', namespace: 'monitoring' },
  { name: 'opensearch', wave: 3, status: 'OutOfSync', health: 'Missing', namespace: 'logging' },
  { name: 'grafana', wave: 3, status: 'OutOfSync', health: 'Missing', namespace: 'monitoring' },
  { name: 'spark', wave: 4, status: 'OutOfSync', health: 'Missing', namespace: 'spark' },
  { name: 'trino', wave: 4, status: 'OutOfSync', health: 'Missing', namespace: 'trino' },
  { name: 'airflow', wave: 4, status: 'OutOfSync', health: 'Missing', namespace: 'airflow' },
  { name: 'kafka', wave: 4, status: 'OutOfSync', health: 'Missing', namespace: 'kafka' },
];
