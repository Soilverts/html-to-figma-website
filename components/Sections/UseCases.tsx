import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const cases = [
    { title: "Legacy Migration", desc: "Rebuild old sites without starting from scratch." },
    { title: "Developer Handoff", desc: "Reverse engineer implementation back to design." },
    { title: "Competitor Analysis", desc: "Import competitor layouts to deconstruct patterns." },
    { title: "Design System", desc: "Bootstrap token libraries from existing CSS variables." },
];

export const UseCases: React.FC<{ id: string }> = ({ id }) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-35%"]);

    return (
        <section id={id} ref={targetRef} className="h-[300vh] bg-surface-dark relative">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                
                <div className="absolute top-20 left-12 z-0">
                    <h2 className="text-9xl font-black text-gray-200/50 select-none pointer-events-none">CASES</h2>
                </div>

                <motion.div style={{ x }} className="flex gap-12 px-12 md:px-32 items-center relative z-10">
                    <div className="min-w-[300px] pr-12">
                         <h3 className="text-3xl font-bold text-content mb-4 tracking-tight">
                            Built for <br /><span className="text-accent">Design Operations</span>
                        </h3>
                        <p className="text-content-muted">One plugin, endless utility.</p>
                    </div>

                    {cases.map((c, i) => (
                        <div key={i} className="group relative h-[420px] w-[320px] bg-white p-10 flex flex-col justify-between border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-500">
                            <div className="text-4xl font-light text-gray-200 font-mono">0{i + 1}</div>
                            <div>
                                <h4 className="text-2xl font-bold text-content mb-4 tracking-tight">{c.title}</h4>
                                <p className="text-content-muted leading-relaxed text-sm">{c.desc}</p>
                            </div>
                            <div className="w-8 h-1 bg-gray-100 group-hover:bg-accent transition-colors duration-300" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};