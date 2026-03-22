import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  activeSection: string;
  sections: string[];
  onNavigate: (section: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, sections, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const formatLabel = (id: string) => id.replace(/-/g, ' ');

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Brand Logo - Top Left */}
      <div className="nav-slide-down fixed top-8 left-8 md:left-12 z-50 mix-blend-multiply pointer-events-none">
        <span className="font-bold tracking-tighter text-lg">HTML<span className="text-accent">2</span>FIGMA</span>
      </div>

      {/* Desktop Navigation */}
      <nav
        aria-label="Main navigation"
        className={`nav-slide-down fixed top-8 right-12 z-40 hidden md:flex items-center gap-2 p-1.5 rounded-full transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border border-white/50' : 'bg-transparent'
        }`}
      >
        {sections.map((id) => (
          <Button
            key={id}
            variant={'ghost'}
            size="sm"
            onClick={() => handleScrollTo(id)}
            className={`text-xs font-medium uppercase tracking-wider rounded-full px-4 ${
              activeSection === id ? 'bg-black text-white hover:bg-black/90' : 'text-gray-500 hover:text-black'
            }`}
          >
            {formatLabel(id)}
          </Button>
        ))}
        <a
          href="/compare"
          className="text-xs font-medium uppercase tracking-wider rounded-full px-4 py-2 text-gray-500 hover:text-black transition-colors"
        >
          Compare
        </a>
        <a
          href="/blog"
          className="text-xs font-medium uppercase tracking-wider rounded-full px-4 py-2 text-gray-500 hover:text-black transition-colors"
        >
          Blog
        </a>
      </nav>

      {/* Mobile Menu Button */}
      <div className="fixed top-6 right-6 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full bg-white/80 backdrop-blur-md shadow-sm border-gray-200"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Overlay — CSS transition replaces AnimatePresence */}
      <div
        className={`mobile-menu fixed inset-0 z-40 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col gap-6 text-center">
          {sections.map((id, i) => (
            <div
              key={id}
              className={`mobile-menu-item transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: isOpen ? `${i * 60}ms` : '0ms' }}
            >
              <button
                onClick={() => handleScrollTo(id)}
                className={`text-4xl font-light tracking-tight capitalize transition-colors ${
                  activeSection === id ? 'text-black font-normal' : 'text-gray-400'
                }`}
              >
                {formatLabel(id)}
              </button>
            </div>
          ))}
          <div
            className={`transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: isOpen ? `${sections.length * 60}ms` : '0ms' }}
          >
            <a
              href="/compare"
              className="text-4xl font-light tracking-tight capitalize transition-colors text-gray-400 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              Compare
            </a>
          </div>
          <div
            className={`transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: isOpen ? `${(sections.length + 1) * 60}ms` : '0ms' }}
          >
            <a
              href="/blog"
              className="text-4xl font-light tracking-tight capitalize transition-colors text-gray-400 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
