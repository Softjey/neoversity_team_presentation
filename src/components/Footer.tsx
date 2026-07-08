import type { ReactElement } from 'react';
import { meta } from '../data/content';
import './Footer.css';

export function Footer(): ReactElement {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">Humans of Neoversity</span>
          <span className="footer__sub">{meta.team} · Перший командний проєкт</span>
        </div>

        <div className="footer__meta">
          <span>{meta.presentation}</span>
          <a className="footer__top" href="#hero" data-cursor="нагору">
            Нагору
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 14V3M4 7l4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
