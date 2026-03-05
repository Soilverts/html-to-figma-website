import React from 'react';
import { motion } from 'framer-motion';

const cases = [
    { title: "Legacy Migration", desc: "Rebuild old websites in Figma without starting from scratch. Import existing layouts and iterate directly in your design tool." },
    { title: "Developer Handoff", desc: "Reverse engineer live implementations back into editable design files. Bridge the gap between what was coded and what was designed." },
    { title: "Competitor Analysis", desc: "Import competitor layouts to deconstruct design patterns, spacing systems, and component hierarchies." },
    { title: "Design Kickstart", desc: "Import existing page layouts into Figma as a starting point, then refine and build your design system on top." },
];

export const UseCases: React.FC<{ id: string }> = ({ id }) => {
    return (
        <section id={id} aria-label="Use cases for HTML to Figma" className="relative py-32 bg-surface-dark">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-xl">
                        <span className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-4 block">Use Cases</span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-content mb-6">
                            Built for{' '}
                            <span className="text-accent">Design Operations.</span>
                        </h2>
                        <p className="text-content-muted text-lg font-light leading-relaxed">
                            One plugin, endless utility. From legacy migration to design system bootstrapping.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cases.map((c, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="group relative bg-white p-10 flex flex-col justify-between border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:border-accent/20"
                        >
                            <div className="text-5xl font-light text-gray-200 font-mono mb-8">0{i + 1}</div>
                            <div>
                                <h3 className="text-xl font-bold text-content mb-3 tracking-tight">{c.title}</h3>
                                <p className="text-content-muted leading-relaxed text-sm">{c.desc}</p>
                            </div>
                            <div className="w-8 h-1 bg-gray-100 group-hover:bg-accent transition-colors duration-300 mt-8" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
