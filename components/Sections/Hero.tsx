import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Figma, MousePointer2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const Hero: React.FC<{ id: string }> = ({ id }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setScrollProgress(Math.min(window.scrollY / 500, 1));
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const opacity = 1 - scrollProgress;
  const yOffset = scrollProgress * 50;

  return (
    <section
      id={id}
      aria-label="HTML to Figma - Convert code to design"
      className="relative min-h-[88svh] md:min-h-screen flex flex-col justify-start md:justify-center px-6 md:px-12 pb-12 md:py-20 pt-32 md:pt-32 overflow-hidden"
    >
      <div
        style={{ opacity, transform: `translateY(${yOffset}px)` }}
        className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-12 md:gap-24 z-10"
      >
        {/* Left: Editorial Content */}
        <div className="flex-1 space-y-10">
          <div className="flex flex-col items-start">
            <Badge
              variant="outline"
              className="mb-4 md:mb-6 text-[10px] font-mono tracking-widest border-gray-200 text-content-muted px-3 py-1 uppercase"
            >
              Figma Plugin — HTML to Figma
            </Badge>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-content mb-6 md:mb-8">
              HTML to Figma. <br />
              <span className="text-gray-500">Pixel or editable.</span>
            </h1>
            <p className="text-base md:text-xl text-content-muted max-w-md font-light leading-relaxed mb-8">
              Import pasted HTML or a public website URL into Figma.
              Choose native editable layers or a lossless Pixel capture,
              with no browser extension required.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <Button size="lg" className="h-14 px-8 text-base shadow-xl shadow-black/10 group" asChild>
              <a
                href="https://www.figma.com/community/plugin/1591359863857120491/jesse-html-to-figma-import-websites-as-editable-designs-web-css-html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Install HTML to Figma plugin
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>

            <a href="/result-quality" className="group min-h-11 flex items-center gap-2 text-content-muted hover:text-content transition-colors px-4 py-2">
              <span className="border-b border-transparent group-hover:border-content pb-0.5 text-sm font-medium">See real results</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right: Abstract UI Visualization */}
        <div
          className="flex-1 w-full h-[500px] relative hidden md:block"
          role="img"
          aria-label="Visual showing HTML code being converted into a Figma design frame"
        >
          <VisualGraphic />
        </div>
      </div>
    </section>
  );
};

const VisualGraphic = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-[2000px]">
      {/* HTML Source Plane */}
      <div className="visual-slide-left absolute z-10 w-[320px] bg-white/80 backdrop-blur-md rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white/50 p-6 font-mono text-[10px] text-gray-400 overflow-hidden ring-1 ring-black/5"
        style={{ transform: 'rotateY(25deg) rotateX(5deg) translateX(-80px)' }}
      >
        <div className="flex gap-1.5 mb-6">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/20" />
        </div>
        <div className="space-y-3 opacity-60">
          <div className="w-20 h-2 bg-blue-500/10 rounded mb-4" />
          <div className="ml-4 w-32 h-2 bg-gray-900/5 rounded" />
          <div className="ml-4 w-24 h-2 bg-gray-900/5 rounded" />
          <div className="ml-8 w-16 h-2 bg-gray-900/5 rounded" />
          <div className="ml-4 w-12 h-2 bg-gray-900/5 rounded" />
          <div className="w-16 h-2 bg-gray-900/5 rounded mt-4" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
      </div>

      {/* Figma Result Plane */}
      <div className="visual-slide-right absolute z-20 w-[320px] bg-white rounded-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] border border-gray-100 p-2 overflow-hidden ring-1 ring-black/5"
        style={{ transform: 'rotateY(25deg) rotateX(5deg) translateX(80px)' }}
      >
        <div className="absolute top-0 left-0 w-full h-10 bg-gray-50/50 border-b border-gray-100 flex items-center px-4 gap-2">
          <Figma size={14} className="text-black opacity-40" />
          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">Frame 1</span>
        </div>
        <div className="pt-16 px-8 pb-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 mb-6 shadow-inner" />
          <div className="w-full h-3 bg-gray-100 rounded-full mb-3" />
          <div className="w-2/3 h-3 bg-gray-100 rounded-full mb-8" />
          <Button size="sm" className="w-full shadow-lg shadow-accent/20">
            Get Started
          </Button>
        </div>
        {/* Selection Overlay */}
        <div className="absolute inset-0 border-2 border-accent/40 rounded-xl pointer-events-none" />
        <div className="absolute -bottom-3 -right-3">
          <MousePointer2 className="fill-accent text-white w-6 h-6 drop-shadow-md" />
        </div>
      </div>
    </div>
  );
};
