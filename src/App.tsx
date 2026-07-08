import type { ReactElement } from 'react';
import { Backdrop } from './components/Backdrop';
import { Cursor } from './components/Cursor';
import { Footer } from './components/Footer';
import { Future } from './components/Future';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Paths } from './components/Paths';
import { ScrollProgress } from './components/ScrollProgress';
import { Stats } from './components/Stats';
import { Team } from './components/Team';
import { TeamDNA } from './components/TeamDNA';

export default function App(): ReactElement {
  return (
    <>
      <Backdrop />
      <Cursor />
      <ScrollProgress />

      <main className="page">
        <Hero />
        <Marquee />
        <Stats />
        <Team />
        <Paths />
        <TeamDNA />
        <Future />
      </main>

      <Footer />
    </>
  );
}
