import { Flex, Text, IconButton, Separator, Avatar, Badge } from '@radix-ui/themes';
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
    <Flex
      align="center"
      px="5"
      gap="4"
      className="h-12 shrink-0"
      style={{ background: 'rgba(12,16,24,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--color-border)' }}
    >
      <Flex align="center" gap="2" className="flex-1">
        <Text size="2" weight="bold" style={{ color: 'var(--color-text-primary)' }}>{info.title}</Text>
        <ChevronRight size={12} style={{ color: 'var(--color-text-muted)' }} />
        <Text size="1" style={{ color: 'var(--color-text-secondary)' }}>{info.desc}</Text>
      </Flex>

      <Flex align="center" gap="2">
        <IconButton size="1" variant="ghost" color="gray" radius="medium">
          <Search size={14} />
        </IconButton>
        <div style={{ position: 'relative' }}>
          <IconButton size="1" variant="ghost" color="gray" radius="medium">
            <Bell size={14} />
          </IconButton>
          <Badge
            size="1"
            color="red"
            variant="solid"
            radius="full"
            style={{ position: 'absolute', top: -2, right: -2, fontSize: 8, minWidth: 14, height: 14, padding: '0 3px' }}
          >
            3
          </Badge>
        </div>
        <Separator orientation="vertical" size="1" mx="1" style={{ background: 'var(--color-border)' }} />
        <Avatar size="1" fallback="SH" radius="full" color="violet" />
      </Flex>
    </Flex>
  );
}
