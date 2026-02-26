import { useState, useRef, useEffect, useCallback } from 'react';
import { Send } from 'lucide-react';
import { agents, mcpServers, agentChatMessages } from '../../data/agents';
import type { ChatMessage } from '../../types';

export function AgentTab() {
  const [selectedAgent, setSelectedAgent] = useState('incident');
  const [messages, setMessages] = useState<ChatMessage[]>(agentChatMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(() => {
    if (!input.trim() || isTyping) return;
    setMessages(prev => [...prev, { role: 'user', content: input.trim() }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'ai',
        content: `📡 MCP 서버를 통해 분석 중입니다...

🔍 Ontology MCP → 관련 컴포넌트 탐색
🔥 Prometheus MCP → 메트릭 수집
📝 OpenSearch MCP → 로그 분석

분석이 완료되면 결과를 알려드리겠습니다.`,
      }]);
      setIsTyping(false);
    }, 2000);
  }, [input, isTyping]);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-52 border-r flex flex-col shrink-0"
        style={{ background: '#0c1018', borderColor: '#1e293b' }}>
        {/* Agents */}
        <div className="p-3 border-b" style={{ borderColor: '#1e293b' }}>
          <div className="text-xs font-medium mb-2" style={{ color: '#64748b' }}>에이전트</div>
          <div className="space-y-1">
            {agents.map(agent => (
              <button key={agent.id}
                onClick={() => setSelectedAgent(agent.id)}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-left transition-colors"
                style={{
                  background: selectedAgent === agent.id ? '#1e1b4b' : 'transparent',
                  border: selectedAgent === agent.id ? '1px solid rgba(167, 139, 250, 0.3)' : '1px solid transparent',
                }}>
                <span className="text-sm">{agent.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate" style={{ color: '#e2e8f0' }}>{agent.name}</div>
                  <div className="truncate" style={{ fontSize: '9px', color: '#64748b' }}>{agent.description}</div>
                </div>
                <span className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: (selectedAgent === agent.id || agent.status === 'active') ? '#4ade80' : '#475569' }} />
              </button>
            ))}
          </div>
        </div>

        {/* MCP */}
        <div className="p-3 border-b" style={{ borderColor: '#1e293b' }}>
          <div className="text-xs font-medium mb-2" style={{ color: '#64748b' }}>MCP 서버</div>
          <div className="space-y-1">
            {mcpServers.map(s => (
              <div key={s.id} className="flex items-center gap-2 px-1 py-0.5">
                <span className="text-xs">{s.icon}</span>
                <span className="text-xs" style={{ color: '#94a3b8' }}>{s.name}</span>
                <span className="ml-auto w-1.5 h-1.5 rounded-full"
                  style={{ background: s.connected ? '#4ade80' : '#ef4444' }} />
              </div>
            ))}
          </div>
        </div>

        {/* LLM */}
        <div className="p-3">
          <div className="text-xs font-medium mb-2" style={{ color: '#64748b' }}>LLM 런타임</div>
          <div className="flex items-center gap-2 px-1">
            <span className="text-xs">🧠</span>
            <span className="text-xs" style={{ color: '#94a3b8' }}>Ollama · llama3.1:70b</span>
            <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#4ade80' }} />
          </div>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        <div className="h-10 flex items-center px-4 border-b shrink-0"
          style={{ borderColor: '#1e293b' }}>
          <span className="text-sm mr-2">🚨</span>
          <span className="text-xs font-semibold" style={{ color: '#e2e8f0' }}>Incident Response Agent</span>
          <span className="ml-2 w-2 h-2 rounded-full" style={{ background: '#4ade80' }} />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[85%] px-3 py-2.5 rounded-lg text-xs whitespace-pre-wrap leading-relaxed"
                style={{
                  background: msg.role === 'user' ? '#7c3aed30' : '#0f172a',
                  color: msg.role === 'user' ? '#e2e8f0' : '#94a3b8',
                  border: msg.role === 'user' ? '1px solid #7c3aed50' : '1px solid #1e293b',
                  fontFamily: msg.role === 'ai' ? "'JetBrains Mono', monospace" : 'inherit',
                  fontSize: msg.role === 'ai' ? '11px' : '12px',
                }}>
                {msg.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="px-3 py-2 rounded-lg text-xs"
                style={{ background: '#0f172a', border: '1px solid #1e293b', color: '#64748b' }}>
                <span className="animate-pulse">Agent가 MCP 서버를 통해 분석 중...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-3 border-t" style={{ borderColor: '#1e293b' }}>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Agent에게 질문하세요..."
              className="flex-1 px-3 py-2 rounded text-xs outline-none"
              style={{ background: '#0f172a', border: '1px solid #1e293b', color: '#e2e8f0' }}
            />
            <button onClick={handleSend}
              className="p-2 rounded transition-colors"
              style={{ background: '#7c3aed', color: 'white' }}>
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
