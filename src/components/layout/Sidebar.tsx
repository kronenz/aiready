import { Box, Flex, Text, Badge, Separator, ScrollArea } from '@radix-ui/themes';
import { Brain, Compass, Rocket, Settings, Bot, LayoutGrid } from 'lucide-react';

export type ViewId = 'design' | 'ontology' | 'provision' | 'ops' | 'agent';

interface SidebarProps {
  active: ViewId;
  onChange: (v: ViewId) => void;
}

const navItems: { id: ViewId; icon: typeof Brain; label: string; loop?: string }[] = [
  { id: 'design', icon: Compass, label: 'Design Studio', loop: 'LOOP 1' },
  { id: 'ontology', icon: Brain, label: 'Ontology', loop: 'CORE' },
  { id: 'provision', icon: Rocket, label: 'Provisioning', loop: 'LOOP 2' },
  { id: 'ops', icon: Settings, label: 'Operations', loop: 'LOOP 3' },
  { id: 'agent', icon: Bot, label: 'AI Agent', loop: 'LOOP 4' },
];

export function Sidebar({ active, onChange }: SidebarProps) {
  return (
    <Flex direction="column" className="w-[224px] shrink-0 h-full" style={{ background: 'var(--color-bg-secondary)', borderRight: '1px solid var(--color-border)' }}>
      {/* Logo */}
      <Box px="4" py="4">
        <Flex align="center" gap="3">
          <Flex align="center" justify="center" className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue shrink-0">
            <LayoutGrid size={17} color="white" />
          </Flex>
          <Box>
            <Text size="3" weight="bold" className="tracking-tight" style={{ color: 'var(--color-text-primary)' }}>KubeForge</Text>
            <Text size="1" className="font-mono block" style={{ color: 'var(--color-text-muted)', letterSpacing: '0.1em', fontSize: 9 }}>SOLUTION PLATFORM</Text>
          </Box>
        </Flex>
      </Box>

      <Separator size="4" style={{ background: 'var(--color-border)' }} />

      {/* Nav */}
      <ScrollArea scrollbars="vertical" className="flex-1">
        <Flex direction="column" gap="1" p="3">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  background: isActive ? 'rgba(124,58,237,0.08)' : 'transparent',
                  color: isActive ? 'var(--color-accent-purple)' : 'var(--color-text-secondary)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#f1f5f9';
                    e.currentTarget.style.color = 'var(--color-text-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                  }
                }}
              >
                <item.icon size={16} strokeWidth={isActive ? 2.5 : 1.8} />
                <span style={{ flex: 1, fontSize: 12, fontWeight: 600 }}>{item.label}</span>
                {item.loop && (
                  <Badge
                    size="1"
                    variant={isActive ? 'solid' : 'surface'}
                    color={isActive ? 'violet' : 'gray'}
                    style={{ fontSize: 8, fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {item.loop}
                  </Badge>
                )}
              </button>
            );
          })}
        </Flex>
      </ScrollArea>

      <Separator size="4" style={{ background: 'var(--color-border)' }} />

      {/* Cluster Status */}
      <Box px="4" py="3">
        <Flex align="center" gap="2" mb="1">
          <Box className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          <Text size="1" className="font-mono" style={{ color: 'var(--color-text-muted)' }}>prod-cluster-01</Text>
        </Flex>
        <Text size="1" className="font-mono" style={{ color: 'var(--color-text-muted)', fontSize: 9 }}>23 components · 57 nodes</Text>
      </Box>
    </Flex>
  );
}
