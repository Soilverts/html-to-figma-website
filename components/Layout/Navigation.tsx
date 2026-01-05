import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  activeSection: string;
  sections: string[];
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, sections }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatLabel = (id: string) => id.replace(/-/g, ' ');

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      {/* Brand Logo - Top Left */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-8 left-8 md:left-12 z-50 mix-blend-multiply pointer-events-none"
      >
        <span className="font-bold tracking-tighter text-lg">HTML<span className="text-accent">2</span>FIGMA</span>
      </motion.div>

      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`fixed top-8 right-12 z-40 hidden md:flex items-center gap-2 p-1.5 rounded-full transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border border-white/50' : 'bg-transparent'
          }`}
      >
        {sections.map((id) => (
          <Button
            key={id}
            variant={'ghost'}
            size="sm"
            onClick={() => handleScrollTo(id)}
            className={`text-xs font-medium uppercase tracking-wider rounded-full px-4 ${activeSection === id ? 'bg-black text-white hover:bg-black/90' : 'text-gray-500 hover:text-black'
              }`}
          >
            {formatLabel(id)}
          </Button>
        ))}
      </motion.nav>

      {/* Mobile Menu Button */}
      <div className="fixed top-6 right-6 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full bg-white/80 backdrop-blur-md shadow-sm border-gray-200"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/90 flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {sections.map((id, i) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <button
                    onClick={() => handleScrollTo(id)}
                    className={`text-4xl font-light tracking-tight capitalize transition-colors ${activeSection === id ? 'text-black font-normal' : 'text-gray-400'}`}
                  >
                    {formatLabel(id)}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};