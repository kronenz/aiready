import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cpuChartData, memChartData } from '../../data/chartData';
import { components } from '../../data/components';
import { ProgressBar } from '../common/ProgressBar';
import type { KubeComponent } from '../../types';

interface MonitoringTabProps {
  onComponentSelect: (component: KubeComponent) => void;
}

const summaryCards = [
  { label: 'Nodes', value: '52', sub: '2 NotReady', icon: '☸️', color: '#3b82f6' },
  { label: 'Total Pods', value: '847', sub: '12 Pending', icon: '📦', color: '#4ade80' },
  { label: 'Avg CPU', value: '42%', sub: '+3% vs 24h', icon: '⚡', color: '#eab308' },
  { label: 'Avg Memory', value: '58%', sub: '+1% vs 24h', icon: '💾', color: '#ef4444' },
];

export function MonitoringTab({ onComponentSelect }: MonitoringTabProps) {
  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-3">
        {summaryCards.map(card => (
          <div key={card.label} className="rounded-lg p-4 border"
            style={{ background: '#0f172a', borderColor: '#1e293b' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs" style={{ color: '#64748b' }}>{card.label}</span>
              <span className="text-lg">{card.icon}</span>
            </div>
            <div className="text-2xl font-bold font-mono" style={{ color: card.color }}>
              {card.value}
            </div>
            <div className="text-xs mt-1 font-mono" style={{ color: '#64748b' }}>
              {card.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-3">
        <ChartCard title="CPU 사용률 24h" data={cpuChartData} color="#eab308" />
        <ChartCard title="Memory 사용률 24h" data={memChartData} color="#ef4444" />
      </div>

      {/* Health Grid */}
      <div>
        <h3 className="text-xs font-medium mb-3" style={{ color: '#94a3b8' }}>
          컴포넌트 Health
        </h3>
        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
          {components.map(comp => (
            <button key={comp.id}
              onClick={() => onComponentSelect(comp)}
              className="rounded-lg p-3 border text-left transition-all hover:border-[#334155]"
              style={{ background: '#0f172a', borderColor: '#1e293b' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">{comp.icon}</span>
                <span className="text-xs font-semibold" style={{ color: '#e2e8f0' }}>{comp.name}</span>
                <span className="font-mono" style={{ fontSize: '9px', color: comp.color }}>{comp.version}</span>
                <span className="ml-auto w-2 h-2 rounded-full"
                  style={{ background: comp.status === 'ok' ? '#4ade80' : '#eab308' }} />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs w-8" style={{ color: '#64748b', fontSize: '9px' }}>CPU</span>
                  <div className="flex-1"><ProgressBar value={comp.cpu} height={4} /></div>
                  <span className="font-mono w-8 text-right" style={{ fontSize: '9px', color: '#94a3b8' }}>{comp.cpu}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs w-8" style={{ color: '#64748b', fontSize: '9px' }}>MEM</span>
                  <div className="flex-1"><ProgressBar value={comp.mem} height={4} /></div>
                  <span className="font-mono w-8 text-right" style={{ fontSize: '9px', color: '#94a3b8' }}>{comp.mem}%</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, data, color }: { title: string; data: { time: string; value: number }[]; color: string }) {
  return (
    <div className="rounded-lg p-4 border" style={{ background: '#0f172a', borderColor: '#1e293b' }}>
      <h4 className="text-xs font-medium mb-3" style={{ color: '#94a3b8' }}>{title}</h4>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="time" tick={{ fontSize: 9, fill: '#64748b' }} tickLine={false} axisLine={false} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#64748b' }} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} />
          <Tooltip
            contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, fontSize: 11 }}
            labelStyle={{ color: '#94a3b8' }}
            itemStyle={{ color }}
          />
          <Area type="monotone" dataKey="value" stroke={color} fill={`${color}20`} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
