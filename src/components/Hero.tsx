export function Hero() {
  return (
    <div className="hero">
      <div className="wrap">
        <h1 style={{ fontSize: 42, fontWeight: 900, color: 'var(--white)', letterSpacing: -2, lineHeight: 1.2 }}>
          <span style={{
            background: 'linear-gradient(135deg, var(--purple), var(--blue))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            KubeForge
          </span>
        </h1>
        <h1 style={{ fontSize: 22, marginTop: 6, color: 'var(--text2)', fontWeight: 700 }}>
          Solution Architecture — 전체 시스템 상세 구성
        </h1>
        <div style={{ fontSize: 15, color: 'var(--text2)', marginTop: 12, maxWidth: 680 }}>
          4단계 루프(설계→프로비저닝→운영→AI 분석)가 실제 솔루션으로 나온다면, 각 단계에서 어떤 서비스가 어떤 데이터를 주고받으며 어떻게 동작하는지 상세 구성
        </div>
      </div>
    </div>
  );
}
