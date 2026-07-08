import type { CSSProperties, ReactElement } from 'react';
import { members } from '../data/team';
import { meta } from '../data/content';
import './Hero.css';

/** Розбиває слово на літери для каскадної анімації появи. */
function SplitWord({ word, offset }: { word: string; offset: number }) {
  return (
    <span className="hero__word">
      {[...word].map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="hero__char"
          style={{ '--i': offset + i } as CSSProperties}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export function Hero(): ReactElement {
  return (
    <header className="hero" id="hero">
      <div className="container hero__inner">
        <div className="hero__badge">
          <span className="hero__pulse" />
          {meta.team} · {meta.presentation}
        </div>

        <h1 className="hero__title">
          <span className="hero__line">
            <SplitWord word="Humans" offset={0} />
            <span className="hero__of">of</span>
          </span>
          <span className="hero__line">
            {/* Одним елементом, а не по літерах: background-clip: text не
                проєктується на текст нащадків у Safari та Firefox */}
            <span className="hero__word hero__word--accent">Neoversity</span>
          </span>
        </h1>

        <p className="hero__lead">
          Чотири різні дороги в IT. Один спільний вектор. Це історії людей, які вирішили не
          зупинятися на тому, що вже вміють.
        </p>

        <nav className="hero__roster" aria-label="Учасники команди">
          {members.map((member, index) => (
            <a
              key={member.id}
              href={`#${member.id}`}
              className="hero__person"
              style={{ '--accent': member.accent, '--i': index + 12 } as CSSProperties}
            >
              <span className="hero__dot" />
              {member.name}
            </a>
          ))}
        </nav>
      </div>

      <a className="hero__scroll" href="#team" aria-label="Гортати до команди">
        <span className="hero__scroll-text">гортай</span>
        <span className="hero__scroll-line" />
      </a>
    </header>
  );
}
