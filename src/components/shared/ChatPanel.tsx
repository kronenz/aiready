import { useState } from 'react';
import { Send, Wrench } from 'lucide-react';
import type { ChatMessage } from '../../data/agents';

interface ChatPanelProps {
  messages: ChatMessage[];
  placeholder?: string;
  onSend?: (msg: string) => void;
}

export function ChatPanel({ messages, placeholder = '메시지를 입력하세요...', onSend }: ChatPanelProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && onSend) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="anim-fade">
            {msg.role === 'user' && (
              <div className="flex justify-end">
                <div className="max-w-[85%] bg-accent-purple/15 border border-accent-purple/20 rounded-xl rounded-br-sm px-3.5 py-2.5">
                  <div className="text-[12px] text-text-primary leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                  <div className="text-[9px] text-text-muted mt-1 font-mono text-right">{msg.timestamp}</div>
                </div>
              </div>
            )}

            {msg.role === 'tool' && (
              <div className="ml-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <Wrench size={10} className="text-accent-cyan" />
                  <span className="text-[9px] font-mono text-accent-cyan">{msg.toolName}</span>
                </div>
                {msg.toolResult && (
                  <div className="bg-bg-primary border border-border rounded-lg px-3 py-2 text-[10px] font-mono text-text-secondary whitespace-pre-wrap leading-relaxed">
                    {msg.toolResult}
                  </div>
                )}
              </div>
            )}

            {msg.role === 'assistant' && (
              <div className="flex justify-start">
                <div className="max-w-[90%] bg-bg-tertiary/50 border border-border rounded-xl rounded-bl-sm px-3.5 py-2.5">
                  <div className="text-[12px] text-text-primary leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                  <div className="text-[9px] text-text-muted mt-1 font-mono">{msg.timestamp}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-3 py-2.5 border-t border-border">
        <div className="flex items-center gap-2 bg-bg-primary border border-border rounded-xl px-3 py-2 focus-within:border-accent-purple/50 transition-colors">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-[12px] text-text-primary placeholder:text-text-muted outline-none"
          />
          <button
            onClick={handleSend}
            className="p-1.5 rounded-lg bg-accent-purple/20 text-accent-purple hover:bg-accent-purple/30 transition-colors"
          >
            <Send size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
