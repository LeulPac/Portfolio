import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
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
  'SELECT * FROM developers WHERE passion = "Unlimited";',
  'val app = AndroidStudio.createApp("Kotlin", cleanArch = true)',
  'git commit -m "feat: high-throughput REST APIs & real-time UI"',
  'export const metadata = { title: "Leul Mengesha Portfolio" };',
  'docker run -d -p 5000:5000 leul/fullstack-backend:latest',
  'const [state, dispatch] = useReducer(appReducer, initialState);',
];

const DeveloperBackground = () => {
  // Generate vertical falling columns for smooth matrix waterfall effect
  const columns = useMemo(() => {
    return Array.from({ length: 14 }).map((_, colIdx) => {
      const leftPercent = (colIdx / 14) * 100 + 2;
      const speed = 6 + (colIdx % 5) * 2.5; // fast moving speed
      const delay = (colIdx % 7) * 0.8;
      const items = Array.from({ length: 4 }).map((_, itemIdx) => {
        const tech = techList[(colIdx * 3 + itemIdx) % techList.length];
        const snippet = codeSnippets[(colIdx + itemIdx) % codeSnippets.length];
        return { tech, snippet };
      });
      return { id: colIdx, left: `${leftPercent}%`, speed, delay, items };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none bg-slate-950">
      
      {/* Dark Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-[650px] h-[650px] bg-indigo-600/10 rounded-full blur-[170px] animate-pulse" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25" />

      {/* Fast Top-to-Bottom Moving Tech Items */}
      {columns.map((col) => (
        <motion.div
          key={col.id}
          style={{ left: col.left }}
          initial={{ y: '-20%' }}
          animate={{ y: '120%' }}
          transition={{
            duration: col.speed,
            repeat: Infinity,
            ease: 'linear',
            delay: col.delay,
          }}
          className="absolute top-0 flex flex-col gap-16 items-center opacity-80"
        >
          {col.items.map((item, idx) => {
            const Icon = item.tech.icon;
            const isSnippetCol = (col.id + idx) % 3 === 0;

            if (isSnippetCol) {
              return (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800/80 shadow-lg text-[11px] font-mono text-cyan-400/90 backdrop-blur-md whitespace-nowrap"
                >
                  <span className="text-purple-400">&gt; </span>
                  {item.snippet}
                </div>
              );
            }

            return (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800/90 shadow-md backdrop-blur-md"
              >
                <Icon className={`w-5 h-5 ${item.tech.color}`} />
                <span className="text-xs font-mono font-semibold text-slate-200">
                  {item.tech.name}
                </span>
              </div>
            );
          })}
        </motion.div>
      ))}

      {/* Decorative Matrix Binary Streams */}
      <div className="absolute inset-0 flex justify-between px-6 pointer-events-none opacity-20 font-mono text-xs text-cyan-500">
        <div className="hidden lg:block">01001100 01000101 01010101 01001100</div>
        <div className="hidden lg:block">01010011 01001111 01000110 01010100</div>
        <div className="hidden lg:block">01000100 01000101 01010110 00110010</div>
      </div>
    </div>
  );
};

export default DeveloperBackground;
