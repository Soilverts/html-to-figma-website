import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Hero } from './components/Sections/Hero';
import { Navigation } from './components/Layout/Navigation';

const sections = ['home', 'features', 'how-it-works', 'use-cases', 'pricing'];

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
const BlogPreview = lazy(() =>
  import('./components/Sections/BlogPreview').then(m => ({ default: m.BlogPreview }))
);
const CTA = lazy(() =>
  import('./components/Sections/CTA').then(m => ({ default: m.CTA }))
);

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [showSections, setShowSections] = useState(false);
  const isNavigatingRef = useRef(false);

  const handleNavigate = (id: string) => {
    setShowSections(true);
    setActiveSection(id);
    isNavigatingRef.current = true;
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000);
  };

  useEffect(() => {
    if (window.location.hash) {
      setShowSections(true);
      const targetId = decodeURIComponent(window.location.hash.slice(1));
      let frame = 0;
      let attempts = 0;
      const scrollToHash = () => {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'auto' });
          return;
        }
        if (attempts++ < 60) frame = window.requestAnimationFrame(scrollToHash);
      };
      frame = window.requestAnimationFrame(scrollToHash);
      return () => window.cancelAnimationFrame(frame);
    }

    const reveal = () => setShowSections(true);
    window.addEventListener('scroll', reveal, { once: true, passive: true });
    window.addEventListener('wheel', reveal, { once: true, passive: true });
    window.addEventListener('pointerdown', reveal, { once: true, passive: true });
    window.addEventListener('touchstart', reveal, { once: true, passive: true });
    return () => {
      window.removeEventListener('scroll', reveal);
      window.removeEventListener('wheel', reveal);
      window.removeEventListener('pointerdown', reveal);
      window.removeEventListener('touchstart', reveal);
    };
  }, []);

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = sections.indexOf(activeSection);

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        setShowSections(true);
        const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
        window.setTimeout(() => {
          document.getElementById(sections[nextIndex])?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
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

      {/* UI Overlay */}
      <Navigation activeSection={activeSection} sections={sections} onNavigate={handleNavigate} />

      {/* Content */}
      <main className="relative z-10">
        <Hero id="home" />
        {showSections && (
          <>
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
              <BlogPreview id="blog" />
            </Suspense>
            <Suspense fallback={<div className="h-64" />}>
              <CTA id="cta" />
            </Suspense>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
