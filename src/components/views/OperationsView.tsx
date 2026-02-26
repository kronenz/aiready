import { Flex, Box, Text, Card, Badge, Heading, Tabs, Table, ScrollArea, Code } from '@radix-ui/themes';
import { ArrowUpCircle, AlertTriangle, CheckCircle, Clock, Shield, ChevronRight, RefreshCw } from 'lucide-react';
import { versionData, driftData, upgradePathExample, type VersionInfo } from '../../data/versions';

const statusBadgeColor: Record<VersionInfo['status'], 'green' | 'blue' | 'red' | 'orange'> = {
  'up-to-date': 'green',
  'update-available': 'blue',
  'critical-update': 'red',
  'eol-warning': 'orange',
};
const statusLabel: Record<VersionInfo['status'], string> = {
  'up-to-date': 'Up to date',
  'update-available': 'Update',
  'critical-update': 'Critical',
  'eol-warning': 'EOL',
};

export function OperationsView() {
  const updates = versionData.filter(v => v.status !== 'up-to-date').length;

  return (
    <Flex direction="column" className="h-full">
      <Tabs.Root defaultValue="versions">
        <Tabs.List size="2" style={{ paddingLeft: 16, borderBottom: '1px solid var(--color-border)' }}>
          <Tabs.Trigger value="versions">
            <Flex align="center" gap="2">
              <ArrowUpCircle size={13} /> Version Tracker
              <Badge size="1" variant="soft" color="violet">{updates}</Badge>
            </Flex>
          </Tabs.Trigger>
          <Tabs.Trigger value="upgrade">
            <Flex align="center" gap="2">
              <RefreshCw size={13} /> Upgrade Path
            </Flex>
          </Tabs.Trigger>
          <Tabs.Trigger value="drift">
            <Flex align="center" gap="2">
              <Shield size={13} /> Drift Detection
              <Badge size="1" variant="soft" color="red">{driftData.length}</Badge>
            </Flex>
          </Tabs.Trigger>
        </Tabs.List>

        <Box className="flex-1 overflow-hidden">
          <Tabs.Content value="versions" className="h-full">
            <VersionsTab />
          </Tabs.Content>
          <Tabs.Content value="upgrade" className="h-full">
            <UpgradeTab />
          </Tabs.Content>
          <Tabs.Content value="drift" className="h-full">
            <DriftTab />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Flex>
  );
}

