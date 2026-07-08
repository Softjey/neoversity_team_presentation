import type { ReactElement } from 'react';
import './Backdrop.css';

/**
 * Атмосферний шар: аврора-градієнти, сітка та зернистість.
 * Живе під усім контентом, не ловить події.
 */
export function Backdrop(): ReactElement {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop__aurora backdrop__aurora--violet" />
      <div className="backdrop__aurora backdrop__aurora--mint" />
      <div className="backdrop__aurora backdrop__aurora--sky" />
      <div className="backdrop__grid" />
      <div className="backdrop__grain" />
      <div className="backdrop__vignette" />
    </div>
  );
}
