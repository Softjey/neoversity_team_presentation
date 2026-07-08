import { useState } from 'react';
import type { ReactElement } from 'react';
import type { Member } from '../data/team';
import './Avatar.css';

interface AvatarProps {
  member: Member;
  size?: 'card' | 'sheet';
}

/**
 * Показує фото учасника, а якщо файлу немає (або він не завантажився) —
 * градієнтну монограму в акцентному кольорі. Сайт цілісний у будь-якому разі.
 */
export function Avatar({ member, size = 'card' }: AvatarProps): ReactElement {
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(member.photo) && !failed;

  return (
    <div className="avatar" data-size={size} data-photo={showPhoto}>
      {showPhoto ? (
        <img
          className="avatar__img"
          src={member.photo}
          alt={member.fullName}
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="avatar__monogram" aria-hidden="true">
          {member.monogram}
        </span>
      )}
      <span className="avatar__ring" aria-hidden="true" />
    </div>
  );
}
