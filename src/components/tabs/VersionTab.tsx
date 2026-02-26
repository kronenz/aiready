import { versionUpdates, compatibilityMatrix, upgradeSteps } from '../../data/versions';
import { ArrowRight } from 'lucide-react';

export function VersionTab() {
  return (
    <div className="h-full overflow-y-auto p-4 space-y-5">
      {/* Update List */}
      <div>
        <h3 className="text-xs font-medium mb-3" style={{ color: '#94a3b8' }}>업데이트 현황</h3>
        <div className="space-y-2">
          {versionUpdates.map(v => (
            <div key={v.id} className="flex items-center gap-3 rounded-lg p-3 border"
              style={{ background: '#0f172a', borderColor: '#1e293b' }}>
              <span className="text-lg">{v.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold" style={{ color: '#e2e8f0' }}>{v.name}</span>
                  <span className="font-mono text-xs" style={{ color: '#64748b' }}>
                    {v.currentVersion}
                  </span>
                  <ArrowRight size={12} style={{ color: '#64748b' }} />
                  <span className="font-mono text-xs" style={{ color: '#e2e8f0' }}>
                    {v.latestVersion}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-xs font-medium"
                    style={{
                      background: v.compatible ? '#4ade8020' : '#ef444420',
                      color: v.compatible ? '#4ade80' : '#ef4444',
                    }}>
                    {v.compatible ? '호환' : '비호환'}
                  </span>
                  {v.patchOnly && (
                    <span className="px-1.5 py-0.5 rounded text-xs font-medium"
                      style={{ background: '#eab30820', color: '#eab308' }}>
                      PATCH
                    </span>
                  )}
                </div>
                <div className="text-xs mt-1" style={{ color: '#64748b' }}>{v.note}</div>
              </div>
              <div className="text-xs font-mono" style={{ color: '#475569' }}>{v.date}</div>
              <button
                className="px-3 py-1.5 rounded text-xs font-medium transition-colors border"
                style={{
                  background: v.compatible ? '#0f172a' : 'transparent',
                  borderColor: v.compatible ? '#334155' : '#1e293b',
                  color: v.compatible ? '#e2e8f0' : '#475569',
                  cursor: v.compatible ? 'pointer' : 'not-allowed',
                  opacity: v.compatible ? 1 : 0.5,
                }}
                disabled={!v.compatible}
              >
                ↑ 업그레이드 계획
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Compatibility Matrix */}
      <div>
        <h3 className="text-xs font-medium mb-3" style={{ color: '#94a3b8' }}>호환성 매트릭스</h3>
        <div className="rounded-lg border overflow-hidden" style={{ borderColor: '#1e293b' }}>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ minWidth: 700 }}>
              <thead>
                <tr style={{ background: '#0c1018' }}>
                  <th className="p-2 text-left text-xs font-medium border-b"
                    style={{ color: '#64748b', borderColor: '#1e293b' }}></th>
                  {compatibilityMatrix.headers.cols.map(col => (
                    <th key={col} className="p-2 text-center text-xs font-mono font-medium border-b"
                      style={{ color: '#94a3b8', borderColor: '#1e293b' }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compatibilityMatrix.headers.rows.map((row, ri) => (
                  <tr key={row} style={{ background: ri % 2 === 0 ? '#0f172a' : '#0c1018' }}>
                    <td className="p-2 text-xs font-mono font-medium border-b"
                      style={{ color: '#94a3b8', borderColor: '#1e293b' }}>
                      {row}
                    </td>
                    {compatibilityMatrix.data[ri].map((cell, ci) => {
                      const cellColor = cell === '✅' ? '#4ade80' : cell === '❌' ? '#ef4444' : cell === '⚠️' ? '#eab308' : '#475569';
                      return (
                        <td key={ci} className="p-2 text-center text-sm border-b"
                          style={{ borderColor: '#1e293b', color: cellColor }}>
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Upgrade Path */}
      <div>
        <h3 className="text-xs font-medium mb-3" style={{ color: '#94a3b8' }}>
          업그레이드 경로: Spark 3.5.3 → 3.6.0
        </h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {upgradeSteps.map((step, i) => (
            <div key={step.step} className="flex items-center gap-2 shrink-0">
              <div className="rounded-lg p-3 border min-w-[160px]"
                style={{ background: '#0f172a', borderColor: '#1e293b' }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: '#7c3aed30', color: '#a78bfa' }}>
                    {step.step}
                  </span>
                  <span className="text-xs font-medium" style={{ color: '#e2e8f0' }}>{step.title}</span>
                </div>
                <div className="text-xs font-mono" style={{ color: '#64748b' }}>{step.detail}</div>
              </div>
              {i < upgradeSteps.length - 1 && (
                <ArrowRight size={16} style={{ color: '#475569' }} className="shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
