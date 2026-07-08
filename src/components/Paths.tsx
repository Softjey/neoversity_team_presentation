import type { CSSProperties, ReactElement } from 'react';
import { members } from '../data/team';
import { useInView } from '../hooks/useInView';
import { Reveal } from './Reveal';
import './Paths.css';

/**
 * Візуальний доказ тези «різноманітність досвіду»:
 * чотири різні відправні точки, одна спільна.
 */
export function Paths(): ReactElement {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <section className="paths" id="paths">
      <div className="container">
        <Reveal className="paths__head">
          <span className="kicker">Різноманітність досвіду</span>
          <h2 className="paths__title">Ніхто з нас не йшов прямо</h2>
        </Reveal>

        <div className="paths__list" ref={ref} data-in={inView}>
          {members.map((member, index) => (
            <div
              className="paths__row"
              key={member.id}
              style={{ '--accent': member.accent, '--i': index } as CSSProperties}
            >
              <span className="paths__from">{member.path.from}</span>
              <span className="paths__line" aria-hidden="true">
                <span className="paths__line-fill" />
                <span className="paths__tip" />
              </span>
              <span className="paths__to">{member.path.to}</span>
              <span className="paths__who">{member.name}</span>
            </div>
          ))}

          <div className="paths__converge">
            <span className="paths__converge-line" aria-hidden="true" />
            <span className="paths__converge-node">
              <span className="paths__converge-text">Neoversity</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
