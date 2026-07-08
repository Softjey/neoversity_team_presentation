import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { stats } from '../data/content';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useMediaQuery';
import './Stats.css';

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Число, що «докручується» від 0, коли потрапляє у вʼюпорт. */
function CountUp({ to, duration = 1400 }: { to: number; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.6 });
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setValue(to);
      return;
    }

    let frame = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      start ??= now;
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(easeOutExpo(progress) * to));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration, reducedMotion]);

  return (
    <span ref={ref}>{String(value).padStart(String(to).length, '0')}</span>
  );
}

export function Stats(): ReactElement {
  return (
    <section className="stats" aria-label="Команда в цифрах">
      <div className="container stats__grid">
        {stats.map((stat) => (
          <div className="stats__cell" key={stat.label}>
            <div className="stats__value">
              <CountUp to={stat.value} />
              <span className="stats__suffix">{stat.suffix}</span>
            </div>
            <div className="stats__label">{stat.label}</div>
            <div className="stats__hint">{stat.hint}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
