interface FlowNodeData {
  icon: string;
  label: string;
  tech: string;
  borderColor: string;
  textColor?: string;
}

interface FlowPipeProps {
  nodes: FlowNodeData[];
}

export function FlowPipe({ nodes }: FlowPipeProps) {
  return (
    <div className="flow-pipe">
      {nodes.map((node, i) => (
        <div key={i} className="flow-node" style={{ borderColor: `${node.borderColor}44`, color: node.textColor }}>
          <div className="fn-icon">{node.icon}</div>
          <div className="fn-label">{node.label}</div>
          <div className="fn-tech">{node.tech}</div>
        </div>
      ))}
    </div>
  );
}
