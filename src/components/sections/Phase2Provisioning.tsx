import { ArchBlock } from '../ui/ArchBlock';
import { CompItem } from '../ui/CompItem';
import { FlowPipe } from '../ui/FlowPipe';
import { Divider } from '../ui/Divider';

export function Phase2Provisioning() {
  return (
    <div className="phase" id="p2">
      <span className="phase-badge" style={{ background: '#38bdf822', color: 'var(--blue)', border: '1px solid #38bdf844' }}>
        ② LOOP 2
      </span>
      <div className="phase-title">자동 프로비저닝 엔진</div>
      <div className="phase-sub">승인된 토폴로지 JSON → IaC 코드 생성 → Git PR → ArgoCD 자동 배포</div>

      <FlowPipe nodes={[
        { icon: '✅', label: '토폴로지 승인', tech: 'Design Studio → confirm', borderColor: 'var(--green)', textColor: 'var(--green)' },
        { icon: '⚙️', label: 'Code Generator', tech: 'Jinja2 · Jsonnet', borderColor: 'var(--blue)', textColor: 'var(--blue)' },
        { icon: '📁', label: 'Git PR 생성', tech: 'GitLab/GitHub API', borderColor: 'var(--cyan)', textColor: 'var(--cyan)' },
        { icon: '👁️', label: '리뷰 & 머지', tech: 'Human-in-the-loop', borderColor: 'var(--orange)', textColor: 'var(--orange)' },
        { icon: '🔄', label: 'ArgoCD Sync', tech: 'Sync Wave 순차 배포', borderColor: 'var(--green)', textColor: 'var(--green)' },
        { icon: '✓', label: 'Health Check', tech: 'Pod Ready · E2E test', borderColor: 'var(--green)', textColor: 'var(--green)' },
      ]} />

      <div className="g2">
        <ArchBlock borderColor="var(--blue)" label="SERVICE 3" labelColor="var(--blue)" title="Code Generator" desc="토폴로지 JSON → 배포 가능한 IaC 코드 세트 자동 생성">
          <div className="comp-list">
            <CompItem icon="📦" name="Helm Values Renderer" role="온톨로지의 DEPLOYED_VIA 메타데이터 + Resource Calculator 결과 → 각 컴포넌트별 values.yaml 생성" tech="Jinja2 템플릿 · 컴포넌트당 1개 values 파일" techColor="var(--blue)" />
            <CompItem icon="🔄" name="ArgoCD Manifest Generator" role="App of Apps 루트 Application + 각 컴포넌트 Application 생성. Sync Wave 순서를 온톨로지 DEPENDS_ON 기반으로 자동 계산" tech="Wave 0: CRDs → Wave 1: Operators → Wave 2: Infra → Wave 3: Apps" techColor="var(--cyan)" />
            <CompItem icon="🖥️" name="Ansible Inventory Generator" role="노드 수·역할 정보 → Ansible inventory + group_vars 생성. 초기 클러스터 부트스트랩용" tech="master/worker/gpu/storage 그룹 자동 분류" techColor="var(--green)" />
            <CompItem icon="🔐" name="Secret Reference Generator" role="각 컴포넌트가 필요한 시크릿 → ExternalSecret CRD 자동 생성. Vault 경로 매핑" tech="ExternalSecret · Vault KV path 자동 생성" techColor="var(--red)" />
          </div>
        </ArchBlock>

        <ArchBlock borderColor="var(--green)" label="SERVICE 4" labelColor="var(--green)" title="Deploy Orchestrator" desc="생성된 코드의 Git 커밋 → PR → 배포 상태 추적">
          <div className="comp-list">
            <CompItem icon="📁" name="Git Integration" role="생성된 파일들을 feature branch에 커밋 → PR 생성 → diff 요약을 UI에 표시" tech="GitLab API / GitHub API · PR description 자동 생성" techColor="var(--cyan)" />
            <CompItem icon="📡" name="Deploy Status Tracker" role="ArgoCD API를 폴링하여 각 Application의 sync 상태를 실시간 UI에 반영" tech="ArgoCD gRPC API · SSE push to frontend" techColor="var(--green)" />
            <CompItem icon="🧪" name="Post-Deploy Verifier" role="배포 완료 후 각 컴포넌트의 healthcheck 실행. 온톨로지에 정의된 monitoring.metrics_port 기반" tech="K8s Job · 컴포넌트별 스모크테스트 스크립트" techColor="var(--orange)" />
          </div>
        </ArchBlock>
      </div>

      <Divider text="생성되는 Git Repo 구조" />
      <div className="api-block">
        <div className="api-body" style={{ fontSize: 11, color: 'var(--text2)' }}>
          <span>{`kubeforge-deploy/
├── clusters/
│   └── prod-cluster-01/
│       ├── `}</span><span style={{ color: 'var(--purple)' }}>argocd-root.yaml</span>{`              # App of Apps 루트
│       ├── `}<span style={{ color: 'var(--blue)' }}>values/</span>{`
│       │   ├── prometheus-values.yaml       # kube-prometheus-stack
│       │   ├── thanos-values.yaml
│       │   ├── opensearch-values.yaml
│       │   ├── spark-operator-values.yaml
│       │   ├── airflow-values.yaml
│       │   ├── trino-values.yaml
│       │   ├── strimzi-values.yaml
│       │   └── ...
│       ├── `}<span style={{ color: 'var(--green)' }}>applications/</span>{`
│       │   ├── wave-0-crds.yaml             # CRD 설치 (sync-wave: 0)
│       │   ├── wave-1-operators.yaml         # Operators (sync-wave: 1)
│       │   ├── wave-2-infra.yaml            # Storage, DB (sync-wave: 2)
│       │   ├── wave-3-platform.yaml         # Monitoring, Logging (sync-wave: 3)
│       │   └── wave-4-data.yaml             # Spark, Trino, Airflow (sync-wave: 4)
│       ├── `}<span style={{ color: 'var(--red)' }}>secrets/</span>{`
│       │   └── external-secrets.yaml        # Vault 참조
│       └── `}<span style={{ color: 'var(--orange)' }}>ansible/</span>{`
│           ├── inventory.ini
│           └── group_vars/
├── `}<span style={{ color: 'var(--gold)' }}>templates/</span>{`                           # Jinja2 템플릿 원본
└── `}<span style={{ color: 'var(--purple)' }}>ontology/</span>{`                            # 온톨로지 YAML 소스`}
        </div>
      </div>
    </div>
  );
}
