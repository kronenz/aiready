import { useState, useCallback, useRef, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import { Send } from 'lucide-react';
import { CustomNode } from '../topology/CustomNode';
import { buildNodes, buildEdges } from '../topology/topologyConfig';
import { componentMap } from '../../data/components';
import type { KubeComponent, ChatMessage } from '../../types';

const nodeTypes = { custom: CustomNode };
const initialNodes = buildNodes();
const initialEdges = buildEdges();

const DATA_KEYWORDS = ['빅데이터', 'spark', 'kafka', '데이터', '파이프라인', 'data', 'pipeline', '스트리밍', 'streaming', '분석', 'analytics'];

const DATA_RESPONSE = `✅ 요구사항 분석 완료

POST /api/v1/resolve 실행 결과:

해결된 컴포넌트 (14개):
• Kubernetes 1.30 · Cilium · MetalLB · Rook-Ceph
• Kafka (Strimzi) → Spark → Iceberg → MinIO
• Trino (SQL 쿼리 엔진)
• Airflow (오케스트레이션)
• Prometheus + Thanos + Grafana (모니터링)
• Fluent Bit + OpenSearch (로깅)

자동 추가된 암시적 의존성:
• Hive Metastore 3.1.3 ← Iceberg 카탈로그
• PostgreSQL 16 ← Hive Metastore 백엔드
• MinIO ← Thanos 장기 보관 (50노드 규칙)

리소스 예상: CPU 380core / Memory 920Gi / Storage 45TB

토폴로지가 캔버스에 반영되었습니다.
💡 대안: "Mimir + Loki로 변경"하면 Option B를 생성합니다.`;

const DEFAULT_RESPONSE = `요구사항을 분석했습니다. 더 구체적인 내용을 알려주시면 최적 아키텍처를 설계해 드리겠습니다.

다음 정보를 포함하면 더 정확한 설계가 가능합니다:
• 워크로드 유형 (데이터 파이프라인, ML, 웹서비스 등)
• 예상 트래픽 / 데이터 볼륨
• 필수 컴포넌트 또는 기술 스택 선호도
• 가용성 / 보안 요구사항`;

interface TopologyTabProps {
  onNodeSelect: (component: KubeComponent) => void;
}

export function TopologyTab({ onNodeSelect }: TopologyTabProps) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(() => {
    if (!input.trim() || isTyping) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    const isDataRelated = DATA_KEYWORDS.some(kw => userMsg.toLowerCase().includes(kw));
    const delay = isDataRelated ? 2500 : 1500;

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'ai',
        content: isDataRelated ? DATA_RESPONSE : DEFAULT_RESPONSE,
      }]);
      setIsTyping(false);
    }, delay);
  }, [input, isTyping]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: { id: string }) => {
    const comp = componentMap.get(node.id);
    if (comp) onNodeSelect(comp);
  }, [onNodeSelect]);

  return (
    <div className="flex h-full">
      {/* Chat Panel */}
      <div className="w-80 border-r flex flex-col shrink-0"
        style={{ background: '#0c1018', borderColor: '#1e293b' }}>
        <div className="p-3 border-b text-xs font-medium"
          style={{ borderColor: '#1e293b', color: '#94a3b8' }}>
          🏗️ 설계 채팅
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <span className="text-4xl mb-3">🏗️</span>
              <p className="text-xs leading-relaxed mb-4" style={{ color: '#64748b' }}>
                요구사항을 자연어로 입력하면 AI가 온톨로지를 기반으로 최적 아키텍처를 설계합니다
              </p>
              <div className="w-full space-y-2">
                {[
                  '실시간 빅데이터 파이프라인 구축해줘',
                  'ML 학습 플랫폼 설계해줘',
                  '마이크로서비스 기본 인프라 구성',
                ].map(example => (
                  <button key={example} onClick={() => setInput(example)}
                    className="w-full text-left px-3 py-2 rounded text-xs transition-colors"
                    style={{ background: '#0f172a', border: '1px solid #1e293b', color: '#94a3b8' }}>
                    "{example}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[90%] px-3 py-2 rounded-lg text-xs whitespace-pre-wrap leading-relaxed"
                style={{
                  background: msg.role === 'user' ? '#7c3aed30' : '#0f172a',
                  color: msg.role === 'user' ? '#e2e8f0' : '#94a3b8',
                  border: msg.role === 'user' ? '1px solid #7c3aed50' : '1px solid #1e293b',
                  fontFamily: msg.role === 'ai' ? "'JetBrains Mono', monospace" : 'inherit',
                  fontSize: msg.role === 'ai' ? '10px' : '12px',
                }}>
                {msg.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="px-3 py-2 rounded-lg text-xs"
                style={{ background: '#0f172a', border: '1px solid #1e293b', color: '#64748b' }}>
                <span className="animate-pulse">AI가 온톨로지를 분석하고 있습니다...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t" style={{ borderColor: '#1e293b' }}>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="요구사항을 입력하세요..."
              className="flex-1 px-3 py-2 rounded text-xs outline-none"
              style={{
                background: '#0f172a',
                border: '1px solid #1e293b',
                color: '#e2e8f0',
              }}
            />
            <button onClick={handleSend}
              className="p-2 rounded transition-colors"
              style={{ background: '#7c3aed', color: 'white' }}>
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.3}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#1e293b" gap={20} size={1} />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              const data = node.data as { color?: string };
              return data?.color || '#334155';
            }}
            maskColor="rgba(6, 9, 15, 0.8)"
          />
        </ReactFlow>

        {/* View toggle buttons */}
        <div className="absolute top-3 right-3 flex gap-1 z-10">
          {['계층 뷰', '데이터 플로우', '의존성'].map((label, i) => (
            <button key={label}
              className="px-2.5 py-1 rounded text-xs font-medium border transition-colors"
              style={{
                background: i === 0 ? 'rgba(167, 139, 250, 0.15)' : '#0f172a',
                borderColor: i === 0 ? 'rgba(167, 139, 250, 0.4)' : '#1e293b',
                color: i === 0 ? '#a78bfa' : '#64748b',
              }}>
              {label}
            </button>
          ))}
        </div>

        {/* Provision button */}
        <button className="absolute bottom-6 right-6 px-4 py-2.5 rounded-lg text-xs font-semibold z-10 transition-all"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
            color: 'white',
            boxShadow: '0 4px 20px rgba(124, 58, 237, 0.4)',
          }}>
          ▶ 이 아키텍처로 프로비저닝
        </button>
      </div>
    </div>
  );
}
