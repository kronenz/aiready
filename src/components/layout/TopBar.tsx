import { Bell, Search, ChevronRight } from 'lucide-react';
import type { ViewId } from './Sidebar';

interface TopBarProps {
  activeView: ViewId;
}

const viewTitles: Record<ViewId, { title: string; desc: string }> = {
  design: { title: 'AI Design Studio', desc: '자연어 → 아키텍처 토폴로지 자동 설계' },
  ontology: { title: 'Ontology Engine', desc: '컴포넌트 지식 그래프 탐색 · 의존성 · 호환성' },
  provision: { title: 'Provisioning Engine', desc: 'IaC 코드 생성 → Git PR → ArgoCD 자동 배포' },
  ops: { title: 'Operations Center', desc: '버전 추적 · 업그레이드 오케스트레이션 · 드리프트 감지' },
  agent: { title: 'AI Agent Console', desc: 'MCP 기반 지능형 분석 · 장애 대응 · 최적화 제안' },
};

export function TopBar({ activeView }: TopBarProps) {
  const info = viewTitles[activeView];
  return (
    <div className="h-12 shrink-0 bg-bg-secondary/80 backdrop-blur-sm border-b border-border flex items-center px-5 gap-4">
      <div className="flex items-center gap-2 flex-1">
        <span className="text-[13px] font-bold text-text-primary">{info.title}</span>
        <ChevronRight size={12} className="text-text-muted" />
        <span className="text-[11px] text-text-secondary">{info.desc}</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-1.5 rounded-md hover:bg-bg-hover transition-colors text-text-muted hover:text-text-primary">
          <Search size={15} />
        </button>
        <button className="relative p-1.5 rounded-md hover:bg-bg-hover transition-colors text-text-muted hover:text-text-primary">
          <Bell size={15} />
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-accent-red rounded-full text-[8px] font-bold text-white flex items-center justify-center">3</span>
        </button>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-purple to-accent-pink flex items-center justify-center text-[10px] font-bold text-white">
          SH
        </div>
      </div>
    </div>
  );
}
