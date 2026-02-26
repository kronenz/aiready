import { ArchBlock } from '../ui/ArchBlock';
import { CompItem } from '../ui/CompItem';
import { ApiEndpoint } from '../ui/ApiBlock';
import { Divider } from '../ui/Divider';

export function Phase0Ontology() {
  return (
    <div className="phase" id="p0">
      <span className="phase-badge" style={{ background: '#a78bfa22', color: 'var(--purple)', border: '1px solid #a78bfa44' }}>
        🧬 FOUNDATION
      </span>
      <div className="phase-title">온톨로지 엔진 — 전체 시스템의 두뇌</div>
      <div className="phase-sub">모든 루프가 이 엔진을 공유. 컴포넌트·관계·제약조건·버전 호환성이 여기에 살아있음</div>

      <div className="g2">
        {/* Ontology Store */}
        <ArchBlock borderColor="var(--purple)" label="CORE SERVICE" labelColor="var(--purple)" title="Ontology Store" desc="컴포넌트와 관계를 저장하고 쿼리하는 지식 그래프 저장소">
          <div className="comp-list">
            <CompItem icon="🗄️" name="Neo4j Community Edition" role="그래프 DB. 노드=컴포넌트, 엣지=관계. Cypher 쿼리로 의존성 체인 탐색, 경로 계산" tech="helm install neo4j neo4j/neo4j" techColor="var(--purple)" />
            <CompItem icon="📝" name="Ontology YAML Source (Git)" role="컴포넌트 정의 YAML이 Git에 저장 → CI가 Neo4j에 동기화. 온톨로지 자체도 GitOps" tech="components/*.yaml, relations/*.yaml, constraints/*.yaml" techColor="var(--cyan)" />
            <CompItem icon="🔄" name="Ontology Sync Controller" role="Git YAML 변경 감지 → Neo4j에 Cypher MERGE 실행. K8s CronJob 또는 ArgoCD hook" tech="Python · neo4j-driver · GitPython" techColor="var(--green)" />
          </div>
        </ArchBlock>

        {/* Ontology API */}
        <ArchBlock borderColor="var(--blue)" label="API LAYER" labelColor="var(--blue)" title="Ontology Query API" desc="모든 서비스가 온톨로지를 쿼리하는 단일 진입점">
          <ApiEndpoint method="GET" methodColor="var(--green)" path="/api/v1/components/{type}" desc="특정 타입의 컴포넌트 목록 + 메타데이터" />
          <ApiEndpoint method="GET" methodColor="var(--green)" path="/api/v1/dependencies/{component}" desc="전이적(transitive) 의존성 체인 반환" />
          <ApiEndpoint
            method="POST"
            methodColor="var(--blue)"
            path="/api/v1/compatibility/check"
            desc="버전 조합의 호환성 검증"
            body={`{
  "components": [
    {"name":"spark","version":"3.5.1"},
    {"name":"iceberg","version":"1.5.0"},
    {"name":"trino","version":"453"}
  ]
}
→ {"compatible": true, "warnings": ["hive-metastore 3.1.3 권장"]}`}
          />
          <ApiEndpoint
            method="POST"
            methodColor="var(--blue)"
            path="/api/v1/resolve"
            desc="요구 capability → 필요 컴포넌트 전체 해결"
            body={`{
  "capabilities": ["batch_processing","table_storage","sql_query"],
  "constraints": {"k8s_version":"1.30","node_count":50}
}
→ {
  "resolved": [
    {"component":"spark","version":"3.5.3","reason":"batch_processing"},
    {"component":"iceberg","version":"1.6.1","reason":"table_storage"},
    {"component":"hive-metastore","version":"3.1.3","reason":"iceberg dependency"},
    {"component":"postgresql","version":"16","reason":"hive-metastore dependency"},
    {"component":"minio","version":"2024.11","reason":"iceberg storage backend"},
    {"component":"trino","version":"460","reason":"sql_query"},
    {"component":"prometheus","version":"2.54","reason":"auto: monitoring for 50+ nodes"},
    {"component":"thanos","version":"0.36","reason":"auto: multi-cluster metrics"}
  ]
}`}
          />
          <ApiEndpoint
            method="POST"
            methodColor="var(--orange)"
            path="/api/v1/upgrade-path"
            desc="업그레이드 순서 + 전제조건 계산"
            body={`{
  "from": {"spark":"3.4.0"}, "to": {"spark":"3.5.3"}
}
→ {
  "steps": [
    {"order":1,"action":"upgrade","component":"iceberg","from":"1.4.3","to":"1.5.2"},
    {"order":2,"action":"migrate","component":"hive-metastore","script":"schema-upgrade.sql"},
    {"order":3,"action":"rebuild","component":"spark-image","tag":"3.5.3-iceberg1.5.2"},
    {"order":4,"action":"upgrade","component":"spark","from":"3.4.0","to":"3.5.3"},
    {"order":5,"action":"verify","component":"trino","check":"catalog reconnect"}
  ],
  "estimated_downtime":"15min",
  "rollback_possible": true
}`}
          />
          <CompItem
            icon="⚡"
            name="구현 스택"
            role="Python FastAPI + neo4j-driver + Pydantic models + Redis (쿼리 캐시)"
            tech="K8s Deployment · 2 replica · /healthz readiness probe"
            techColor="var(--orange)"
            className="mt-3"
          />
        </ArchBlock>
      </div>

      <Divider text="온톨로지 YAML 구조 예시" />
      <div className="api-block">
        <div className="api-header">
          <span style={{ color: 'var(--purple)' }}>📁 ontology/components/data-platform/spark.yaml</span>
        </div>
        <div className="api-body" style={{ fontSize: 11 }}>{`component:
  name: spark
  category: DataPlatformComponent
  sub_type: BatchProcessor
  display: { icon: "✨", color: "#E25A1C", label: "Apache Spark" }
  versions:
    - version: "3.5.3"
      helm_chart: { repo: "spark-operator", chart: "spark-operator", version: "1.4.6" }
      container_image: "custom-spark:3.5.3-iceberg1.5"
      requires_k8s: ">=1.27"
      resource_profile:
        executor: { cpu: "2-8", memory: "4Gi-32Gi", instances: "2-100" }
        driver: { cpu: "1-4", memory: "2Gi-8Gi" }
  provides:
    - interface: SparkSubmit
    - interface: SparkThriftServer
    - interface: StructuredStreaming
  depends_on:
    - { component: object-storage, type: hard, interface: S3API, reason: "checkpoint & data storage" }
    - { component: metadata-catalog, type: hard, interface: HiveMetastoreThrift, reason: "table metadata" }
    - { component: spark-operator, type: hard, reason: "K8s native execution" }
  compatible_with:
    - { component: iceberg, versions: ">=1.4.0,<2.0.0" }
    - { component: delta-lake, versions: ">=2.4.0,<4.0.0" }
    - { component: hive-metastore, versions: ">=3.1.0" }
  scales_with:
    - rule: "executor_count = ceil(data_volume_tb * 10)"
    - rule: "driver_memory = max(2Gi, executor_count * 0.1Gi)"
  conflicts_with:
    - { component: flink, reason: "동일 역할 중복 — 하나만 선택", type: soft }
  managed_by_operator: spark-operator
  monitoring:
    metrics_port: 8090
    prometheus_rules: "spark-alerts.yaml"
    grafana_dashboard: "spark-overview.json"`}</div>
      </div>
    </div>
  );
}
