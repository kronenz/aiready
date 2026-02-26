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
    <Flex direction="column" className="h-full">
      {/* Messages */}
      <ScrollArea scrollbars="vertical" className="flex-1">
        <Flex direction="column" gap="3" px="4" py="3">
          {messages.map((msg) => (
            <Box key={msg.id} className="anim-fade">
              {msg.role === 'user' && (
                <Flex justify="end">
                  <Card size="1" variant="surface" style={{ maxWidth: '85%', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '14px 14px 4px 14px' }}>
                    <Text size="1" style={{ color: 'var(--color-text-primary)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{msg.content}</Text>
                    <Text size="1" className="font-mono" style={{ color: 'var(--color-text-muted)', fontSize: 9, display: 'block', textAlign: 'right', marginTop: 4 }}>{msg.timestamp}</Text>
                  </Card>
                </Flex>
              )}

              {msg.role === 'tool' && (
                <Box ml="1">
                  <Flex align="center" gap="1" mb="1">
                    <Wrench size={10} style={{ color: 'var(--color-accent-cyan)' }} />
                    <Code size="1" color="cyan" variant="ghost" style={{ fontSize: 9 }}>{msg.toolName}</Code>
                  </Flex>
                  {msg.toolResult && (
                    <Card size="1" variant="surface" style={{ background: 'var(--color-bg-primary)', border: '1px solid var(--color-border)' }}>
                      <Text size="1" className="font-mono" style={{ color: 'var(--color-text-secondary)', whiteSpace: 'pre-wrap', lineHeight: 1.7, fontSize: 10 }}>{msg.toolResult}</Text>
                    </Card>
                  )}
                </Box>
              )}

              {msg.role === 'assistant' && (
                <Flex justify="start">
                  <Card size="1" variant="surface" style={{ maxWidth: '90%', background: 'rgba(17,24,39,0.5)', border: '1px solid var(--color-border)', borderRadius: '14px 14px 14px 4px' }}>
                    <Text size="1" style={{ color: 'var(--color-text-primary)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{msg.content}</Text>
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
          <Box className="flex-1">
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
          <IconButton size="2" variant="soft" color="violet" radius="large" onClick={handleSend}>
            <Send size={14} />
          </IconButton>
        </Flex>
      </Box>
    </Flex>
  );
}
