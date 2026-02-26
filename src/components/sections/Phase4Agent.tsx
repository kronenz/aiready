import { ArchBlock } from '../ui/ArchBlock';
import { ApiCodeBlock } from '../ui/ApiBlock';
import { Divider } from '../ui/Divider';

export function Phase4Agent() {
  return (
    <div className="phase" id="p4">
      <span className="phase-badge" style={{ background: '#f472b622', color: 'var(--pink)', border: '1px solid #f472b644' }}>
        ④ LOOP 4
      </span>
      <div className="phase-title">AI Agent 분석 & 제안</div>
      <div className="phase-sub">온톨로지를 컨텍스트로 활용하여 지능적 분석·장애대응·최적화 제안</div>

      <ArchBlock borderColor="var(--pink)" label="AGENT FRAMEWORK" labelColor="var(--pink)" title="kagent + 커스텀 MCP 서버 + 온톨로지 MCP" desc="kagent를 프레임워크로 사용하되, 온톨로지 쿼리를 MCP Tool로 노출하여 Agent가 지식 그래프를 탐색할 수 있게 함">
        <div />
      </ArchBlock>

      <Divider text="MCP 서버 — Agent의 도구 상자" />
      <table className="arch-table">
        <thead>
          <tr>
            <th>MCP 서버</th>
            <th>제공하는 Tool</th>
            <th>Agent가 하는 일</th>
            <th>구현</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ color: 'var(--purple)', fontWeight: 700 }}>🧬 Ontology MCP</td>
            <td>query_dependencies()<br />check_compatibility()<br />get_upgrade_path()<br />find_impact_chain()</td>
            <td>"Spark가 의존하는 건?" "이 MinIO 죽으면 뭐가 영향?" "Trino 올릴 수 있어?"</td>
            <td className="mono" style={{ fontSize: 10 }}>Python · FastMCP<br />Neo4j Cypher</td>
          </tr>
          <tr>
            <td style={{ color: 'var(--red)', fontWeight: 700 }}>🔥 Prometheus MCP</td>
            <td>query_metrics()<br />get_alerts()<br />get_targets_health()</td>
            <td>"현재 CPU 사용률은?" "어떤 알럿이 firing?" "어떤 타겟이 다운?"</td>
            <td className="mono" style={{ fontSize: 10 }}>kagent 기본 제공<br />+ Thanos 엔드포인트 추가</td>
          </tr>
          <tr>
            <td style={{ color: 'var(--orange)', fontWeight: 700 }}>📝 OpenSearch MCP</td>
            <td>search_logs()<br />get_error_patterns()<br />tail_logs()</td>
            <td>"최근 1시간 Spark 에러 로그 보여줘" "반복되는 에러 패턴은?"</td>
            <td className="mono" style={{ fontSize: 10 }}>Python · opensearch-py<br />DSL 쿼리 빌더</td>
          </tr>
          <tr>
            <td style={{ color: 'var(--blue)', fontWeight: 700 }}>🌊 Airflow MCP</td>
            <td>list_dags()<br />get_dag_status()<br />trigger_dag()<br />get_task_logs()</td>
            <td>"실패한 DAG는?" "이 DAG 재실행해줘" "왜 실패했어?"</td>
            <td className="mono" style={{ fontSize: 10 }}>Python · Airflow REST API<br />v2 endpoint</td>
          </tr>
          <tr>
            <td style={{ color: 'var(--cyan)', fontWeight: 700 }}>✨ Spark MCP</td>
            <td>list_applications()<br />get_executor_status()<br />get_job_metrics()</td>
            <td>"현재 실행 중인 Spark Job은?" "executor 상태는?" "OOM 발생했어?"</td>
            <td className="mono" style={{ fontSize: 10 }}>Python · Spark History Server API<br />+ K8s Pod API</td>
          </tr>
          <tr>
            <td style={{ color: 'var(--green)', fontWeight: 700 }}>🔄 ArgoCD MCP</td>
            <td>list_apps()<br />get_sync_status()<br />trigger_sync()<br />rollback()</td>
            <td>"어떤 앱이 OutOfSync?" "이 앱 롤백해줘" "최근 배포 이력은?"</td>
            <td className="mono" style={{ fontSize: 10 }}>kagent 확장<br />ArgoCD gRPC</td>
          </tr>
          <tr>
            <td style={{ color: 'var(--gold)', fontWeight: 700 }}>📦 Version MCP</td>
            <td>get_current_versions()<br />check_updates_available()<br />get_changelog()</td>
            <td>"업데이트 가능한 컴포넌트는?" "Spark 3.5.4 변경사항은?"</td>
            <td className="mono" style={{ fontSize: 10 }}>Python · Version Tracker API<br />GitHub Release 캐시</td>
          </tr>
        </tbody>
      </table>

      <Divider text="사전 정의 Agent 프로파일" />
      <div className="g2">
        <ArchBlock borderColor="var(--red)" title="🚨 Incident Response Agent" desc="알럿 발생 시 자동 호출. 근본원인 분석 + 조치 제안">
          <ApiCodeBlock header={<span style={{ color: 'var(--text2)' }}>시스템 프롬프트 (요약)</span>}>
            <span>{`당신은 K8s 빅데이터 플랫폼 장애 대응 전문가입니다.
알럿이 발생하면 다음 절차를 따르세요:
1. Ontology MCP의 find_impact_chain()으로 영향받는 컴포넌트 파악
2. Prometheus MCP로 관련 메트릭 수집
3. OpenSearch MCP로 에러 로그 검색
4. 수집한 정보를 종합하여 근본원인 추론
5. 조치 방안 제안 (자동 조치 가능한 경우 ArgoCD MCP 활용)
`}<strong style={{ color: 'var(--red)' }}>중요: 프로덕션에 변경을 가하는 액션은 반드시 사용자 승인 후 실행</strong></span>
          </ApiCodeBlock>
          <div className="comp-tech" style={{ color: 'var(--red)', marginTop: 8 }}>사용 MCP: Ontology + Prometheus + OpenSearch + ArgoCD + Spark</div>
        </ArchBlock>

        <ArchBlock borderColor="var(--green)" title="📈 Capacity Planning Agent" desc="주기적 또는 요청 시 실행. 리소스 트렌드 분석 + 확장 제안">
          <ApiCodeBlock header={<span style={{ color: 'var(--text2)' }}>동작 예시</span>}>
            {`사용자: "다음 분기에 데이터 볼륨이 2배 증가할 예정인데, 뭘 준비해야 해?"
Agent 행동:
1. Ontology MCP → 현재 스택의 모든 SCALES_WITH 규칙 조회
2. Prometheus MCP → 최근 3개월 리소스 사용 트렌드 수집
3. 계산: 데이터 2배 → Spark executor 20→40개, MinIO 10TB→20TB,
   Prometheus cardinality 2배 → Thanos Store 추가 필요
4. 필요 노드 추가: worker 15대, storage 5대
5. 비용 추정 + ArgoCD values 변경 PR 초안 생성`}
          </ApiCodeBlock>
          <div className="comp-tech" style={{ color: 'var(--green)', marginTop: 8 }}>사용 MCP: Ontology + Prometheus + Version</div>
        </ArchBlock>
      </div>

      <div className="g2" style={{ marginTop: 16 }}>
        <ArchBlock borderColor="var(--gold)" title="🔄 Upgrade Advisor Agent" desc="새 버전 알림 시 또는 사용자 요청 시. 업그레이드 계획 수립">
          <ApiCodeBlock header={<span style={{ color: 'var(--text2)' }}>동작 예시</span>}>
            {`Version Tracker가 "Spark 3.6.0 릴리스" 감지 → Agent 트리거
Agent 행동:
1. Version MCP → Spark 3.6.0 changelog 조회
2. Ontology MCP → get_upgrade_path(spark, 3.5.3 → 3.6.0)
3. 결과: "Iceberg 1.5→1.6 먼저, Hive Metastore 스키마 마이그레이션 필요"
4. Impact 분석: "Trino 카탈로그 재설정 필요, 다운타임 ~15분"
5. Slack 리포트 전송:
   "🔄 Spark 3.6.0 업그레이드 가능합니다.
    전제조건: Iceberg 1.6, HMS 스키마 마이그레이션
    예상 다운타임: 15분
    승인하시면 자동 PR을 생성합니다."`}
          </ApiCodeBlock>
          <div className="comp-tech" style={{ color: 'var(--gold)', marginTop: 8 }}>사용 MCP: Ontology + Version + ArgoCD</div>
        </ArchBlock>

        <ArchBlock borderColor="var(--purple)" title="🏗️ Architecture Advisor Agent" desc="현재 아키텍처에 대한 개선 제안. 정기 리뷰 또는 요청 시">
          <ApiCodeBlock header={<span style={{ color: 'var(--text2)' }}>동작 예시</span>}>
            {`사용자: "우리 아키텍처에서 개선할 점은?"
Agent 행동:
1. Ontology MCP → 현재 전체 스택 조회
2. 보안: "Kafka가 TLS 없이 운영 중 → Strimzi TLS 활성화 권장"
3. 비용: "OpenSearch 3노드 중 hot tier가 과다 → warm tier 분리 권장"
4. 성능: "Trino worker 4개인데 쿼리 큐 대기 평균 30초 → 6개로 확장 권장"
5. 버전: "Cilium 1.14는 EOL 예정 → 1.16으로 업그레이드 권장"
6. 각 제안별 우선순위 + 예상 효과 + 구현 난이도 리포트`}
          </ApiCodeBlock>
          <div className="comp-tech" style={{ color: 'var(--purple)', marginTop: 8 }}>사용 MCP: Ontology + Prometheus + OpenSearch + Version</div>
        </ArchBlock>
      </div>
    </div>
  );
}
