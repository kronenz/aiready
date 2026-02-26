import { useState } from 'react';
import { Flex, Box, Text, Card, Heading, Badge, ScrollArea, Separator } from '@radix-ui/themes';
import { Cpu, Wrench } from 'lucide-react';
import { agentProfiles, sampleAgentChat } from '../../data/agents';
import { ChatPanel } from '../shared/ChatPanel';

export function AgentView() {
  const [selectedAgent, setSelectedAgent] = useState('incident');
  const agent = agentProfiles.find((a) => a.id === selectedAgent)!;

  return (
    <Flex className="h-full">
      {/* Agent Selector */}
      <Flex direction="column" className="w-[270px] shrink-0" style={{ background: 'var(--color-bg-secondary)', borderRight: '1px solid var(--color-border)' }}>
        <Box px="4" py="3" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <Flex align="center" gap="2">
            <Cpu size={14} style={{ color: 'var(--color-accent-pink)' }} />
            <Heading size="2" style={{ color: 'var(--color-text-primary)' }}>Agent Profiles</Heading>
          </Flex>
          <Text size="1" style={{ color: 'var(--color-text-muted)' }}>kagent + MCP 기반 AI Agent</Text>
        </Box>

        <ScrollArea scrollbars="vertical" className="flex-1">
          <Flex direction="column" gap="2" p="3">
            {agentProfiles.map((a) => (
              <Card
                key={a.id}
                size="1"
                variant={selectedAgent === a.id ? 'classic' : 'surface'}
                onClick={() => setSelectedAgent(a.id)}
                style={{
                  cursor: 'pointer',
                  background: selectedAgent === a.id ? 'rgba(167,139,250,0.08)' : 'var(--color-bg-primary)',
                  border: `1px solid ${selectedAgent === a.id ? 'rgba(167,139,250,0.3)' : 'var(--color-border)'}`,
                }}
              >
                <Flex align="center" gap="2" mb="1">
                  <Text size="4">{a.icon}</Text>
                  <Text size="2" weight="bold" style={{ color: 'var(--color-text-primary)' }}>{a.name}</Text>
                </Flex>
                <Text size="1" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{a.desc}</Text>
                <Flex wrap="wrap" gap="1" mt="2">
                  {a.mcpTools.map((t) => (
                    <Badge key={t} size="1" variant="surface" color="gray" style={{ fontSize: 8 }}>{t}</Badge>
                  ))}
                </Flex>
              </Card>
            ))}
          </Flex>
        </ScrollArea>

        <Separator size="4" style={{ background: 'var(--color-border)' }} />

        {/* MCP Status */}
        <Box p="3">
          <Flex align="center" gap="1" mb="2">
            <Wrench size={10} style={{ color: 'var(--color-text-muted)' }} />
            <Text size="1" weight="bold" style={{ color: 'var(--color-text-muted)' }}>MCP Servers</Text>
          </Flex>
          <div className="grid grid-cols-2 gap-1.5">
            {['Ontology', 'Prometheus', 'OpenSearch', 'Airflow', 'Spark', 'ArgoCD', 'Version'].map((mcp) => (
              <Flex key={mcp} align="center" gap="1">
                <Box className="animate-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-accent-green)' }} />
                <Text size="1" style={{ color: 'var(--color-text-secondary)', fontSize: 9 }}>{mcp}</Text>
              </Flex>
            ))}
          </div>
        </Box>
      </Flex>

      {/* Chat Area */}
      <Flex direction="column" className="flex-1">
        {/* Agent Header */}
        <Flex align="center" gap="3" px="4" py="3" style={{ borderBottom: '1px solid var(--color-border)', background: 'rgba(12,16,24,0.5)' }}>
          <Text size="5">{agent.icon}</Text>
          <Box className="flex-1">
            <Text size="2" weight="bold" style={{ color: 'var(--color-text-primary)', display: 'block' }}>{agent.name} Agent</Text>
            <Text size="1" style={{ color: 'var(--color-text-muted)' }}>{agent.desc}</Text>
          </Box>
          <Flex align="center" gap="1">
            <Box className="animate-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-accent-green)' }} />
            <Text size="1" className="font-mono" style={{ color: 'var(--color-accent-green)' }}>Active</Text>
          </Flex>
        </Flex>

        <ChatPanel
          messages={sampleAgentChat}
          placeholder={`${agent.name} Agent에게 질문하세요...`}
        />
      </Flex>
    </Flex>
  );
}
