import { Brain, Compass, Rocket, Settings, Bot, LayoutGrid } from 'lucide-react';

export type ViewId = 'design' | 'ontology' | 'provision' | 'ops' | 'agent';

interface SidebarProps {
  active: ViewId;
  onChange: (v: ViewId) => void;
}

const navItems: { id: ViewId; icon: typeof Brain; label: string; badge?: string }[] = [
  { id: 'design', icon: Compass, label: 'Design Studio', badge: '①' },
  { id: 'ontology', icon: Brain, label: 'Ontology', badge: '🧬' },
  { id: 'provision', icon: Rocket, label: 'Provisioning', badge: '②' },
  { id: 'ops', icon: Settings, label: 'Operations', badge: '③' },
  { id: 'agent', icon: Bot, label: 'AI Agent', badge: '④' },
];

export function Sidebar({ active, onChange }: SidebarProps) {
  return (
    <div className="w-[220px] shrink-0 bg-bg-secondary border-r border-border flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center">
            <LayoutGrid size={16} className="text-white" />
          </div>
          <div>
            <div className="text-[15px] font-extrabold text-text-primary tracking-tight">KubeForge</div>
            <div className="text-[9px] font-mono text-text-muted tracking-wider">SOLUTION PLATFORM</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2.5 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all text-[12px] font-semibold ${
                isActive
                  ? 'bg-accent-purple/15 text-accent-purple'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover/50'
              }`}
            >
              <item.icon size={16} strokeWidth={isActive ? 2.5 : 2} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-accent-purple/20 text-accent-purple' : 'bg-bg-hover text-text-muted'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Status */}
      <div className="px-4 py-3 border-t border-border">
        <div className="flex items-center gap-2 text-[10px] text-text-muted">
          <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          <span className="font-mono">prod-cluster-01</span>
        </div>
        <div className="text-[9px] text-text-muted mt-1 font-mono">15 components · 50 nodes</div>
      </div>
    </div>
  );
}
