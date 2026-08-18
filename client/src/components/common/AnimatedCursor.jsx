import React, { useEffect, useRef } from 'react';

const AnimatedCursor = () => {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const pos = { x: -100, y: -100 };
    let hovered = false;
    let frame = 0;

    const apply = () => {
      frame = 0;
      const ring = ringRef.current;
      const dot = dotRef.current;
      if (!ring || !dot) return;

      const scale = hovered ? 1.8 : 1;
      ring.style.transform = `translate3d(${pos.x - 16}px, ${pos.y - 16}px, 0) scale(${scale})`;
      ring.style.backgroundColor = hovered ? 'rgba(6, 182, 212, 0.2)' : 'transparent';
      dot.style.transform = `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)`;
    };

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const target = e.target;
      hovered = Boolean(target.closest?.('a, button, [role="button"]'));
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-400/60 pointer-events-none z-50 mix-blend-difference hidden md:block will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-50 hidden md:block will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </>
  );
};

export default React.memo(AnimatedCursor);
