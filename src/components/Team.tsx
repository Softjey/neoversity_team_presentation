import type { ReactElement } from 'react';
import { useCallback, useState } from 'react';
import { members } from '../data/team';
import type { Member } from '../data/team';
import { MemberCard } from './MemberCard';
import { MemberSheet } from './MemberSheet';
import { Reveal } from './Reveal';
import './Team.css';

export function Team(): ReactElement {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const open = useCallback((member: Member) => {
    setOpenIndex(members.findIndex((m) => m.id === member.id));
  }, []);

  const close = useCallback(() => setOpenIndex(null), []);

  const shift = useCallback((delta: number) => {
    setOpenIndex((current) =>
      current === null ? current : (current + delta + members.length) % members.length,
    );
  }, []);

  return (
    <section className="team" id="team">
      <div className="container">
        <Reveal className="team__head">
          <span className="kicker">Профілі</span>
          <h2 className="team__title">
            Пʼять людей, <em>жодного однакового</em> старту
          </h2>
          <p className="team__lead">
            Натисни на картку, щоб прочитати повну історію — звідки людина прийшла, чому обрала
            Neoversity і чим може бути корисною тобі.
          </p>
        </Reveal>

        <div className="team__grid">
          {members.map((member, index) => (
            <MemberCard key={member.id} member={member} index={index} onOpen={open} />
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <MemberSheet
          member={members[openIndex]}
          onClose={close}
          onPrev={() => shift(-1)}
          onNext={() => shift(1)}
        />
      )}
    </section>
  );
}
