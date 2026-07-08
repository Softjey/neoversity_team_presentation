import type { ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useIsCoarsePointer, useReducedMotion } from '../hooks/useMediaQuery';
import './Cursor.css';

const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

/**
 * Кастомний курсор: точка йде миттєво, кільце наздоганяє.
 * Реагує на елементи з [data-cursor] — читає підпис та акцент.
 */
export function Cursor(): ReactElement | null {
  const isCoarse = useIsCoarsePointer();
  const reducedMotion = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const enabled = !isCoarse && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...pointer };
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      setVisible(true);

      const target = (event.target as Element | null)?.closest<HTMLElement>('[data-cursor]');
      if (target) {
        setActive(true);
        setLabel(target.dataset.cursor || null);
        const accent = target.dataset.cursorAccent;
        if (accent) document.documentElement.style.setProperty('--cursor-accent', accent);
      } else {
        setActive(false);
        setLabel(null);
        document.documentElement.style.removeProperty('--cursor-accent');
      }
    };

    const onLeave = () => setVisible(false);

    const tick = () => {
      ring.x = lerp(ring.x, pointer.x, 0.16);
      ring.y = lerp(ring.y, pointer.y, 0.16);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled]);

  useEffect(() => {
    document.body.classList.toggle('has-custom-cursor', enabled);
    return () => document.body.classList.remove('has-custom-cursor');
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="cursor" data-visible={visible} aria-hidden="true">
      <div ref={dotRef} className="cursor__dot" data-active={active} />
      <div ref={ringRef} className="cursor__ring" data-active={active} data-labeled={Boolean(label)}>
        {label && <span className="cursor__label">{label}</span>}
      </div>
    </div>
  );
}