function VersionsTab() {
  return (
    <ScrollArea scrollbars="vertical">
      <Flex direction="column" gap="4" p="5">
        {/* Summary cards */}
        <div className="grid grid-cols-4 gap-3">
          <SummaryCard label="전체 컴포넌트" value={versionData.length} color="var(--color-text-primary)" />
          <SummaryCard label="최신 상태" value={versionData.filter(v => v.status === 'up-to-date').length} color="var(--color-accent-green)" />
          <SummaryCard label="업데이트 가능" value={versionData.filter(v => v.status === 'update-available').length} color="var(--color-accent-blue)" />
          <SummaryCard label="긴급 업데이트" value={versionData.filter(v => v.status === 'critical-update').length} color="var(--color-accent-red)" />
        </div>

        {/* Table */}
        <Card size="1" variant="surface" style={{ background: '#ffffff', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
          <Table.Root size="1">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Component</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Current</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Latest</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Note</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {versionData.map((v) => (
                <Table.Row key={v.component}>
                  <Table.Cell>
                    <Flex align="center" gap="2">
                      <Text size="3">{v.icon}</Text>
                      <Box>
                        <Text size="1" weight="bold" style={{ color: 'var(--color-text-primary)', display: 'block' }}>{v.component}</Text>
                        <Text size="1" style={{ color: 'var(--color-text-muted)', fontSize: 9 }}>{v.category}</Text>
                      </Box>
                    </Flex>
                  </Table.Cell>
                  <Table.Cell><Code size="1" variant="ghost">{v.current}</Code></Table.Cell>
                  <Table.Cell>
                    <Code size="1" variant="ghost" color={v.current !== v.latest ? 'blue' : 'gray'} weight={v.current !== v.latest ? 'bold' : 'regular'}>
                      {v.latest}
                    </Code>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge size="1" variant="soft" color={statusBadgeColor[v.status]}>{statusLabel[v.status]}</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" style={{ color: 'var(--color-text-muted)', maxWidth: 200 }}>{v.changelog || '—'}</Text>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card>
      </Flex>
    </ScrollArea>
  );
}

function UpgradeTab() {
  return (
    <ScrollArea scrollbars="vertical">
      <Flex direction="column" gap="4" p="5">
        <Card size="2" variant="surface" style={{ background: '#ffffff', border: '1px solid var(--color-border)' }}>
          <Heading size="3" mb="1" style={{ color: 'var(--color-text-primary)' }}>Spark 3.5.3 → 3.6.0 업그레이드 시뮬레이션</Heading>
          <Text size="1" mb="4" style={{ color: 'var(--color-text-muted)', display: 'block' }}>온톨로지 기반 자동 경로 계산 · 예상 다운타임 15분 · 롤백 가능</Text>

          <Flex direction="column" gap="2">
            {upgradePathExample.map((step) => (
              <Card key={step.order} size="1" variant="surface" style={{
                background: step.status === 'done' ? 'rgba(22,163,74,0.04)' : step.status === 'in-progress' ? 'rgba(37,99,235,0.04)' : '#f8fafc',
                border: `1px solid ${step.status === 'done' ? 'rgba(22,163,74,0.2)' : step.status === 'in-progress' ? 'rgba(37,99,235,0.2)' : 'var(--color-border)'}`,
              }}>
                <Flex align="center" gap="3">
                  <Flex align="center" justify="center" style={{
                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0, fontSize: 10, fontWeight: 700,
                    background: step.status === 'done' ? 'rgba(22,163,74,0.08)' : step.status === 'in-progress' ? 'rgba(37,99,235,0.08)' : '#f1f5f9',
                    color: step.status === 'done' ? '#16a34a' : step.status === 'in-progress' ? '#2563eb' : '#94a3b8',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    {step.order}
                  </Flex>
                  <Flex align="center" gap="2" className="flex-1">
                    <Badge size="1" variant="surface" color="gray">{step.action}</Badge>
                    <Text size="1" weight="bold" style={{ color: 'var(--color-text-primary)' }}>{step.component}</Text>
                    <ChevronRight size={10} style={{ color: 'var(--color-text-muted)' }} />
                    <Text size="1" style={{ color: 'var(--color-text-secondary)' }}>{step.detail}</Text>
                  </Flex>
                  {step.status === 'done' && <CheckCircle size={15} style={{ color: '#16a34a' }} />}
                  {step.status === 'in-progress' && <Clock size={15} className="animate-pulse" style={{ color: '#2563eb' }} />}
                  {step.status === 'pending' && <Box style={{ width: 15, height: 15, borderRadius: '50%', border: '2px solid #94a3b8' }} />}
                </Flex>
              </Card>
            ))}
          </Flex>
        </Card>
      </Flex>
    </ScrollArea>
  );
}

function DriftTab() {
  return (
    <ScrollArea scrollbars="vertical">
      <Flex direction="column" gap="4" p="5">
        <Card size="2" variant="surface" style={{ background: 'rgba(220,38,38,0.03)', border: '1px solid rgba(220,38,38,0.15)' }}>
          <Flex align="center" gap="2" mb="1">
            <AlertTriangle size={14} style={{ color: '#dc2626' }} />
            <Text size="2" weight="bold" style={{ color: '#dc2626' }}>{driftData.length}건의 드리프트 감지</Text>
          </Flex>
          <Text size="1" style={{ color: 'var(--color-text-secondary)' }}>실제 클러스터 상태 vs Git 선언 상태 vs 온톨로지 3-way 비교</Text>
        </Card>

        {driftData.map((d, i) => (
          <Card key={i} size="2" variant="surface" style={{
            background: '#ffffff',
            border: `1px solid ${d.severity === 'critical' ? 'rgba(220,38,38,0.2)' : 'rgba(202,138,4,0.2)'}`,
          }}>
            <Flex align="center" justify="between" mb="3">
              <Flex align="center" gap="2">
                <AlertTriangle size={13} style={{ color: d.severity === 'critical' ? '#dc2626' : '#ca8a04' }} />
                <Text size="2" weight="bold" style={{ color: 'var(--color-text-primary)' }}>{d.component}</Text>
                <Badge size="1" variant="soft" color={d.severity === 'critical' ? 'red' : 'orange'}>{d.severity.toUpperCase()}</Badge>
              </Flex>
              <Code size="1" variant="ghost" color="gray">{d.detected}</Code>
            </Flex>
            <div className="grid grid-cols-3 gap-2">
              <Card size="1" variant="surface" style={{ background: '#f8fafc', border: '1px solid var(--color-border)' }}>
                <Text size="1" style={{ color: 'var(--color-text-muted)', fontSize: 9, display: 'block' }}>Field</Text>
                <Code size="1" weight="bold">{d.field}</Code>
              </Card>
              <Card size="1" variant="surface" style={{ background: '#f8fafc', border: '1px solid rgba(22,163,74,0.2)' }}>
                <Text size="1" style={{ color: '#16a34a', fontSize: 9, display: 'block' }}>Expected (Git)</Text>
                <Code size="1" color="green" weight="bold">{d.expected}</Code>
              </Card>
              <Card size="1" variant="surface" style={{ background: '#f8fafc', border: '1px solid rgba(220,38,38,0.2)' }}>
                <Text size="1" style={{ color: '#dc2626', fontSize: 9, display: 'block' }}>Actual (Cluster)</Text>
                <Code size="1" color="red" weight="bold">{d.actual}</Code>
              </Card>
            </div>
          </Card>
        ))}
      </Flex>
    </ScrollArea>
  );
}

function SummaryCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <Card size="2" variant="surface" style={{ background: '#ffffff', border: '1px solid var(--color-border)', textAlign: 'center' }}>
      <Text size="5" weight="bold" className="font-mono" style={{ color, display: 'block' }}>{value}</Text>
      <Text size="1" style={{ color: 'var(--color-text-muted)' }}>{label}</Text>
    </Card>
  );
}
