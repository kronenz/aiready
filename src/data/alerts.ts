import type { Alert } from '../types';

export const alerts: Alert[] = [
  {
    id: 'a1',
    severity: 'critical',
    time: '14:32:15',
    status: 'firing',
    message: 'Fluent Bit 메모리 사용률 85% 초과 — 입력 버퍼 임계값 도달',
    component: 'fluentbit',
  },
  {
    id: 'a2',
    severity: 'warning',
    time: '14:28:03',
    status: 'firing',
    message: 'Spark executor 3개 OOM 발생 — Job #4521 영향',
    component: 'spark',
  },
  {
    id: 'a3',
    severity: 'warning',
    time: '14:15:42',
    status: 'firing',
    message: 'OpenSearch 인덱싱 lag 45초 — Fluent Bit 버퍼 영향',
    component: 'opensearch',
  },
  {
    id: 'a4',
    severity: 'info',
    time: '13:50:00',
    status: 'resolved',
    message: 'Thanos Compactor 일시 중단 — 스토리지 정리 완료',
    component: 'thanos',
  },
  {
    id: 'a5',
    severity: 'info',
    time: '13:22:18',
    status: 'resolved',
    message: 'ArgoCD Sync 완료 — wave-3-platform 정상 배포',
    component: 'argocd',
  },
];
