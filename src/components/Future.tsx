import type { ReactElement } from 'react';
import { sharedFuture } from '../data/content';
import { members } from '../data/team';
import { Reveal } from './Reveal';
import './Future.css';

/** Спільна відповідь на «Де бачите себе після магістратури» — ідея Андрія. */
export function Future(): ReactElement {
  return (
    <section className="future" id="future">
      <div className="container future__inner">
        <Reveal className="future__head">
          <span className="kicker">{sharedFuture.kicker}</span>
          <h2 className="future__title">{sharedFuture.title}</h2>
        </Reveal>

        <Reveal index={1} className="future__quote">
          <span className="future__mark" aria-hidden="true">
            “
          </span>
          <p className="future__body">{sharedFuture.body}</p>
          <p className="future__signature">{sharedFuture.signature}</p>

          <div className="future__authors">
            {members.map((member) => (
              <span
                key={member.id}
                className="future__author"
                style={{ background: member.accent }}
                title={member.fullName}
              />
            ))}
            <span className="future__authors-label">
              {members.map((m) => m.name).join(' · ')}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
