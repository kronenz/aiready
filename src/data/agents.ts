export interface AgentProfile {
  id: string;
  name: string;
  icon: string;
  desc: string;
  color: string;
  mcpTools: string[];
}

export const agentProfiles: AgentProfile[] = [
  { id: 'incident', name: 'Incident Response', icon: '🚨', desc: '알럿 기반 자동 장애 분석 · 근본원인 추론 · 조치 제안', color: '#f87171', mcpTools: ['Ontology', 'Prometheus', 'OpenSearch', 'ArgoCD', 'Spark'] },
  { id: 'capacity', name: 'Capacity Planning', icon: '📈', desc: '리소스 트렌드 분석 · 확장 계획 수립 · 비용 추정', color: '#4ade80', mcpTools: ['Ontology', 'Prometheus', 'Version'] },
  { id: 'upgrade', name: 'Upgrade Advisor', icon: '🔄', desc: '업그레이드 경로 계산 · 호환성 검증 · 자동 PR 생성', color: '#fbbf24', mcpTools: ['Ontology', 'Version', 'ArgoCD'] },
  { id: 'architect', name: 'Architecture Advisor', icon: '🏗️', desc: '아키텍처 리뷰 · 보안/비용/성능 개선 제안', color: '#a78bfa', mcpTools: ['Ontology', 'Prometheus', 'OpenSearch', 'Version'] },
];

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'tool';
  content: string;
  toolName?: string;
  toolResult?: string;
  timestamp: string;
}

export const sampleAgentChat: ChatMessage[] = [
  { id: '1', role: 'user', content: 'Hive Metastore replica가 1개로 줄어들었다는 알럿이 떴어. 원인 파악해줘.', timestamp: '14:23:01' },
  { id: '2', role: 'tool', content: '', toolName: 'Ontology MCP → find_impact_chain("hive-metastore")', toolResult: '영향 컴포넌트: Spark (hard dep), Iceberg (hard dep), Trino (hard dep)', timestamp: '14:23:02' },
  { id: '3', role: 'tool', content: '', toolName: 'Prometheus MCP → query_metrics("hive_metastore_pod")', toolResult: 'Pod hive-metastore-1: OOMKilled 3분 전, memory usage 1.8Gi/1Gi limit', timestamp: '14:23:03' },
  { id: '4', role: 'tool', content: '', toolName: 'OpenSearch MCP → search_logs("hive-metastore", "error", "5m")', toolResult: 'java.lang.OutOfMemoryError: Java heap space\n  at org.apache.hadoop.hive.metastore.ObjectStore.getPartitions()', timestamp: '14:23:04' },
  { id: '5', role: 'assistant', content: `## 분석 결과

**근본원인:** Hive Metastore Pod가 **OOM (Out of Memory)**으로 종료됨
- 메모리 limit: 1Gi → 실 사용: 1.8Gi 초과
- getPartitions() 호출 중 대량 파티션 로드로 힙 메모리 고갈

**영향 범위:**
- Spark: 테이블 메타데이터 조회 불가 → 실행 중인 Job 실패 가능
- Trino: 카탈로그 연결 실패 → 쿼리 오류
- Iceberg: 커밋 불가

**조치 제안:**
1. ⚡ **즉시**: Hive Metastore memory limit 1Gi → 2Gi 상향 (values.yaml 수정)
2. 📋 **PR 생성**: \`hive-metastore-values.yaml\` 수정 후 ArgoCD sync
3. 🔍 **추가 조사**: 대량 파티션 테이블 식별 → partition pruning 최적화

ArgoCD를 통해 memory limit 변경 PR을 생성할까요?`, timestamp: '14:23:06' },
];

export const sampleDesignChat: ChatMessage[] = [
  { id: 'd1', role: 'user', content: '50노드 빅데이터 플랫폼을 구성해줘. Spark 배치 처리, Iceberg 테이블 포맷, Trino SQL 쿼리가 필요해. 모니터링도 포함해줘.', timestamp: '10:15:00' },
  { id: 'd2', role: 'assistant', content: `요구사항을 분석하고 온톨로지에서 컴포넌트를 해결하겠습니다.

**분석 결과:**
- batch_processing → **Apache Spark 3.5.3**
- table_storage → **Apache Iceberg 1.6.1**
- sql_query → **Trino 460**

**자동 해결된 의존성:**
- Iceberg → Hive Metastore 3.1.3 + PostgreSQL 16
- Spark/Iceberg → MinIO (S3 스토리지)
- 50노드 규모 → Prometheus + **Thanos** (멀티클러스터)
- 로깅 → OpenSearch + FluentBit

총 **15개 컴포넌트**가 5개 레이어에 배치되었습니다.
우측 토폴로지 캔버스에서 확인하세요.`, timestamp: '10:15:03' },
  { id: 'd3', role: 'user', content: 'Kafka도 추가해줘. 실시간 이벤트 스트리밍이 필요해.', timestamp: '10:16:20' },
  { id: 'd4', role: 'assistant', content: `**Kafka (Strimzi) 3.8.0** 추가 완료.

변경사항:
- L1 Storage 레이어에 Kafka 클러스터 (3 broker) 배치
- Spark Structured Streaming ↔ Kafka 연결 엣지 추가
- ZooKeeper 대신 KRaft 모드 설정 (3.5+ 권장)

리소스 추가: CPU 6core, Memory 12Gi`, timestamp: '10:16:22' },
];
