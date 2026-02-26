import { useState } from 'react';
import { Flex, Box, Text, Card, IconButton, ScrollArea, TextField, Code } from '@radix-ui/themes';
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
    <Flex direction="column" className="h-full" style={{ minWidth: 0 }}>
      {/* Messages */}
      <ScrollArea scrollbars="vertical" className="flex-1">
        <Flex direction="column" gap="3" px="4" py="3" style={{ minWidth: 0 }}>
          {messages.map((msg) => (
            <Box key={msg.id} className="anim-fade" style={{ minWidth: 0 }}>
              {msg.role === 'user' && (
                <Flex justify="end" style={{ minWidth: 0 }}>
                  <Card size="1" variant="surface" style={{ maxWidth: '85%', minWidth: 0, background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '14px 14px 4px 14px', overflow: 'hidden' }}>
                    <Text size="1" style={{ color: 'var(--color-text-primary)', lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'break-word' }}>{msg.content}</Text>
                    <Text size="1" className="font-mono" style={{ color: 'var(--color-text-muted)', fontSize: 9, display: 'block', textAlign: 'right', marginTop: 4 }}>{msg.timestamp}</Text>
                  </Card>
                </Flex>
              )}

              {msg.role === 'tool' && (
                <Box style={{ minWidth: 0 }} ml="1">
                  <Flex align="center" gap="1" mb="1" style={{ minWidth: 0 }}>
                    <Wrench size={10} style={{ color: 'var(--color-accent-cyan)', flexShrink: 0 }} />
                    <Code size="1" color="cyan" variant="ghost" style={{ fontSize: 9, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', minWidth: 0 }}>{msg.toolName}</Code>
                  </Flex>
                  {msg.toolResult && (
                    <Card size="1" variant="surface" style={{ background: '#f8fafc', border: '1px solid var(--color-border)', overflow: 'hidden', minWidth: 0 }}>
                      <Text size="1" className="font-mono" style={{ color: 'var(--color-text-secondary)', whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'break-word', lineHeight: 1.7, fontSize: 10 }}>{msg.toolResult}</Text>
                    </Card>
                  )}
                </Box>
              )}

              {msg.role === 'assistant' && (
                <Flex justify="start" style={{ minWidth: 0 }}>
                  <Card size="1" variant="surface" style={{ maxWidth: '90%', minWidth: 0, background: '#f8fafc', border: '1px solid var(--color-border)', borderRadius: '14px 14px 14px 4px', overflow: 'hidden' }}>
                    <Text size="1" style={{ color: 'var(--color-text-primary)', lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'break-word' }}>{msg.content}</Text>
                    <Text size="1" className="font-mono" style={{ color: 'var(--color-text-muted)', fontSize: 9, display: 'block', marginTop: 4 }}>{msg.timestamp}</Text>
                  </Card>
                </Flex>
              )}
            </Box>
          ))}
        </Flex>
      </ScrollArea>

      {/* Input */}
      <Box px="3" py="3" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Flex align="center" gap="2">
          <Box className="flex-1" style={{ minWidth: 0 }}>
            <TextField.Root
              size="2"
              variant="surface"
              placeholder={placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              radius="large"
            />
          </Box>
          <IconButton size="2" variant="soft" color="violet" radius="large" onClick={handleSend} style={{ flexShrink: 0 }}>
            <Send size={14} />
          </IconButton>
        </Flex>
      </Box>
    </Flex>
  );
}
