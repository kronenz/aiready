import type { AgentInfo, McpServer, ChatMessage } from '../types';

export const agents: AgentInfo[] = [
  { id: 'incident', name: 'Incident Response', icon: '🚨', status: 'active', description: '장애 대응 · 근본원인 분석' },
  { id: 'capacity', name: 'Capacity Planning', icon: '📈', status: 'idle', description: '용량 계획 · 리소스 예측' },
  { id: 'upgrade', name: 'Upgrade Advisor', icon: '🔄', status: 'idle', description: '업그레이드 경로 계산' },
  { id: 'architecture', name: 'Architecture Advisor', icon: '🏗️', status: 'idle', description: '아키텍처 개선 제안' },
];

export const mcpServers: McpServer[] = [
  { id: 'mcp-ontology', name: 'Ontology', icon: '🧬', connected: true },
  { id: 'mcp-prometheus', name: 'Prometheus', icon: '🔥', connected: true },
  { id: 'mcp-opensearch', name: 'OpenSearch', icon: '📝', connected: true },
  { id: 'mcp-airflow', name: 'Airflow', icon: '🌊', connected: true },
  { id: 'mcp-spark', name: 'Spark', icon: '✨', connected: true },
  { id: 'mcp-argocd', name: 'ArgoCD', icon: '🔄', connected: true },
  { id: 'mcp-version', name: 'Version', icon: '📦', connected: true },
];

export const agentChatMessages: ChatMessage[] = [
  { role: 'user', content: '현재 Fluent Bit 알럿 원인 분석해줘' },
  { role: 'ai', content: `📡 분석 시작...

🔍 Ontology MCP → find_impact_chain("fluentbit")
🔥 Prometheus MCP → query("container_memory_working_set_bytes{pod=~'fluent.*'}")
📝 OpenSearch MCP → search("level:ERROR AND kubernetes.labels.app:fluent-bit", last_1h)

━━━━━━━━━━━━━━━━━━━━━━━

📋 근본원인 분석 결과

1. 직접 원인
   Spark Job #4521의 executor 3개가 동시 OOM → 대량 에러 로그 폭증
   → Fluent Bit 입력 버퍼 512Mi 초과 (현재 487Mi/512Mi)

2. 영향 범위 (온톨로지 기반)
   Fluent Bit ─FEEDS→ OpenSearch (인덱싱 lag 45초)
   OpenSearch ─SERVES→ Grafana Log Dashboard (실시간성 저하)

3. 권장 조치
   • 즉시: Fluent Bit memory_limit 512Mi → 768Mi
   • 근본: Spark executor memory 4Gi → 6Gi
   • 예방: Fluent Bit backpressure 알럿 임계값 70%로 하향

자동 PR을 생성할까요?` },
  { role: 'user', content: 'Spark executor 메모리 조정 PR 만들어줘' },
  { role: 'ai', content: `✅ PR 생성 완료!

📁 PR #347: fix/spark-executor-oom-4521

변경 파일:
  clusters/prod-01/values/spark-operator-values.yaml
    executor.memory: 4Gi → 6Gi
    executor.memoryOverhead: 1Gi → 1.5Gi

🔄 ArgoCD: 머지 후 자동 Sync (wave-4-data)
🧪 Pre-flight: vcluster 테스트 큐에 추가됨` },
];
