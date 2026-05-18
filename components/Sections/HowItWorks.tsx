import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    { number: "01", title: "Input", desc: "Select an HTML file or paste raw HTML/CSS code directly into the Figma plugin." },
    { number: "02", title: "Configure", desc: "Set the scale factor. Images and fonts are imported automatically." },
    { number: "03", title: "Generate", desc: "Receive native, editable Figma layers \u2014 frames, text, vector paths, and image fills in under 2 minutes." },
];

export const HowItWorks: React.FC<{ id: string }> = ({ id }) => {
    return (
        <section id={id} aria-label="How to convert HTML to Figma in 3 steps" className="relative py-20 md:py-48 bg-surface-dark text-content overflow-hidden">
            {/* Soft Ambient Background Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                <div className="w-[80vw] max-w-[800px] h-[80vw] max-h-[800px] bg-blue-100/30 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-content mb-6 md:mb-8"
                >
                    A fluid workflow.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-2xl text-content-muted font-light leading-relaxed mb-12 md:mb-20"
                >
                    Skip the tedious setup. Copy raw HTML from your inspector or open a local file. The engine instantly repaints the browser DOM onto your canvas in one seamless motion.
                </motion.p>

                {/* Elegant subtle line animation */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                    className="relative w-full max-w-xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-16 md:mb-24"
                >
                    {/* Floating particle along the line */}
                    <motion.div
                        initial={{ left: "0%", opacity: 0 }}
                        animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                        transition={{
                            duration: 3,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: 0.5
                        }}
                        className="absolute top-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent via-accent to-transparent -ml-16"
                    />
                </motion.div>

                {/* 3-Step Process */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-left">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="group"
                        >
                            <div className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase mb-3 group-hover:text-accent transition-colors duration-500">
                                Step {step.number}
                            </div>
                            <div className="w-8 h-px bg-gray-300 mb-4 group-hover:bg-accent group-hover:w-12 transition-all duration-500" />
                            <h3 className="text-xl md:text-2xl font-medium tracking-tight text-content mb-3">
                                {step.title}
                            </h3>
                            <p className="text-sm md:text-base text-content-muted font-light leading-relaxed">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xs text-gray-400 font-mono mt-12 md:mt-16"
                >
                    Manual page recreation: 2\u20134 hours &middot; HTML to Figma: under 2 minutes &middot; 98% time reduction
                </motion.p>
            </div>
        </section>
    );
};
