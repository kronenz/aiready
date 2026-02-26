import { Flex, Box, Text, Card, Heading, Badge, Progress, ScrollArea, Code, Separator } from '@radix-ui/themes';
import { CheckCircle, Circle, Loader2, AlertCircle, GitPullRequest, ArrowRight } from 'lucide-react';
import { deployPipeline, argoApps } from '../../data/provisioning';

const stageIcons: Record<string, React.ReactNode> = {
  done: <CheckCircle size={16} style={{ color: 'var(--color-accent-green)' }} />,
  active: <Loader2 size={16} className="animate-spin" style={{ color: 'var(--color-accent-blue)' }} />,
  pending: <Circle size={16} style={{ color: 'var(--color-text-muted)' }} />,
  error: <AlertCircle size={16} style={{ color: 'var(--color-accent-red)' }} />,
};

const healthDot: Record<string, string> = {
  Healthy: '#22c55e',
  Progressing: '#3b82f6',
  Degraded: '#ef4444',
  Missing: '#94a3b8',
};

const syncBadgeColor: Record<string, 'green' | 'blue' | 'gray'> = {
  Synced: 'green',
  Progressing: 'blue',
  OutOfSync: 'gray',
};

const waveLabels = ['Wave 0 — CRDs', 'Wave 1 — Operators', 'Wave 2 — Infrastructure', 'Wave 3 — Monitoring', 'Wave 4 — Data Platform'];

export function ProvisioningView() {
  const completedApps = argoApps.filter(a => a.health === 'Healthy').length;
  const totalApps = argoApps.length;
  const progress = Math.round((completedApps / totalApps) * 100);

  return (
    <ScrollArea scrollbars="vertical" className="h-full">
      <Flex direction="column" gap="5" p="5">

        {/* Pipeline */}
        <Box>
          <Flex align="center" gap="2" mb="3">
            <GitPullRequest size={16} style={{ color: 'var(--color-accent-blue)' }} />
            <Heading size="3" style={{ color: 'var(--color-text-primary)' }}>배포 파이프라인</Heading>
          </Flex>
          <Flex align="stretch" gap="0" style={{ overflowX: 'auto', paddingBottom: 8 }}>
            {deployPipeline.map((stage, i) => (
              <Flex key={stage.id} align="center">
                <Card
                  size="1"
                  variant="surface"
                  style={{
                    minWidth: 175,
                    background: stage.status === 'active' ? 'rgba(37,99,235,0.04)' : '#ffffff',
                    border: `1px solid ${stage.status === 'active' ? 'rgba(37,99,235,0.2)' : 'var(--color-border)'}`,
                    opacity: stage.status === 'pending' ? 0.6 : 1,
                  }}
                >
                  <Flex align="center" gap="2" mb="1">
                    {stageIcons[stage.status]}
                    <Text size="1" weight="bold" style={{ color: 'var(--color-text-primary)' }}>{stage.label}</Text>
                  </Flex>
                  <Text size="1" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{stage.detail}</Text>
                  {stage.time && (
                    <Code size="1" variant="ghost" color="gray" style={{ fontSize: 8, marginTop: 4, display: 'block' }}>{stage.time}</Code>
                  )}
                </Card>
                {i < deployPipeline.length - 1 && (
                  <ArrowRight size={14} style={{ color: 'var(--color-text-muted)', margin: '0 6px', flexShrink: 0 }} />
                )}
              </Flex>
            ))}
          </Flex>
        </Box>

        {/* Progress */}
        <Card size="2" variant="surface" style={{ background: '#ffffff', border: '1px solid var(--color-border)' }}>
          <Flex align="center" justify="between" mb="2">
            <Text size="2" weight="bold" style={{ color: 'var(--color-text-primary)' }}>전체 배포 진행률</Text>
            <Text size="2" weight="bold" className="font-mono" style={{ color: 'var(--color-accent-blue)' }}>{progress}%</Text>
          </Flex>
          <Progress value={progress} size="2" color="violet" />
          <Text size="1" style={{ color: 'var(--color-text-muted)', marginTop: 6, display: 'block' }}>
            {completedApps}/{totalApps} Applications Synced · Wave 3/5 진행 중
          </Text>
        </Card>

        {/* ArgoCD Apps */}
        <Box>
          <Heading size="3" mb="3" style={{ color: 'var(--color-text-primary)' }}>ArgoCD Applications</Heading>
          <Flex direction="column" gap="4">
            {[0, 1, 2, 3, 4].map((wave) => {
              const waveApps = argoApps.filter((a) => a.wave === wave);
              return (
                <Box key={wave}>
                  <Text size="1" weight="bold" className="font-mono" style={{ color: 'var(--color-text-muted)', marginBottom: 8, display: 'block' }}>{waveLabels[wave]}</Text>
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                    {waveApps.map((app) => (
                      <Card key={app.name} size="1" variant="surface" style={{ background: '#ffffff', border: '1px solid var(--color-border)' }}>
                        <Flex align="center" justify="between" mb="1">
                          <Text size="1" weight="bold" style={{ color: 'var(--color-text-primary)' }}>{app.name}</Text>
                          <Box className={app.health === 'Progressing' ? 'animate-pulse' : ''} style={{ width: 8, height: 8, borderRadius: '50%', background: healthDot[app.health] || '#94a3b8' }} />
                        </Flex>
                        <Flex align="center" gap="2">
                          <Badge size="1" variant="soft" color={syncBadgeColor[app.status] || 'gray'} style={{ fontSize: 8 }}>{app.status}</Badge>
                          <Text size="1" className="font-mono" style={{ color: healthDot[app.health], fontSize: 9 }}>{app.health}</Text>
                        </Flex>
                        <Code size="1" variant="ghost" color="gray" style={{ fontSize: 8, marginTop: 4, display: 'block' }}>ns: {app.namespace}</Code>
                      </Card>
                    ))}
                  </div>
                </Box>
              );
            })}
          </Flex>
        </Box>

        <Separator size="4" style={{ background: 'var(--color-border)' }} />

        {/* Generated Repo Structure */}
        <Card size="2" variant="surface" style={{ background: '#ffffff', border: '1px solid var(--color-border)' }}>
          <Text size="2" weight="bold" mb="2" style={{ color: 'var(--color-text-primary)', display: 'block' }}>생성된 Git Repo 구조</Text>
          <Code size="2" variant="ghost" style={{ color: 'var(--color-text-secondary)', whiteSpace: 'pre', lineHeight: 1.8, fontSize: 10 }}>
{`kubeforge-deploy/
├── clusters/prod-cluster-01/
│   ├── argocd-root.yaml
│   ├── values/
│   │   ├── prometheus-values.yaml
│   │   ├── spark-operator-values.yaml
│   │   ├── trino-values.yaml
│   │   └── ... (15 files)
│   ├── applications/
│   │   ├── wave-0-crds.yaml
│   │   ├── wave-1-operators.yaml
│   │   ├── wave-2-infra.yaml
│   │   ├── wave-3-platform.yaml
│   │   └── wave-4-data.yaml
│   └── secrets/
│       └── external-secrets.yaml
└── ontology/`}
          </Code>
        </Card>
      </Flex>
    </ScrollArea>
  );
}
