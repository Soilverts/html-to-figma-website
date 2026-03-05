import React, { useEffect, useState } from 'react';
import { Hero } from './components/Sections/Hero';
import { Features } from './components/Sections/Features';
import { HowItWorks } from './components/Sections/HowItWorks';
import { Navigation } from './components/Layout/Navigation';
import { ParticleField } from './components/Visuals/ParticleField';
import { Pricing } from './components/Sections/Pricing';
import { UseCases } from './components/Sections/UseCases';
import { Stats } from './components/Sections/Stats';
import { Comparison } from './components/Sections/Comparison';
import { CTA } from './components/Sections/CTA';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const sections = ['hero', 'features', 'how-it-works', 'use-cases', 'pricing'];

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
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="relative w-full min-h-screen bg-white text-content selection:bg-accent/10 selection:text-accent overflow-hidden font-sans">

      {/* Background Visuals */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <ParticleField />
      </div>

      {/* UI Overlay */}
      <Navigation activeSection={activeSection} sections={sections} />

      {/* Content */}
      <main className="relative z-10">
        <Hero id="hero" />
        <Features id="features" />
        <HowItWorks id="how-it-works" />
        <Stats id="stats" />
        <UseCases id="use-cases" />
        <Comparison id="comparison" />
        <Pricing id="pricing" />
        <CTA id="cta" />
      </main>
    </div>
  );
};

export default App;