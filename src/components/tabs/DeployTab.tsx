import { deployWaves, deployLogs, argoApps } from '../../data/deploy';

export function DeployTab() {
  return (
    <div className="h-full overflow-y-auto p-4 space-y-5">
      {/* Wave Progress */}
      <div>
        <h3 className="text-xs font-medium mb-3" style={{ color: '#94a3b8' }}>Wave 진행 상태</h3>
        <div className="flex gap-2">
          {deployWaves.map(wave => {
            const borderColor = wave.status === 'done' ? '#4ade80' : wave.status === 'active' ? '#3b82f6' : '#334155';
            const bgColor = wave.status === 'done' ? '#4ade8010' : wave.status === 'active' ? '#3b82f610' : '#0f172a';
            const icon = wave.status === 'done' ? '✅' : wave.status === 'active' ? '🔄' : '⏳';
            return (
              <div key={wave.id}
                className="flex-1 rounded-lg p-3 border text-center"
                style={{ background: bgColor, borderColor }}>
                <div className="text-sm mb-1">{icon}</div>
                <div className="text-xs font-semibold" style={{ color: '#e2e8f0' }}>
                  Wave {wave.id}: {wave.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deploy Logs */}
      <div>
        <h3 className="text-xs font-medium mb-3" style={{ color: '#94a3b8' }}>배포 로그</h3>
        <div className="rounded-lg border p-4 font-mono text-xs space-y-1.5"
          style={{ background: '#0a0e17', borderColor: '#1e293b' }}>
          {deployLogs.map((log, i) => {
            const statusIcon = log.status === 'done' ? '✓' : log.status === 'active' ? '◉' : '○';
            const color = log.status === 'done' ? '#4ade80' : log.status === 'active' ? '#3b82f6' : '#475569';
            return (
              <div key={i} className="flex gap-2" style={{ color }}>
                <span className="w-4 text-center shrink-0">{statusIcon}</span>
                <span className="w-16 shrink-0" style={{ color: log.status === 'pending' ? '#475569' : '#64748b' }}>
                  {log.time}
                </span>
                <span className={log.status === 'active' ? 'animate-pulse' : ''}>{log.message}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ArgoCD Application Status */}
      <div>
        <h3 className="text-xs font-medium mb-3" style={{ color: '#94a3b8' }}>ArgoCD Application 상태</h3>
        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))' }}>
          {argoApps.map(app => {
            const isSynced = app.status === 'Synced';
            return (
              <div key={app.name}
                className="rounded-lg p-2.5 border flex items-center gap-2"
                style={{
                  background: '#0f172a',
                  borderColor: isSynced ? '#4ade8040' : '#3b82f640',
                }}>
                <span className="text-sm">{app.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate" style={{ color: '#e2e8f0' }}>{app.name}</div>
                </div>
                <span className="text-xs font-mono shrink-0"
                  style={{ color: isSynced ? '#4ade80' : '#3b82f6' }}>
                  {isSynced ? 'Synced' : (
                    <span className="animate-pulse">Syncing</span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
