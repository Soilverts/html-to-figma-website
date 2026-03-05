import React from 'react';
import { Check, X } from 'lucide-react';
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

const Cell = ({ value }: { value: boolean }) => (
  <td className="py-4 px-4 text-center">
    {value
      ? <Check size={18} className="inline-block text-green-500" />
      : <X size={18} className="inline-block text-gray-300" />
    }
  </td>
);

export const Comparison: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id} aria-label="Feature comparison of HTML to Figma versus alternatives" className="relative py-32 bg-surface">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-content mb-4">
            Why HTML to Figma vs. alternatives?
          </h2>
          <p className="text-content-muted text-lg max-w-2xl mx-auto">
            Manual recreation takes hours and introduces errors. Screenshot-based tools produce flat images you cannot edit. HTML to Figma delivers editable, layered Figma files.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto"
        >
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-content">Feature</th>
                <th className="py-4 px-4 font-bold text-accent text-center">HTML to Figma</th>
                <th className="py-4 px-4 font-semibold text-content-muted text-center">Manual Rebuild</th>
                <th className="py-4 px-4 font-semibold text-content-muted text-center">Screenshot Tools</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-white transition-colors">
                  <td className="py-4 px-4 text-content font-medium">{row.feature}</td>
                  <Cell value={row.ours} />
                  <Cell value={row.manual} />
                  <Cell value={row.others} />
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <p className="text-xs text-gray-400 mt-6 text-center">
          "Screenshot tools" refers to browser-extension-based capture plugins that produce flat, non-editable images.
        </p>
      </div>
    </section>
  );
};
