import { useCallback, useRef } from 'react';
import type { CSSProperties, ReactElement } from 'react';
import type { Member } from '../data/team';
import { Avatar } from './Avatar';
import { useInView } from '../hooks/useInView';
import { useIsCoarsePointer, useReducedMotion } from '../hooks/useMediaQuery';
import './MemberCard.css';

interface MemberCardProps {
  member: Member;
  index: number;
  onOpen: (member: Member) => void;
}

const MAX_TILT = 5;

export function MemberCard({ member, index, onOpen }: MemberCardProps): ReactElement {
  const cardRef = useRef<HTMLElement>(null);
  const { ref: revealRef, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const reducedMotion = useReducedMotion();
  const isCoarse = useIsCoarsePointer();
  const interactive = !reducedMotion && !isCoarse;

  const handleMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!interactive) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
      card.style.setProperty('--ry', `${(px - 0.5) * MAX_TILT * 2}deg`);
      card.style.setProperty('--rx', `${(0.5 - py) * MAX_TILT * 2}deg`);
    },
    [interactive],
  );

  const handleLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--ry', '0deg');
    card.style.setProperty('--rx', '0deg');
  }, []);

  return (
    <div ref={revealRef} className="member-card__reveal" data-in={inView} style={{ '--i': index } as CSSProperties}>
      <article
        ref={cardRef}
        id={member.id}
        className="member-card"
        style={{ '--accent': member.accent, '--accent-soft': member.accentSoft } as CSSProperties}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      >
        <div className="member-card__spotlight" aria-hidden="true" />
        <div className="member-card__border" aria-hidden="true" />

        <div className="member-card__body">
          <div className="member-card__top">
            <Avatar member={member} />
            <span className="member-card__index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="member-card__identity">
            <h3 className="member-card__name">
              {member.name}
              {member.age && <span className="member-card__age">{member.age}</span>}
            </h3>
            <p className="member-card__role">
              {member.role}
              {member.company && (
                <>
                  <span className="member-card__dot"> · </span>
                  <span
                    className="member-card__company"
                    data-accented={Boolean(member.companyAccent)}
                    style={{ '--company': member.companyAccent } as CSSProperties}
                  >
                    {member.company}
                  </span>
                </>
              )}
            </p>
          </div>

          <p className="member-card__tagline">{member.tagline}</p>

          <div className="member-card__path" aria-label="Шлях у розробку">
            <span>{member.path.from}</span>
            <svg className="member-card__arrow" viewBox="0 0 24 8" aria-hidden="true">
              <path d="M0 4h21M18 1l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
            <span className="member-card__path-to">{member.path.to}</span>
          </div>

          <ul className="member-card__tags">
            {member.tags.map((tag) => (
              <li key={tag} className="member-card__tag">
                {tag}
              </li>
            ))}
          </ul>

          <footer className="member-card__footer">
            {member.location && <span className="member-card__location">{member.location}</span>}
            <span className="member-card__cta" aria-hidden="true">
              Профіль
              <svg viewBox="0 0 16 16" className="member-card__cta-icon">
                <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </span>
          </footer>
        </div>

        <button
          type="button"
          className="member-card__hit"
          onClick={() => onOpen(member)}
          data-cursor="відкрити"
          data-cursor-accent={member.accent}
        >
          <span className="visually-hidden">Відкрити профіль: {member.fullName}</span>
        </button>
      </article>
    </div>
  );
}
