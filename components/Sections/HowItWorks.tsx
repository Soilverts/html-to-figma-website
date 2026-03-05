import React from 'react';
import { motion } from 'framer-motion';

export const HowItWorks: React.FC<{ id: string }> = ({ id }) => {
    return (
        <section id={id} className="relative py-32 md:py-48 bg-surface-dark text-content overflow-hidden">
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
                    className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-content mb-8"
                >
                    A fluid workflow.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xl md:text-2xl text-content-muted font-light leading-relaxed mb-20"
                >
                    Skip the tedious setup. Copy raw HTML from your inspector or open a local file. The engine instantly repaints the browser DOM onto your canvas in one seamless motion.
                </motion.p>

                {/* Elegant subtle line animation */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                    className="relative w-full max-w-xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"
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
            </div>
        </section>
    );
};