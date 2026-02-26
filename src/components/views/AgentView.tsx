import { useState } from 'react';
import { Cpu, Wrench } from 'lucide-react';
import { agentProfiles, sampleAgentChat } from '../../data/agents';
import { ChatPanel } from '../shared/ChatPanel';

export function AgentView() {
  const [selectedAgent, setSelectedAgent] = useState('incident');
  const agent = agentProfiles.find((a) => a.id === selectedAgent)!;

  return (
    <div className="flex h-full">
      {/* Agent Selector */}
      <div className="w-[260px] shrink-0 border-r border-border bg-bg-secondary flex flex-col">
        <div className="px-4 py-3 border-b border-border">
          <div className="text-[13px] font-bold text-text-primary flex items-center gap-2">
            <Cpu size={14} className="text-accent-pink" />
            Agent Profiles
          </div>
          <div className="text-[10px] text-text-muted mt-0.5">kagent + MCP 기반 AI Agent</div>
        </div>

        <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
          {agentProfiles.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelectedAgent(a.id)}
              className={`w-full text-left p-3 rounded-xl border transition-all ${
                selectedAgent === a.id
                  ? 'border-accent-purple/40 bg-accent-purple/10'
                  : 'border-border bg-bg-primary hover:border-border-hover'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{a.icon}</span>
                <span className="text-[11px] font-bold text-text-primary">{a.name}</span>
              </div>
              <div className="text-[9px] text-text-secondary leading-relaxed">{a.desc}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {a.mcpTools.map((t) => (
                  <span key={t} className="text-[7px] font-mono px-1.5 py-0.5 rounded bg-bg-secondary border border-border text-text-muted">{t}</span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* MCP Status */}
        <div className="p-3 border-t border-border">
          <div className="text-[10px] font-bold text-text-muted mb-1.5 flex items-center gap-1">
            <Wrench size={10} /> MCP Servers
          </div>
          <div className="grid grid-cols-2 gap-1">
            {['Ontology', 'Prometheus', 'OpenSearch', 'Airflow', 'Spark', 'ArgoCD', 'Version'].map((mcp) => (
              <div key={mcp} className="flex items-center gap-1.5 text-[8px] text-text-secondary">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                {mcp}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Agent Header */}
        <div className="px-4 py-3 border-b border-border bg-bg-secondary/50 flex items-center gap-3">
          <span className="text-xl">{agent.icon}</span>
          <div>
            <div className="text-[13px] font-bold text-text-primary">{agent.name} Agent</div>
            <div className="text-[10px] text-text-muted">{agent.desc}</div>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span className="text-[9px] font-mono text-accent-green">Active</span>
          </div>
        </div>

        {/* Chat */}
        <ChatPanel
          messages={sampleAgentChat}
          placeholder={`${agent.name} Agent에게 질문하세요...`}
        />
      </div>
    </div>
  );
}
