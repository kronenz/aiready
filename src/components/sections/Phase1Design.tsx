import { ArchBlock } from '../ui/ArchBlock';
import { CompItem } from '../ui/CompItem';
import { FlowPipe } from '../ui/FlowPipe';

export function Phase1Design() {
  return (
    <div className="phase" id="p1">
      <span className="phase-badge" style={{ background: '#a78bfa22', color: 'var(--purple)', border: '1px solid #a78bfa44' }}>
        ① LOOP 1
      </span>
      <div className="phase-title">AI 아키텍처 설계 엔진</div>
      <div className="phase-sub">자연어 요구사항 → 구조화 → 온톨로지 추론 → 토폴로지 생성 → ReactFlow 시각화</div>

      <FlowPipe nodes={[
        { icon: '💬', label: 'Chat UI', tech: 'React · WebSocket', borderColor: 'var(--purple)' },
        { icon: '🧠', label: 'LLM Parser', tech: 'Claude / GPT · Structured Output', borderColor: 'var(--purple)', textColor: 'var(--purple)' },
        { icon: '🔍', label: 'Ontology Resolver', tech: 'POST /resolve · Neo4j', borderColor: 'var(--blue)', textColor: 'var(--blue)' },
        { icon: '📐', label: 'Topology Generator', tech: 'Layout Engine · Resource Calc', borderColor: 'var(--cyan)', textColor: 'var(--cyan)' },
        { icon: '🖥️', label: 'ReactFlow Renderer', tech: '@xyflow/react · 인터랙티브', borderColor: 'var(--green)', textColor: 'var(--green)' },
      ]} />

      <div className="g2">
        <ArchBlock borderColor="var(--purple)" label="SERVICE 1" labelColor="var(--purple)" title="Design Orchestrator" desc="사용자 대화를 받아 전체 설계 파이프라인을 오케스트레이션">
          <div className="comp-list">
            <CompItem icon="🧠" name="LLM Intent Parser" role='자연어 → JSON 구조체 변환. Function calling으로 schema 강제' tech="Claude API · tool_use · Pydantic schema" techColor="var(--purple)" />
            <CompItem icon="🔗" name="Ontology RAG Pipeline" role="LLM에게 온톨로지 컨텍스트를 주입. 컴포넌트 목록/관계를 프롬프트에 동적 포함" tech="LangChain · Neo4j Vector + Cypher QA Chain" techColor="var(--blue)" />
            <CompItem icon="🎯" name="Constraint Validator" role="LLM 출력을 온톨로지 규칙으로 검증. 누락된 의존성 자동 보완, 충돌 감지" tech="Python · /api/v1/resolve + /compatibility/check" techColor="var(--red)" />
            <CompItem icon="🏗️" name="Alternative Generator" role='"Option A: 안정성 우선(Thanos+OpenSearch)" vs "Option B: 비용 절감(Mimir+Loki)" 대안 생성' tech="온톨로지의 같은 카테고리 내 대체 컴포넌트 쿼리" techColor="var(--gold)" />
          </div>
        </ArchBlock>

        <ArchBlock borderColor="var(--cyan)" label="SERVICE 2" labelColor="var(--cyan)" title="Topology Engine" desc="해결된 컴포넌트 목록 → 레이어 배치 + 연결 + 리소스 계산 → ReactFlow JSON">
          <div className="comp-list">
            <CompItem icon="📐" name="Layer Layout Engine" role="컴포넌트를 L0~L4 레이어에 자동 배치. 온톨로지의 category 기반 분류" tech="ELK.js (Eclipse Layout Kernel) 또는 dagre" techColor="var(--cyan)" />
            <CompItem icon="💾" name="Resource Calculator" role='SCALES_WITH 규칙 기반 리소스 산출. "50노드 → Prometheus 16GB RAM, Thanos Store 500GB"' tech="Python · 온톨로지 scales_with 규칙 평가" techColor="var(--green)" />
            <CompItem icon="📊" name="ReactFlow JSON Generator" role="nodes[] + edges[] + 스타일 → 프론트엔드에서 바로 렌더링 가능한 JSON" tech="JSON output → WebSocket push → 실시간 렌더링" techColor="var(--blue)" />
          </div>
        </ArchBlock>
      </div>

      <ArchBlock borderColor="var(--green)" label="FRONTEND" labelColor="var(--green)" title="Design Studio UI" desc="ReactFlow 기반 인터랙티브 토폴로지 에디터 + 대화형 설계 인터페이스">
        <div className="g3">
          <CompItem icon="🗺️" name="Topology Canvas" role="@xyflow/react로 레이어별 노드 렌더링. 드래그&드롭으로 컴포넌트 추가/이동/삭제. 엣지가 의존성 표시" />
          <CompItem icon="💬" name="Chat Panel" role="자연어 입력 + AI 응답. 토폴로지 변경이 채팅에서도, 캔버스에서도 가능한 양방향" />
          <CompItem icon="⚠️" name="Validation Panel" role="실시간 제약조건 검증 결과 표시. 빨간색=위반, 노란색=경고, 녹색=통과" />
          <CompItem icon="🔀" name="Compare View" role="Option A vs B 아키텍처 나란히 비교. 리소스/비용/복잡도 차이 하이라이트" />
          <CompItem icon="📋" name="Component Inspector" role="노드 클릭 시 사이드패널. 버전/리소스/의존성/Helm 정보/대안 표시" />
          <CompItem icon="🚀" name="Deploy Button" role='"이 아키텍처로 프로비저닝" → Loop 2로 전환. 최종 확인 모달' />
        </div>
      </ArchBlock>
    </div>
  );
}
