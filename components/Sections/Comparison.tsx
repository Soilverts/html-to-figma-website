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
    <section id={id} aria-label="Feature comparison of HTML to Figma versus alternatives" className="relative py-24 bg-surface scroll-mt-24">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-content mb-6 max-w-3xl leading-[1.1]">
            Why HTML to Figma vs. alternatives?
          </h2>
          <p className="text-content-muted text-lg font-light max-w-2xl">
            Manual recreation takes hours and introduces errors. Screenshot-based tools produce flat images you cannot edit. We deliver the real thing.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <div className="hidden md:flex items-end pb-4 border-b border-gray-300 mb-2 px-2">
            <div className="flex-1 font-bold text-[10px] uppercase tracking-widest text-gray-400">Capabilities</div>
            <div className="w-32 text-center font-bold text-[10px] uppercase tracking-widest text-accent">HTML to Figma</div>
            <div className="w-32 text-center font-bold text-[10px] uppercase tracking-widest text-gray-400">Manual</div>
            <div className="w-32 text-center font-bold text-[10px] uppercase tracking-widest text-gray-400">Screenshots</div>
          </div>

          <div className="flex flex-col">
            {rows.map((row, i) => (
              <div key={i} className="group flex flex-col md:flex-row md:items-center py-5 border-b border-gray-200 hover:bg-white transition-colors duration-500 px-2 rounded-xl -mx-2">
                <div className="flex-1 text-base font-medium tracking-tight text-content group-hover:translate-x-2 transition-transform duration-500 ease-[0.16,1,0.3,1] mb-4 md:mb-0">
                  {row.feature}
                </div>

                {/* Mobile view labels */}
                <div className="flex justify-between md:hidden mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <span>HTML to Figma</span>
                  <span className="text-accent">{row.ours ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between md:hidden mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <span>Manual Rebuild</span>
                  <span>{row.manual ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between md:hidden text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <span>Screenshots</span>
                  <span>{row.others ? 'Yes' : 'No'}</span>
                </div>

                {/* Desktop view dots */}
                <div className="hidden md:block w-32"><Dot active={row.ours} highlight /></div>
                <div className="hidden md:block w-32"><Dot active={row.manual} /></div>
                <div className="hidden md:block w-32"><Dot active={row.others} /></div>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="text-xs font-mono text-gray-400 mt-12 max-w-2xl">
          * "Screenshot tools" refers to browser-extension-based capture plugins that produce flat, non-editable images.
        </p>
      </div>
    </section>
  );
};
