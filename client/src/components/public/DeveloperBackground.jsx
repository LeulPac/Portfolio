import React, { useEffect, useMemo, useRef, useState } from 'react';
import { 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiExpress, 
  SiPrisma, 
  SiPostgresql, 
  SiKotlin, 
  SiGit, 
  SiTailwindcss,
  SiDocker,
  SiPython,
  SiTypescript,
  SiJavascript,
  SiMongodb,
  SiRedis,
  SiGraphql
} from 'react-icons/si';

const techList = [
  { icon: SiReact, name: 'React.js', color: 'text-cyan-400' },
  { icon: SiNextdotjs, name: 'Next.js', color: 'text-white' },
  { icon: SiNodedotjs, name: 'Node.js', color: 'text-emerald-400' },
  { icon: SiExpress, name: 'Express.js', color: 'text-slate-300' },
  { icon: SiPostgresql, name: 'PostgreSQL', color: 'text-blue-400' },
  { icon: SiPrisma, name: 'Prisma ORM', color: 'text-indigo-400' },
  { icon: SiKotlin, name: 'Kotlin', color: 'text-purple-400' },
  { icon: SiGit, name: 'Git & GitHub', color: 'text-orange-400' },
  { icon: SiTailwindcss, name: 'Tailwind CSS', color: 'text-sky-400' },
  { icon: SiDocker, name: 'Docker', color: 'text-cyan-500' },
  { icon: SiPython, name: 'Python', color: 'text-amber-400' },
  { icon: SiTypescript, name: 'TypeScript', color: 'text-blue-500' },
  { icon: SiJavascript, name: 'JavaScript ES6+', color: 'text-yellow-400' },
  { icon: SiMongodb, name: 'MongoDB', color: 'text-green-500' },
  { icon: SiRedis, name: 'Redis Cache', color: 'text-red-400' },
  { icon: SiGraphql, name: 'GraphQL API', color: 'text-pink-500' },
];

const codeSnippets = [
  'const dev = { name: "Leul Mengesha", role: "Software Engineer" };',
  'async function buildSystems() { await server.listen(5000); }',
  'val app = AndroidStudio.createApp("Kotlin", cleanArch = true)',
  'git commit -m "feat: high-throughput REST APIs & real-time UI"',
  'docker run -d -p 5000:5000 leul/fullstack-backend:latest',
  'const [state, dispatch] = useReducer(appReducer, initialState);',
];

const COLUMN_COUNT = 8;
const ITEMS_PER_COL = 3;

const DeveloperBackground = () => {
  const rootRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const columns = useMemo(() => {
    return Array.from({ length: COLUMN_COUNT }).map((_, colIdx) => {
      const leftPercent = ((colIdx + 0.5) / COLUMN_COUNT) * 100;
      const duration = 18 + (colIdx % 4) * 4;
      const delay = -(colIdx * 2.4);
      const items = Array.from({ length: ITEMS_PER_COL }).map((_, itemIdx) => {
        const tech = techList[(colIdx * 2 + itemIdx) % techList.length];
        const snippet = codeSnippets[(colIdx + itemIdx) % codeSnippets.length];
        return { tech, snippet };
      });
      return { id: colIdx, left: `${leftPercent}%`, duration, delay, items };
    });
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let inView = true;
    const syncPause = () => setPaused(!inView || document.hidden);

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncPause();
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    document.addEventListener('visibilitychange', syncPause);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPause);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none bg-slate-950"
    >
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />

      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className={`absolute inset-0 ${paused ? 'tech-rain-paused' : ''}`}>
        {columns.map((col) => (
          <div
            key={col.id}
            className="tech-rain-col absolute top-0 flex flex-col gap-20 items-center opacity-70"
            style={{
              left: col.left,
              animationDuration: `${col.duration}s`,
              animationDelay: `${col.delay}s`,
            }}
          >
            {col.items.map((item, idx) => {
              const Icon = item.tech.icon;
              const isSnippet = (col.id + idx) % 3 === 0;

              if (isSnippet) {
                return (
                  <div
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-cyan-400/90 whitespace-nowrap max-w-[220px] truncate"
                  >
                    <span className="text-purple-400">&gt; </span>
                    {item.snippet}
                  </div>
                );
              }

              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800"
                >
                  <Icon className={`w-5 h-5 ${item.tech.color}`} />
                  <span className="text-xs font-mono font-semibold text-slate-200">
                    {item.tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 hidden lg:flex justify-between px-6 opacity-20 font-mono text-xs text-cyan-500">
        <div>01001100 01000101 01010101 01001100</div>
        <div>01010011 01001111 01000110 01010100</div>
        <div>01000100 01000101 01010110 00110010</div>
      </div>
    </div>
  );
};

export default React.memo(DeveloperBackground);
