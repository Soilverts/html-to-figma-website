import React from 'react';
import { motion } from 'framer-motion';

export const HowItWorks: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id} className="relative py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="mb-24 md:text-center">
            <h2 className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-4">Workflow</h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-content">Simplicity itself.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px bg-gray-200 z-0" />

            <Step 
                num="01" 
                title="Input" 
                desc="Provide a URL or paste raw HTML/CSS." 
            />
            <Step 
                num="02" 
                title="Configure" 
                desc="Adjust viewport and theme settings." 
            />
            <Step 
                num="03" 
                title="Generate" 
                desc="Receive native, editable Figma layers." 
            />
        </div>
      </div>
    </section>
  );
};

const Step = ({ num, title, desc }: { num: string, title: string, desc: string }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-start md:items-center md:text-center group"
    >
        <div className="w-16 h-16 bg-white border border-gray-200 text-content-muted rounded-full flex items-center justify-center text-sm font-mono font-bold mb-8 shadow-soft group-hover:border-accent group-hover:text-accent transition-colors duration-300">
            {num}
        </div>
        <h3 className="text-xl font-bold text-content mb-3">{title}</h3>
        <p className="text-content-muted max-w-[200px] text-sm leading-relaxed">{desc}</p>
    </motion.div>
);