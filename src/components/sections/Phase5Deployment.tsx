import { ArchBlock } from '../ui/ArchBlock';
import { ApiCodeBlock } from '../ui/ApiBlock';
import { Divider } from '../ui/Divider';

export function Phase5Deployment() {
  return (
    <div className="phase" id="p5">
      <span className="phase-badge" style={{ background: '#e6edf311', color: 'var(--white)', border: '1px solid var(--border)' }}>
        🖥️ DEPLOYMENT
      </span>
      <div className="phase-title">시스템 배치도 — KubeForge 자체의 배포 구성</div>
      <div className="phase-sub">KubeForge 플랫폼 자체도 K8s 위에서 운영. Management Cluster에 배포</div>

      <ArchBlock borderColor="#e6edf344" title="Management Cluster 내 KubeForge 배포 구성">
        <table className="arch-table">
          <thead>
            <tr>
              <th>Namespace</th>
              <th>서비스</th>
              <th>Replica</th>
              <th>리소스</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ color: 'var(--purple)', fontWeight: 700 }}>kubeforge-core</td>
              <td>Ontology Query API<br />Neo4j<br />Ontology Sync Controller<br />Redis (캐시)</td>
              <td>2<br />1 (StatefulSet)<br />1<br />1</td>
              <td>500m/1Gi<br />2c/4Gi + 50Gi PVC<br />200m/256Mi<br />500m/1Gi</td>
            </tr>
            <tr>
              <td style={{ color: 'var(--blue)', fontWeight: 700 }}>kubeforge-design</td>
              <td>Design Orchestrator<br />Topology Engine<br />Design Studio UI (nginx)</td>
              <td>2<br />2<br />2</td>
              <td>1c/2Gi (LLM 호출 대기)<br />500m/1Gi<br />100m/128Mi</td>
            </tr>
            <tr>
              <td style={{ color: 'var(--green)', fontWeight: 700 }}>kubeforge-deploy</td>
              <td>Code Generator<br />Deploy Orchestrator</td>
              <td>2<br />1</td>
              <td>500m/1Gi<br />500m/512Mi</td>
            </tr>
            <tr>
              <td style={{ color: 'var(--orange)', fontWeight: 700 }}>kubeforge-ops</td>
              <td>Version Tracker (CronJob)<br />Upgrade Orchestrator<br />Drift Detector (CronJob)</td>
              <td>—<br />1<br />—</td>
              <td>500m/512Mi per job<br />500m/512Mi<br />200m/256Mi per job</td>
            </tr>
            <tr>
              <td style={{ color: 'var(--pink)', fontWeight: 700 }}>kubeforge-agent</td>
              <td>kagent Controller<br />MCP Servers (7종)<br />Ollama (GPU 노드)</td>
              <td>1<br />각 1<br />1</td>
              <td>500m/512Mi<br />각 200m/256Mi<br />GPU 1장 + 8Gi</td>
            </tr>
            <tr>
              <td style={{ color: 'var(--gold)', fontWeight: 700 }}>kubeforge-shared</td>
              <td>Keycloak (SSO)<br />PostgreSQL (Keycloak/HMS 등)<br />Vault (시크릿)</td>
              <td>1<br />1 (StatefulSet)<br />1</td>
              <td>1c/1Gi<br />1c/2Gi + 20Gi PVC<br />500m/512Mi</td>
            </tr>
          </tbody>
        </table>
        <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text2)' }}>
          <strong>총 리소스 추정:</strong> KubeForge 자체 운영에 CPU ~15core, Memory ~25Gi, Storage ~100Gi + GPU 1장(Agent용 LLM)<br />
          Management Cluster의 노드 3~5대면 충분. 워크로드 클러스터와 분리 운영 권장.
        </div>
      </ArchBlock>

      <Divider text="전체 시스템 간 데이터 흐름 요약" />
      <ArchBlock borderColor="var(--purple)" title="🔄 4개 루프의 데이터 흐름">
        <ApiCodeBlock
          header={<></>}
          bodyStyle={{ fontSize: 11, lineHeight: 2.2 }}
        >
          <span style={{ color: 'var(--purple)', fontWeight: 700 }}>LOOP 1 (설계)</span>{'\n'}
          {'User → '}<span style={{ color: 'var(--pink)' }}>Chat UI</span>{' → '}<span style={{ color: 'var(--purple)' }}>Design Orchestrator</span>{' → '}<span style={{ color: 'var(--blue)' }}>LLM (Claude)</span>{'\n'}
          {'       → '}<span style={{ color: 'var(--purple)' }}>Ontology API</span>{' (/resolve) → '}<span style={{ color: 'var(--cyan)' }}>Topology Engine</span>{'\n'}
          {'       → '}<span style={{ color: 'var(--green)' }}>ReactFlow JSON</span>{' → '}<span style={{ color: 'var(--pink)' }}>Design Studio UI</span>{'\n\n'}
          <span style={{ color: 'var(--blue)', fontWeight: 700 }}>LOOP 2 (프로비저닝)</span>{'\n'}
          {'UI (Deploy 버튼) → '}<span style={{ color: 'var(--blue)' }}>Code Generator</span>{' → '}<span style={{ color: 'var(--cyan)' }}>Git PR</span>{'\n'}
          {'       → Human Review → Merge → '}<span style={{ color: 'var(--green)' }}>ArgoCD</span>{' → Workload Cluster\n'}
          {'       → '}<span style={{ color: 'var(--green)' }}>Post-Deploy Verifier</span>{' → UI (배포 상태)\n\n'}
          <span style={{ color: 'var(--orange)', fontWeight: 700 }}>LOOP 3 (운영)</span>{'\n'}
          <span style={{ color: 'var(--orange)' }}>GitHub Releases</span>{' → '}<span style={{ color: 'var(--orange)' }}>Version Tracker</span>{' → '}<span style={{ color: 'var(--purple)' }}>Ontology Update</span>{'\n'}
          {'       → '}<span style={{ color: 'var(--red)' }}>Impact Analyzer</span>{' → '}<span style={{ color: 'var(--cyan)' }}>vcluster Test</span>{'\n'}
          {'       → '}<span style={{ color: 'var(--green)' }}>Kargo Promotion</span>{' → Workload Cluster\n'}
          <span style={{ color: 'var(--gold)' }}>Drift Detector</span>{' → K8s API scan → Git diff → Alert/Reconcile\n\n'}
          <span style={{ color: 'var(--pink)', fontWeight: 700 }}>LOOP 4 (AI Agent)</span>{'\n'}
          <span style={{ color: 'var(--red)' }}>AlertManager</span>{' → '}<span style={{ color: 'var(--pink)' }}>kagent</span>{' → MCP Tools 호출:\n'}
          {'  → '}<span style={{ color: 'var(--purple)' }}>Ontology MCP</span>{' (의존성·영향도 탐색)\n'}
          {'  → '}<span style={{ color: 'var(--red)' }}>Prometheus MCP</span>{' (메트릭 수집)\n'}
          {'  → '}<span style={{ color: 'var(--orange)' }}>OpenSearch MCP</span>{' (로그 검색)\n'}
          {'  → '}<span style={{ color: 'var(--blue)' }}>Airflow/Spark MCP</span>{' (워크로드 상태)\n'}
          {'  → 종합 분석 → '}<span style={{ color: 'var(--green)' }}>Slack 리포트</span>{' 또는 '}<span style={{ color: 'var(--green)' }}>ArgoCD 자동 조치</span>{'\n\n'}
          <span style={{ color: 'var(--text2)', fontWeight: 700 }}>공통 백본:</span>{' 모든 루프가 '}<span style={{ color: 'var(--purple)', fontWeight: 700 }}>Ontology Store (Neo4j)</span>{' 를 공유'}
        </ApiCodeBlock>
      </ArchBlock>

      <div className="callout" style={{ borderColor: 'var(--purple)' }}>
        <div style={{ color: 'var(--purple)' }}>🎯 이 솔루션의 핵심 — 한 문장</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--white)', marginTop: 8, lineHeight: 1.5 }}>
          온톨로지가 4개 루프 모두의 공통 기반(Shared Brain)이 되어,<br />
          설계할 때도, 배포할 때도, 운영할 때도, AI가 분석할 때도<br />
          동일한 지식 그래프 위에서 일관된 의사결정을 내린다.
        </div>
      </div>
    </div>
  );
}
