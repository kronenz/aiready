import { useEffect, useState } from 'react';

const tabs = [
  { id: 'p0', num: '🧬', label: '온톨로지 엔진' },
  { id: 'p1', num: '①', label: 'AI 설계' },
  { id: 'p2', num: '②', label: '프로비저닝' },
  { id: 'p3', num: '③', label: '운영 관리' },
  { id: 'p4', num: '④', label: 'AI Agent' },
  { id: 'p5', num: '🖥️', label: '시스템 배치' },
];

export function LoopBar() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const phases = document.querySelectorAll('.phase');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = [...phases].indexOf(e.target as Element);
            if (idx >= 0) setActiveIdx(idx);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );
    phases.forEach((p) => observer.observe(p));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="loop-bar">
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          className={`loop-tab ${i === activeIdx ? 'active' : ''}`}
          onClick={() => scrollTo(tab.id)}
        >
          <span className="num">{tab.num}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
