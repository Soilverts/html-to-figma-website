import React from 'react';
import { motion } from 'framer-motion';

const cases = [
    { title: "Claude → Figma", desc: "Claude Artifacts and Claude Code generate real HTML & CSS. Bring that AI-designed UI into Figma as native, editable layers in seconds.", href: "/use-cases/claude-to-figma" },
    { title: "v0 → Figma", desc: "Vercel v0 ships React + Tailwind. Convert the rendered output into best-effort editable Figma layers — no manual rebuild.", href: "/use-cases/v0-to-figma" },
    { title: "Legacy Migration", desc: "Rebuild old websites in Figma without starting from scratch. Import existing layouts and iterate directly in your design tool.", href: "/use-cases/legacy-migration" },
    { title: "Developer Handoff", desc: "Reverse engineer live implementations back into editable design files. Bridge the gap between what was coded and what was designed.", href: "/use-cases/developer-handoff" },
    { title: "Competitor Analysis", desc: "Import competitor layouts to deconstruct design patterns, spacing systems, and component hierarchies.", href: null },
    { title: "Design Kickstart", desc: "Import existing page layouts into Figma as a starting point, then refine and build your design system on top.", href: null },
];

export const UseCases: React.FC<{ id: string }> = ({ id }) => {
    return (
        <section id={id} aria-label="Use cases for HTML to Figma" className="relative py-16 md:py-24 bg-white scroll-mt-24">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="flex flex-col lg:flex-row justify-between mb-12 md:mb-16 gap-6 md:gap-8 lg:items-end">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1] text-content">
                            Built for <br className="hidden md:block" />
                            <span className="text-gray-500">Design Operations.</span>
                        </h2>
                    </div>
                    <div className="lg:max-w-sm pb-2">
                        <p className="text-content-muted text-base md:text-lg font-light leading-relaxed">
                            One plugin, endless utility. From legacy migration to design system bootstrapping.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cases.map((c, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            key={i}
                            className="group p-8 md:p-12 border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200 hover:shadow-xl hover:shadow-black/5 rounded-3xl transition-all duration-500 flex flex-col justify-between min-h-[250px]"
                        >
                            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-8 shadow-sm">
                                <span className="font-mono text-xs font-bold text-gray-400">0{i + 1}</span>
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-content mb-3 md:mb-4 group-hover:text-accent transition-colors">
                                    {c.href ? (
                                        <a href={c.href} className="hover:text-accent transition-colors no-underline text-content">
                                            {c.title}
                                        </a>
                                    ) : c.title}
                                </h3>
                                <p className="text-content-muted text-sm md:text-base font-light leading-relaxed">
                                    {c.desc}
                                </p>
                                {c.href && (
                                    <a href={c.href} className="inline-flex items-center gap-1 mt-4 text-xs font-mono text-accent hover:underline">
                                        Learn more &rarr;
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
