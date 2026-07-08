import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactElement } from 'react';
import type { Member } from '../data/team';
import { Avatar } from './Avatar';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import './MemberSheet.css';

interface MemberSheetProps {
  member: Member;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

interface Block {
  label: string;
  body: string;
}

export function MemberSheet({ member, onClose, onPrev, onNext }: MemberSheetProps): ReactElement {
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  useLockBodyScroll(true);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNext();
      if (event.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Прокручуємо контент нагору при перемиканні учасника
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [member.id]);

  const blocks: Block[] = [
    { label: 'Коротка історія', body: member.story },
    { label: 'Професійний досвід', body: member.experience },
    { label: 'Чому Neoversity', body: member.whyNeoversity },
    { label: 'Мета під час навчання', body: member.goal },
    { label: 'Чим корисний іншим студентам', body: member.offer },
    ...(member.future ? [{ label: 'Через 2 роки', body: member.future }] : []),
  ];

  return (
    <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-name">
      <button
        type="button"
        className="sheet__backdrop"
        onClick={onClose}
        aria-label="Закрити профіль"
        data-cursor="закрити"
      />

      <div
        className="sheet__panel"
        style={{ '--accent': member.accent, '--accent-soft': member.accentSoft } as CSSProperties}
      >
        <div className="sheet__glow" aria-hidden="true" />

        <div className="sheet__controls">
          <div className="sheet__nav">
            <button type="button" className="sheet__nav-btn" onClick={onPrev} aria-label="Попередній учасник">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M14 8H3M7 4L3 8l4 4" fill="none" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </button>
            <button type="button" className="sheet__nav-btn" onClick={onNext} aria-label="Наступний учасник">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </button>
          </div>

          <button ref={closeRef} type="button" className="sheet__close" onClick={onClose}>
            <span>Закрити</span>
            <kbd>Esc</kbd>
          </button>
        </div>

        <div ref={scrollRef} className="sheet__scroll">
          <header className="sheet__header">
            <Avatar member={member} size="sheet" />
            <div>
              <p className="sheet__role">
                {member.role}
                {member.company && (
                  <>
                    {' · '}
                    <span
                      className="sheet__company"
                      data-accented={Boolean(member.companyAccent)}
                      style={{ '--company': member.companyAccent } as CSSProperties}
                    >
                      {member.company}
                    </span>
                  </>
                )}
              </p>
              <h2 className="sheet__name" id="sheet-name">
                {member.fullName}
              </h2>
              {(member.age || member.location) && (
                <p className="sheet__meta">
                  {member.age && <span>{member.age} років</span>}
                  {member.location && <span>{member.location}</span>}
                </p>
              )}
            </div>
          </header>

          <section className="sheet__superpower">
            <span className="sheet__superpower-label">Суперсила</span>
            <h3 className="sheet__superpower-title">{member.superpower.title}</h3>
            <p className="sheet__superpower-body">{member.superpower.description}</p>
          </section>

          <div className="sheet__blocks">
            {blocks.map((block, i) => (
              <section className="sheet__block" key={block.label}>
                <span className="sheet__block-num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="sheet__block-label">{block.label}</h3>
                  <p className="sheet__block-body">{block.body}</p>
                </div>
              </section>
            ))}
          </div>

          <footer className="sheet__footer">
            <ul className="sheet__tags">
              {member.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <p className="sheet__hint">
              <kbd>←</kbd> <kbd>→</kbd> перемикання учасників
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
