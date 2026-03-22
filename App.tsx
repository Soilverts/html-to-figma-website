import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Hero } from './components/Sections/Hero';
import { Navigation } from './components/Layout/Navigation';

// Lazy-load Three.js particle field — biggest LCP/TBT win
const ParticleField = lazy(() =>
  import('./components/Visuals/ParticleField').then(m => ({ default: m.ParticleField }))
);

// Lazy-load all below-fold sections — defers framer-motion from initial bundle
const Features = lazy(() =>
  import('./components/Sections/Features').then(m => ({ default: m.Features }))
);
const HowItWorks = lazy(() =>
  import('./components/Sections/HowItWorks').then(m => ({ default: m.HowItWorks }))
);
const Stats = lazy(() =>
  import('./components/Sections/Stats').then(m => ({ default: m.Stats }))
);
const UseCases = lazy(() =>
  import('./components/Sections/UseCases').then(m => ({ default: m.UseCases }))
);
const Comparison = lazy(() =>
  import('./components/Sections/Comparison').then(m => ({ default: m.Comparison }))
);
const Pricing = lazy(() =>
  import('./components/Sections/Pricing').then(m => ({ default: m.Pricing }))
);
const FAQ = lazy(() =>
  import('./components/Sections/FAQ').then(m => ({ default: m.FAQ }))
);
const CTA = lazy(() =>
  import('./components/Sections/CTA').then(m => ({ default: m.CTA }))
);

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const isNavigatingRef = useRef(false);
  const sections = ['home', 'features', 'how-it-works', 'use-cases', 'pricing'];

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    isNavigatingRef.current = true;
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000);
  };

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = sections.indexOf(activeSection);

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
        const nextSection = document.getElementById(sections[nextIndex]);
        nextSection?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = Math.max(currentIndex - 1, 0);
        const prevSection = document.getElementById(sections[prevIndex]);
        prevSection?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, sections]);

  // Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isNavigatingRef.current) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="relative w-full min-h-screen bg-white text-content selection:bg-accent/10 selection:text-accent overflow-hidden font-sans">

      {/* Background Visuals — lazy-loaded, Three.js deferred until idle */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </div>

      {/* UI Overlay */}
      <Navigation activeSection={activeSection} sections={sections} onNavigate={handleNavigate} />

      {/* Content */}
      <main className="relative z-10">
        <Hero id="home" />
        <Suspense fallback={<div className="h-screen" />}>
          <Features id="features" />
        </Suspense>
        <Suspense fallback={<div className="h-screen" />}>
          <HowItWorks id="how-it-works" />
        </Suspense>
        <Suspense fallback={<div className="h-64" />}>
          <Stats id="stats" />
        </Suspense>
        <Suspense fallback={<div className="h-screen" />}>
          <UseCases id="use-cases" />
        </Suspense>
        <Suspense fallback={<div className="h-screen" />}>
          <Comparison id="comparison" />
        </Suspense>
        <Suspense fallback={<div className="h-screen" />}>
          <Pricing id="pricing" />
        </Suspense>
        <Suspense fallback={<div className="h-64" />}>
          <FAQ id="faq" />
        </Suspense>
        <Suspense fallback={<div className="h-64" />}>
          <CTA id="cta" />
        </Suspense>
      </main>
    </div>
  );
};

export default App;
