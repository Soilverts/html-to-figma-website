import React from 'react';
import { motion } from 'framer-motion';

const rows = [
  { feature: "Native Figma layers (not screenshots)", ours: true, manual: false, others: false },
  { feature: "Flexbox to Auto-Layout (optional)", ours: true, manual: false, others: false },
  { feature: "Typography preservation (font, weight, line-height)", ours: true, manual: true, others: false },
  { feature: "Styling fidelity (colors, shadows, gradients)", ours: true, manual: true, others: false },
  { feature: "SVG imported as vector paths", ours: true, manual: true, others: true },
  { feature: "Image fills preserved", ours: true, manual: true, others: true },
  { feature: "Structured layer hierarchy", ours: true, manual: false, others: false },
  { feature: "No browser extension required", ours: true, manual: true, others: false },
];

const Dot = ({ active, highlight }: { active: boolean; highlight?: boolean }) => (
  <div className={`w-2.5 h-2.5 rounded-full ${active ? (highlight ? 'bg-accent' : 'bg-content') : 'bg-gray-200'} mx-auto transition-colors duration-300`} />
);

export const Comparison: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id} aria-label="Feature comparison of HTML to Figma versus alternatives" className="relative py-16 md:py-24 bg-surface scroll-mt-24">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-content mb-4 md:mb-6 max-w-3xl leading-[1.1]">
            Why HTML to Figma vs. alternatives?
          </h2>
          <p className="text-content-muted text-base md:text-lg font-light max-w-2xl">
            Manual recreation takes hours and introduces errors. Screenshot-based tools produce flat images you cannot edit. We deliver the real thing.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative"
        >
          {/* Fading edge for scroll hint on mobile */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-surface to-transparent md:hidden z-10 pointer-events-none" />

          <div className="w-full overflow-x-auto pb-6 -mx-6 px-6 md:mx-0 md:px-0 no-scrollbar">
            <div className="min-w-[600px] md:min-w-0">
              <div className="flex items-end pb-4 border-b border-gray-300 mb-2 px-2">
                <div className="flex-1 font-bold text-[10px] uppercase tracking-widest text-gray-400 min-w-[240px]">Capabilities</div>
                <div className="w-28 md:w-32 text-center font-bold text-[10px] uppercase tracking-widest text-accent shrink-0">HTML to Figma</div>
                <div className="w-28 md:w-32 text-center font-bold text-[10px] uppercase tracking-widest text-gray-400 shrink-0">Manual Rebuild</div>
                <div className="w-28 md:w-32 text-center font-bold text-[10px] uppercase tracking-widest text-gray-400 shrink-0">Screenshots</div>
              </div>

              <div className="flex flex-col">
                {rows.map((row, i) => (
                  <div key={i} className="group flex items-center py-4 md:py-5 border-b border-gray-200 hover:bg-white transition-colors duration-500 px-2 rounded-xl -mx-2">
                    <div className="flex-1 text-sm md:text-base font-medium tracking-tight text-content group-hover:translate-x-2 transition-transform duration-500 ease-[0.16,1,0.3,1] min-w-[240px] pr-4">
                      {row.feature}
                    </div>

                    <div className="w-28 md:w-32 shrink-0"><Dot active={row.ours} highlight /></div>
                    <div className="w-28 md:w-32 shrink-0"><Dot active={row.manual} /></div>
                    <div className="w-28 md:w-32 shrink-0"><Dot active={row.others} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <p className="text-xs font-mono text-gray-500 mt-12 max-w-2xl">
          * "Screenshot tools" refers to browser-extension-based capture plugins that produce flat, non-editable images.
        </p>
      </div>
    </section>
  );
};
