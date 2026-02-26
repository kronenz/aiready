import { X } from 'lucide-react';
import type { KubeComponent, SidePanelMode } from '../types';
import { alerts } from '../data/alerts';
import { ProgressBar } from './common/ProgressBar';

interface SidePanelProps {
  mode: SidePanelMode;
  selectedComponent: KubeComponent | null;
  onClose: () => void;
}

export function SidePanel({ mode, selectedComponent, onClose }: SidePanelProps) {
  if (!mode) return null;

  return (
    <div className="w-80 border-l flex flex-col overflow-hidden"
      style={{ background: '#0c1018', borderColor: '#1e293b' }}>
      {/* Header */}
      <div className="h-10 flex items-center justify-between px-4 border-b shrink-0"
        style={{ borderColor: '#1e293b' }}>
        <span className="text-xs font-medium" style={{ color: '#94a3b8' }}>
          {mode === 'component' ? '컴포넌트 상세' : '알럿'}
        </span>
        <button onClick={onClose} className="p-1 rounded transition-colors hover:bg-[#1e293b]"
          style={{ color: '#64748b' }}>
          <X size={14} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {mode === 'component' && selectedComponent && (
          <ComponentDetail component={selectedComponent} />
        )}
        {mode === 'alerts' && <AlertList />}
      </div>
    </div>
  );
}

function ComponentDetail({ component }: { component: KubeComponent }) {
  const statusColor = component.status === 'ok' ? '#4ade80' : '#eab308';
  const statusLabel = component.status === 'ok' ? 'Healthy' : 'Warning';

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start gap-3">
        <span className="text-3xl">{component.icon}</span>
        <div>
          <div className="font-semibold text-sm" style={{ color: '#e2e8f0' }}>{component.name}</div>
          <div className="font-mono text-xs mt-0.5" style={{ color: component.color }}>{component.version}</div>
          <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium"
            style={{ background: `${statusColor}20`, color: statusColor }}>
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Health Score */}
      <div>
        <div className="text-xs mb-1.5" style={{ color: '#64748b' }}>Health Score</div>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold font-mono" style={{ color: '#e2e8f0' }}>{component.healthScore}</span>
          <div className="flex-1">
            <ProgressBar value={component.healthScore} color={component.color} height={6} showWarning={false} />
          </div>
        </div>
      </div>

      {/* Resource Usage */}
      <div>
        <div className="text-xs mb-2" style={{ color: '#64748b' }}>리소스 사용량</div>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span style={{ color: '#94a3b8' }}>CPU</span>
              <span className="font-mono" style={{ color: '#e2e8f0' }}>{component.cpu}%</span>
            </div>
            <ProgressBar value={component.cpu} color="#eab308" />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span style={{ color: '#94a3b8' }}>Memory</span>
              <span className="font-mono" style={{ color: '#e2e8f0' }}>{component.mem}%</span>
            </div>
            <ProgressBar value={component.mem} color="#ef4444" />
          </div>
        </div>
      </div>

      {/* Ontology Relations */}
      <div>
        <div className="text-xs mb-2" style={{ color: '#64748b' }}>온톨로지 관계</div>
        <div className="space-y-2 text-xs">
          {component.dependsOn.length > 0 && (
            <div className="p-2 rounded" style={{ background: '#0f172a' }}>
              <span style={{ color: '#64748b' }}>DEPENDS_ON →</span>{' '}
              <span style={{ color: '#94a3b8' }}>{component.dependsOn.join(', ')}</span>
            </div>
          )}
          <div className="p-2 rounded" style={{ background: '#0f172a' }}>
            <span style={{ color: '#64748b' }}>COMPATIBLE →</span>{' '}
            <span style={{ color: '#94a3b8' }}>{component.compatibleWith}</span>
          </div>
          {component.managedBy && (
            <div className="p-2 rounded" style={{ background: '#0f172a' }}>
              <span style={{ color: '#64748b' }}>MANAGED_BY →</span>{' '}
              <span style={{ color: '#94a3b8' }}>{component.managedBy}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        {['📋 로그', '⚙️ 설정', '🤖 Agent'].map(label => (
          <button key={label} className="flex-1 px-2 py-1.5 rounded text-xs font-medium border transition-colors"
            style={{ background: '#0f172a', borderColor: '#1e293b', color: '#94a3b8' }}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function AlertList() {
  const severityColor = { critical: '#ef4444', warning: '#eab308', info: '#64748b' };

  return (
    <div className="space-y-2">
      {alerts.map(alert => (
        <div key={alert.id} className="rounded overflow-hidden"
          style={{ background: '#0f172a' }}>
          <div className="flex" style={{ borderLeft: `3px solid ${severityColor[alert.severity]}` }}>
            <div className="flex-1 p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-1.5 py-0.5 rounded text-xs font-medium"
                  style={{
                    background: `${severityColor[alert.severity]}20`,
                    color: severityColor[alert.severity],
                  }}>
                  {alert.severity}
                </span>
                <span className="text-xs font-mono" style={{ color: '#64748b' }}>{alert.time}</span>
                <span className="px-1.5 py-0.5 rounded text-xs"
                  style={{
                    background: alert.status === 'firing' ? '#ef444420' : '#4ade8020',
                    color: alert.status === 'firing' ? '#ef4444' : '#4ade80',
                  }}>
                  {alert.status}
                </span>
              </div>
              <div className="text-xs leading-relaxed" style={{ color: '#94a3b8' }}>
                {alert.message}
              </div>
              {alert.status === 'firing' && (
                <button className="mt-2 px-2 py-1 rounded text-xs font-medium transition-colors"
                  style={{ background: '#7c3aed20', color: '#a78bfa' }}>
                  🤖 Agent 분석
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
