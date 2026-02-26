import { useState } from 'react';
import { ArrowUpCircle, AlertTriangle, CheckCircle, Clock, Shield, ChevronRight, RefreshCw } from 'lucide-react';
import { versionData, driftData, upgradePathExample, type VersionInfo } from '../../data/versions';

type OpsTab = 'versions' | 'upgrade' | 'drift';

const statusBadge: Record<VersionInfo['status'], { bg: string; text: string; label: string }> = {
  'up-to-date': { bg: 'bg-accent-green/15', text: 'text-accent-green', label: 'Up to date' },
  'update-available': { bg: 'bg-accent-blue/15', text: 'text-accent-blue', label: 'Update' },
  'critical-update': { bg: 'bg-accent-red/15', text: 'text-accent-red', label: 'Critical' },
  'eol-warning': { bg: 'bg-accent-orange/15', text: 'text-accent-orange', label: 'EOL' },
};

export function OperationsView() {
  const [tab, setTab] = useState<OpsTab>('versions');

  const updates = versionData.filter(v => v.status !== 'up-to-date').length;

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="flex items-center border-b border-border px-4 shrink-0">
        {[
          { id: 'versions' as const, label: 'Version Tracker', icon: ArrowUpCircle, badge: `${updates} updates` },
          { id: 'upgrade' as const, label: 'Upgrade Path', icon: RefreshCw },
          { id: 'drift' as const, label: 'Drift Detection', icon: Shield, badge: `${driftData.length} drifts` },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-3 text-[11px] font-semibold border-b-2 transition-all ${
              tab === t.id
                ? 'border-accent-purple text-accent-purple'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            <t.icon size={13} />
            {t.label}
            {t.badge && (
              <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded ${
                tab === t.id ? 'bg-accent-purple/20 text-accent-purple' : 'bg-bg-hover text-text-muted'
              }`}>{t.badge}</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {tab === 'versions' && <VersionsTab />}
        {tab === 'upgrade' && <UpgradeTab />}
        {tab === 'drift' && <DriftTab />}
      </div>
    </div>
  );
}

function VersionsTab() {
  return (
    <div className="space-y-3">
      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <SummaryCard label="전체 컴포넌트" value={String(versionData.length)} color="text-text-primary" />
        <SummaryCard label="최신 상태" value={String(versionData.filter(v => v.status === 'up-to-date').length)} color="text-accent-green" />
        <SummaryCard label="업데이트 가능" value={String(versionData.filter(v => v.status === 'update-available').length)} color="text-accent-blue" />
        <SummaryCard label="긴급 업데이트" value={String(versionData.filter(v => v.status === 'critical-update').length)} color="text-accent-red" />
      </div>

      {/* Table */}
      <div className="bg-bg-secondary border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-[10px] font-mono font-bold text-text-muted px-4 py-2.5">Component</th>
              <th className="text-left text-[10px] font-mono font-bold text-text-muted px-4 py-2.5">Current</th>
              <th className="text-left text-[10px] font-mono font-bold text-text-muted px-4 py-2.5">Latest</th>
              <th className="text-left text-[10px] font-mono font-bold text-text-muted px-4 py-2.5">Status</th>
              <th className="text-left text-[10px] font-mono font-bold text-text-muted px-4 py-2.5">Note</th>
            </tr>
          </thead>
          <tbody>
            {versionData.map((v) => {
              const badge = statusBadge[v.status];
              return (
                <tr key={v.component} className="border-b border-border/50 hover:bg-bg-hover/30 transition-colors">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{v.icon}</span>
                      <div>
                        <div className="text-[11px] font-bold text-text-primary">{v.component}</div>
                        <div className="text-[9px] text-text-muted">{v.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-text-secondary">{v.current}</td>
                  <td className="px-4 py-2.5 font-mono text-[11px]">
                    <span className={v.current !== v.latest ? 'text-accent-blue font-bold' : 'text-text-secondary'}>{v.latest}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded ${badge.bg} ${badge.text}`}>
                      {badge.label}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-[10px] text-text-muted max-w-[200px]">{v.changelog || '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UpgradeTab() {
  return (
    <div className="space-y-4">
      <div className="bg-bg-secondary border border-border rounded-xl p-4">
        <div className="text-[13px] font-bold text-text-primary mb-1">Spark 3.5.3 → 3.6.0 업그레이드 시뮬레이션</div>
        <div className="text-[10px] text-text-muted mb-4">온톨로지 기반 자동 경로 계산 · 예상 다운타임 15분 · 롤백 가능</div>

        <div className="space-y-2">
          {upgradePathExample.map((step) => (
            <div key={step.order} className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
              step.status === 'done' ? 'bg-accent-green/5 border-accent-green/20' :
              step.status === 'in-progress' ? 'bg-accent-blue/10 border-accent-blue/30' :
              'bg-bg-primary border-border'
            }`}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0" style={{
                background: step.status === 'done' ? '#4ade8020' : step.status === 'in-progress' ? '#38bdf820' : '#1e293b',
                color: step.status === 'done' ? '#4ade80' : step.status === 'in-progress' ? '#38bdf8' : '#64748b',
              }}>
                {step.order}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-bg-hover text-text-secondary">{step.action}</span>
                  <span className="text-[11px] font-bold text-text-primary">{step.component}</span>
                  <ChevronRight size={10} className="text-text-muted" />
                  <span className="text-[10px] text-text-secondary">{step.detail}</span>
                </div>
              </div>
              <div>
                {step.status === 'done' && <CheckCircle size={14} className="text-accent-green" />}
                {step.status === 'in-progress' && <Clock size={14} className="text-accent-blue animate-pulse" />}
                {step.status === 'pending' && <Circle size={14} className="text-text-muted" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Circle({ size, className }: { size: number; className?: string }) {
  return <div className={`rounded-full border-2 ${className}`} style={{ width: size, height: size, borderColor: 'currentColor' }} />;
}

function DriftTab() {
  return (
    <div className="space-y-4">
      <div className="bg-accent-red/5 border border-accent-red/20 rounded-xl p-4">
        <div className="text-[12px] font-bold text-accent-red flex items-center gap-2 mb-1">
          <AlertTriangle size={14} />
          {driftData.length}건의 드리프트 감지
        </div>
        <div className="text-[10px] text-text-secondary">실제 클러스터 상태 vs Git 선언 상태 vs 온톨로지 3-way 비교</div>
      </div>

      {driftData.map((d, i) => (
        <div key={i} className={`bg-bg-secondary border rounded-xl p-4 ${
          d.severity === 'critical' ? 'border-accent-red/30' : 'border-accent-gold/30'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle size={12} className={d.severity === 'critical' ? 'text-accent-red' : 'text-accent-gold'} />
              <span className="text-[12px] font-bold text-text-primary">{d.component}</span>
              <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded ${
                d.severity === 'critical' ? 'bg-accent-red/15 text-accent-red' : 'bg-accent-gold/15 text-accent-gold'
              }`}>{d.severity.toUpperCase()}</span>
            </div>
            <span className="text-[9px] font-mono text-text-muted">{d.detected}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-bg-primary rounded-lg p-2 border border-border">
              <div className="text-[8px] text-text-muted mb-0.5">Field</div>
              <div className="text-[10px] font-mono font-bold text-text-primary">{d.field}</div>
            </div>
            <div className="bg-bg-primary rounded-lg p-2 border border-accent-green/20">
              <div className="text-[8px] text-accent-green mb-0.5">Expected (Git)</div>
              <div className="text-[10px] font-mono font-bold text-accent-green">{d.expected}</div>
            </div>
            <div className="bg-bg-primary rounded-lg p-2 border border-accent-red/20">
              <div className="text-[8px] text-accent-red mb-0.5">Actual (Cluster)</div>
              <div className="text-[10px] font-mono font-bold text-accent-red">{d.actual}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SummaryCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-bg-secondary border border-border rounded-xl p-3 text-center">
      <div className={`text-xl font-bold font-mono ${color}`}>{value}</div>
      <div className="text-[9px] text-text-muted mt-0.5">{label}</div>
    </div>
  );
}
