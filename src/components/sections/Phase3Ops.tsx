import { ArchBlock } from '../ui/ArchBlock';
import { CompItem } from '../ui/CompItem';

export function Phase3Ops() {
  return (
    <div className="phase" id="p3">
      <span className="phase-badge" style={{ background: '#fb923c22', color: 'var(--orange)', border: '1px solid #fb923c44' }}>
        ③ LOOP 3
      </span>
      <div className="phase-title">운영 관리 엔진</div>
      <div className="phase-sub">버전 추적 · 호환성 자동 검증 · 업그레이드 오케스트레이션 · 드리프트 감지</div>

      <div className="g2">
        <ArchBlock borderColor="var(--orange)" label="SERVICE 5" labelColor="var(--orange)" title="Version Tracker" desc="CNCF 프로젝트 릴리스를 추적하고 온톨로지를 자동 업데이트">
          <div className="comp-list">
            <CompItem icon="📡" name="GitHub Release Watcher" role="감시 대상 프로젝트 목록(ontology에서 추출)의 GitHub Releases API 폴링. 새 릴리스 감지 시 이벤트 발행" tech="K8s CronJob · 1시간 주기 · GitHub API + Redis 중복 방지" techColor="var(--orange)" />
            <CompItem icon="📝" name="Release Note Parser" role='릴리스 노트에서 breaking changes, 호환성 정보, deprecated API 자동 추출. LLM 활용 가능' tech='LLM structured extraction · "이 릴리스의 호환성 변경 사항은?"' techColor="var(--purple)" />
            <CompItem icon="🔄" name="Ontology Auto-Updater" role="파싱된 호환성 정보 → 온톨로지의 COMPATIBLE_WITH, UPGRADEABLE_TO 관계 자동 추가/수정 → Git PR" tech="YAML 수정 → Git commit → 온톨로지 Sync Controller 트리거" techColor="var(--green)" />
          </div>
        </ArchBlock>

        <ArchBlock borderColor="var(--red)" label="SERVICE 6" labelColor="var(--red)" title="Upgrade Orchestrator" desc="호환성이 확인된 업그레이드를 안전하게 실행">
          <div className="comp-list">
            <CompItem icon="🔍" name="Impact Analyzer" role="새 버전 도입 시 영향받는 컴포넌트 체인 계산. /api/v1/upgrade-path 호출" tech="Neo4j 그래프 탐색 · 전이적 의존성 분석" techColor="var(--red)" />
            <CompItem icon="🧪" name="Pre-flight Test Runner" role="vcluster에 임시 환경 생성 → 새 버전 배포 → E2E 테스트 → 결과 리포트" tech="vcluster + Argo Workflows · 테스트 완료 후 자동 삭제" techColor="var(--cyan)" />
            <CompItem icon="🚀" name="Kargo Promotion Pipeline" role="dev → staging → prod 순차 프로모션. 각 단계 스모크 테스트 통과 필수" tech="Kargo Freight · ArgoCD ApplicationSet 연동" techColor="var(--green)" />
            <CompItem icon="⏪" name="Rollback Controller" role="배포 실패 또는 헬스체크 실패 시 자동 롤백. 온톨로지의 업그레이드 순서 역순으로 실행" tech="ArgoCD History · Git revert PR 자동 생성" techColor="var(--red)" />
          </div>
        </ArchBlock>
      </div>

      <ArchBlock borderColor="var(--gold)" label="SERVICE 7" labelColor="var(--gold)" title="Drift Detector & Reconciler" desc="실제 클러스터 상태와 온톨로지/Git의 선언 상태 비교 → 드리프트 감지 → 자동 교정 또는 알림">
        <div className="g3">
          <CompItem icon="🔎" name="Cluster State Scanner" role="K8s API에서 실제 배포된 Helm release 버전, 이미지 태그, 리소스 설정을 주기적으로 수집" />
          <CompItem icon="⚖️" name="Drift Comparator" role="스캔 결과 vs Git의 선언 상태 vs 온톨로지의 예상 상태를 3-way 비교" />
          <CompItem icon="🔔" name="Alert Dispatcher" role="드리프트 발견 시 심각도 분류 → Slack/PagerDuty 알림 또는 자동 ArgoCD Hard Refresh" />
        </div>
      </ArchBlock>
    </div>
  );
}
