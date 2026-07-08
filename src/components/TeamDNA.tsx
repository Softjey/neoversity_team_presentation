import type { ReactElement } from 'react';
import { goals, strengths, unique, values } from '../data/content';
import { Reveal } from './Reveal';
import './TeamDNA.css';

export function TeamDNA(): ReactElement {
  return (
    <section className="dna" id="dna">
      <div className="container">
        <Reveal className="dna__head">
          <span className="kicker">Фінальний розділ</span>
          <h2 className="dna__title">Хто ми як команда</h2>
          <p className="dna__lead">
            Ми не збиралися за схожістю. Нас зібрало те, що кожен у своїй точці вирішив піти далі,
            ніж було комфортно.
          </p>
        </Reveal>

        {/* Сильні сторони */}
        <div className="dna__bento">
          {strengths.map((item, index) => (
            <Reveal key={item.title} index={index} className={`dna__cell dna__cell--${item.span}`}>
              <h3 className="dna__cell-title">{item.title}</h3>
              <p className="dna__cell-body">{item.body}</p>
            </Reveal>
          ))}
        </div>

        {/* Спільні цілі */}
        <Reveal className="dna__section-label">
          <span className="kicker">Спільні цілі</span>
        </Reveal>

        <div className="dna__goals">
          {goals.map((goal, index) => (
            <Reveal key={goal.n} index={index} className="dna__goal">
              <span className="dna__goal-n">{goal.n}</span>
              <h3 className="dna__goal-title">{goal.title}</h3>
              <p className="dna__goal-body">{goal.body}</p>
            </Reveal>
          ))}
        </div>

        {/* Цінності */}
        <Reveal className="dna__section-label">
          <span className="kicker">Цінності під час навчання</span>
        </Reveal>

        <ul className="dna__values">
          {values.map((value, index) => (
            <Reveal as="li" key={value} index={index} className="dna__value">
              <span className="dna__value-mark" aria-hidden="true" />
              {value}
            </Reveal>
          ))}
        </ul>

        {/* Унікальність */}
        <Reveal className="dna__unique">
          <div className="dna__unique-inner">
            <h3 className="dna__unique-title">{unique.title}</h3>
            <p className="dna__unique-body">{unique.body}</p>
            <p className="dna__unique-punch">{unique.punch}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
