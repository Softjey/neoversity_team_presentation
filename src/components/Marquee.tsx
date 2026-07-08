import type { ReactElement } from 'react';
import { marqueeWords } from '../data/content';
import './Marquee.css';

/** Нескінченна стрічка навичок. Трек дублюється — шов непомітний. */
export function Marquee(): ReactElement {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <div className="marquee__group" key={copy}>
            {marqueeWords.map((word) => (
              <span className="marquee__item" key={`${copy}-${word}`}>
                {word}
                <span className="marquee__sep">✳</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
