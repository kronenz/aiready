import { CheckCircle, Circle, Loader2, AlertCircle, GitPullRequest, ArrowRight } from 'lucide-react';
import { deployPipeline, argoApps } from '../../data/provisioning';

const stageIcons = {
  done: <CheckCircle size={16} className="text-accent-green" />,
  active: <Loader2 size={16} className="text-accent-blue animate-spin" />,
  pending: <Circle size={16} className="text-text-muted" />,
  error: <AlertCircle size={16} className="text-accent-red" />,
};

const healthColors: Record<string, string> = {
  Healthy: 'text-accent-green',
  Progressing: 'text-accent-blue',
  Degraded: 'text-accent-red',
  Missing: 'text-text-muted',
};

const syncColors: Record<string, string> = {
  Synced: 'bg-accent-green/15 text-accent-green border-accent-green/30',
  Progressing: 'bg-accent-blue/15 text-accent-blue border-accent-blue/30',
  OutOfSync: 'bg-text-muted/15 text-text-muted border-text-muted/30',
};

export function ProvisioningView() {
  const completedApps = argoApps.filter(a => a.health === 'Healthy').length;
  const totalApps = argoApps.length;
  const progress = Math.round((completedApps / totalApps) * 100);

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      {/* Pipeline */}
      <div>
        <div className="text-[15px] font-bold text-text-primary mb-4 flex items-center gap-2">
          <GitPullRequest size={16} className="text-accent-blue" />
          배포 파이프라인
        </div>
        <div className="flex items-stretch gap-0 overflow-x-auto pb-2">
          {deployPipeline.map((stage, i) => (
            <div key={stage.id} className="flex items-center">
              <div className={`min-w-[170px] p-3 rounded-xl border transition-all ${
                stage.status === 'active'
                  ? 'bg-accent-blue/10 border-accent-blue/30'
                  : stage.status === 'done'
                    ? 'bg-bg-secondary border-border'
                    : 'bg-bg-secondary/50 border-border/50'
              }`}>
                <div className="flex items-center gap-2 mb-1.5">
                  {stageIcons[stage.status]}
                  <span className="text-[11px] font-bold text-text-primary">{stage.label}</span>
                </div>
                <div className="text-[9px] text-text-secondary leading-relaxed">{stage.detail}</div>
                {stage.time && (
                  <div className="text-[8px] font-mono text-text-muted mt-1">{stage.time}</div>
                )}
              </div>
              {i < deployPipeline.length - 1 && (
                <ArrowRight size={14} className="mx-1.5 text-text-muted shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="bg-bg-secondary border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] font-bold text-text-primary">전체 배포 진행률</span>
          <span className="text-[12px] font-mono font-bold text-accent-blue">{progress}%</span>
        </div>
        <div className="h-2 bg-bg-primary rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-accent-purple to-accent-blue rounded-full transition-all duration-1000"
               style={{ width: `${progress}%` }} />
        </div>
        <div className="text-[10px] text-text-muted mt-1.5">
          {completedApps}/{totalApps} Applications Synced · Wave 3/5 진행 중
        </div>
      </div>

      {/* ArgoCD Apps */}
      <div>
        <div className="text-[15px] font-bold text-text-primary mb-3">ArgoCD Applications</div>
        <div className="grid grid-cols-1 gap-2">
          {[0, 1, 2, 3, 4].map((wave) => {
            const waveApps = argoApps.filter((a) => a.wave === wave);
            const waveLabels = ['Wave 0 — CRDs', 'Wave 1 — Operators', 'Wave 2 — Infrastructure', 'Wave 3 — Monitoring', 'Wave 4 — Data Platform'];
            return (
              <div key={wave}>
                <div className="text-[10px] font-mono font-bold text-text-muted mb-1.5 px-1">{waveLabels[wave]}</div>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-3">
                  {waveApps.map((app) => (
                    <div key={app.name} className="bg-bg-secondary border border-border rounded-lg p-2.5 hover:border-border-hover transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold text-text-primary">{app.name}</span>
                        <div className={`w-2 h-2 rounded-full ${
                          app.health === 'Healthy' ? 'bg-accent-green' :
                          app.health === 'Progressing' ? 'bg-accent-blue animate-pulse' :
                          app.health === 'Degraded' ? 'bg-accent-red' : 'bg-text-muted'
                        }`} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border ${syncColors[app.status] || ''}`}>
                          {app.status}
                        </span>
                        <span className={`text-[9px] font-mono ${healthColors[app.health] || ''}`}>
                          {app.health}
                        </span>
                      </div>
                      <div className="text-[8px] font-mono text-text-muted mt-1">ns: {app.namespace}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Generated Repo Structure */}
      <div className="bg-bg-secondary border border-border rounded-xl p-4">
        <div className="text-[12px] font-bold text-text-primary mb-2">생성된 Git Repo 구조</div>
        <pre className="text-[10px] font-mono text-text-secondary leading-relaxed whitespace-pre">{`kubeforge-deploy/
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
└── ontology/`}</pre>
      </div>
    </div>
  );
}
