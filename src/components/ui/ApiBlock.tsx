import type { ReactNode } from 'react';

interface ApiEndpointProps {
  method: string;
  methodColor: string;
  path: string;
  desc?: string;
  body?: string;
}

export function ApiEndpoint({ method, methodColor, path, desc, body }: ApiEndpointProps) {
  return (
    <div className="api-block">
      <div className="api-header">
        <span className="api-method" style={{ background: `${methodColor}22`, color: methodColor }}>{method}</span>
        <span style={{ color: 'var(--white)' }}>{path}</span>
        {desc && <span style={{ color: 'var(--text2)', marginLeft: 'auto', fontSize: '10px' }}>{desc}</span>}
      </div>
      {body && <div className="api-body">{body}</div>}
    </div>
  );
}

interface ApiCodeBlockProps {
  header: ReactNode;
  children: ReactNode;
  bodyStyle?: React.CSSProperties;
}

export function ApiCodeBlock({ header, children, bodyStyle }: ApiCodeBlockProps) {
  return (
    <div className="api-block">
      <div className="api-header">{header}</div>
      <div className="api-body" style={bodyStyle}>{children}</div>
    </div>
  );
}
