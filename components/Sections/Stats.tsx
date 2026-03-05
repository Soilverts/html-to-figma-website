import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: "6", label: "Core features", detail: "Typography, layout, images, SVGs, styles, and structure" },
  { value: "Native", label: "Figma layers", detail: "Real frames and text — not flattened screenshots" },
  { value: "Flex", label: "Auto-Layout support", detail: "CSS Flexbox optionally mapped to Figma Auto-Layout" },
  { value: "SVG", label: "Vector import", detail: "SVG elements imported as editable Figma vector paths" },
];

export const Stats: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id} aria-label="HTML to Figma key capabilities" className="relative py-24 bg-gray-950 text-white">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            What you get out of the box.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            HTML to Figma converts your code into native, editable Figma layers — preserving typography, styling, images, and structure so you can iterate in your design tool immediately.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-gray-300 mb-1">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
