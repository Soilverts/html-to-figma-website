import React from 'react';
import { motion } from 'framer-motion';

export const Features: React.FC<{ id: string }> = ({ id }) => {

  return (
    <section id={id} aria-label="HTML to Figma key features - native Figma layers, typography preservation, and precise CSS styling" className="relative py-20 md:py-48 bg-white text-content overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
        <div className="flex flex-col items-center mb-16 md:mb-40">
          <motion.h2
            initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-center leading-[1.1]"
          >
            Retain the soul of <br />
            <span className="text-gray-300 italic">your architecture.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-sm md:text-base text-gray-400 font-light max-w-xl text-center mt-6"
          >
            Editable mode maps browser content to native Figma layers. Pixel mode preserves the rendered appearance when visual fidelity matters most.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 md:gap-y-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h3 className="text-xl md:text-3xl font-medium tracking-tight mb-4 md:mb-6">Native structures</h3>
            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
              Editable mode creates text, images, shapes, and grouped frames. Browser-only media and complex SVG regions may be rasterized when a native Figma equivalent is not reliable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="md:mt-32"
          >
            <h3 className="text-xl md:text-3xl font-medium tracking-tight mb-4 md:mb-6">Measured positioning</h3>
            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
              Pixel mode imports lossless raster tiles of the browser-rendered page. Editable mode reads computed positions and visual styles, then recreates them as best-effort Figma layers.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
