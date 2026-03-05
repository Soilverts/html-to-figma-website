import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: "6", label: "Core features", detail: "Typography, layout, images, SVGs, styles, and structure" },
  { value: "Native", label: "Figma layers", detail: "Real frames and text — not flattened screenshots" },
  { value: "Flex", label: "Auto-Layout", detail: "CSS Flexbox optionally mapped to Figma Auto-Layout" },
  { value: "SVG", label: "Vector import", detail: "SVG elements imported as editable Figma vector paths" },
];

export const Stats: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id} aria-label="HTML to Figma plugin capabilities - native layers, typography, Auto-Layout, and SVG vector import" className="relative py-16 md:py-24 bg-gray-950 text-white overflow-hidden scroll-mt-24">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="mb-12 md:mb-20 md:flex justify-between items-end border-b border-gray-800 pb-8 md:pb-10">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-black tracking-tighter mb-4 md:mb-0 max-w-2xl leading-[1]">
            Everything out<br /> of the box.
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xs font-light leading-relaxed">
            Converts code into native layers — preserving typography, styling, images, and structure instantly.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-12 gap-y-10 md:gap-y-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col group"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter text-white mb-2 md:mb-4 group-hover:text-accent transition-colors duration-500">
                {stat.value}
              </div>
              <div className="w-8 h-px bg-gray-800 mb-3 md:mb-5 group-hover:bg-accent transition-colors duration-500"></div>
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-300 mb-2 md:mb-3">{stat.label}</div>
              <div className="text-[11px] md:text-sm text-gray-500 font-light leading-relaxed max-w-[200px]">{stat.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
