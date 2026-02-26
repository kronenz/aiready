import { Bell } from 'lucide-react';
import type { TabId } from '../types';
import { alerts } from '../data/alerts';

interface TopBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onAlertClick: () => void;
}

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'topology', label: '토폴로지 설계', icon: '🗺️' },
  { id: 'monitoring', label: '모니터링', icon: '📊' },
  { id: 'versions', label: '버전 관리', icon: '🔄' },
  { id: 'agent', label: 'AI Agent', icon: '🤖' },
  { id: 'deploy', label: '배포 로그', icon: '🚀' },
];

export function TopBar({ activeTab, onTabChange, onAlertClick }: TopBarProps) {
  const firingCount = alerts.filter(a => a.status === 'firing').length;

  return (
    <div className="h-12 flex items-center justify-between px-4 border-b"
      style={{ background: '#0c1018', borderColor: '#1e293b' }}>
      {/* Left: Logo + Tabs */}
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-2 mr-6">
          <span className="text-lg">🧬</span>
          <span className="font-bold text-sm font-mono"
            style={{
              background: 'linear-gradient(135deg, #a78bfa, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
            KubeForge
          </span>
        </div>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all duration-150 border"
            style={{
              background: activeTab === tab.id ? 'rgba(167, 139, 250, 0.15)' : 'transparent',
              borderColor: activeTab === tab.id ? 'rgba(167, 139, 250, 0.4)' : 'transparent',
              color: activeTab === tab.id ? '#a78bfa' : '#94a3b8',
            }}
          >
            <span className="text-xs">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Right: Cluster info + Alert bell */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 rounded text-xs font-mono"
          style={{ background: '#0f172a', border: '1px solid #1e293b' }}>
          <span>☸️</span>
          <span style={{ color: '#94a3b8' }}>prod-cluster-01</span>
          <span style={{ color: '#4ade80' }}>●</span>
          <span style={{ color: '#64748b' }}>52 nodes</span>
        </div>
        <button
          onClick={onAlertClick}
          className="relative p-1.5 rounded transition-colors"
          style={{ color: '#94a3b8' }}
        >
          <Bell size={16} />
          {firingCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white font-bold"
              style={{ background: '#ef4444', fontSize: '9px' }}>
              {firingCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
