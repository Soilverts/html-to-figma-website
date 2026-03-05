import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CTA: React.FC<{ id: string }> = ({ id }) => {
    return (
        <section id={id} className="relative py-40 bg-white flex items-center justify-center border-t border-gray-100">
            <div className="container mx-auto px-6 text-center max-w-4xl z-10">
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-content mb-8">
                    Design <br /><span className="text-gray-200">Waitless.</span>
                </h2>
                <p className="text-xl text-content-muted max-w-xl mx-auto mb-12 font-light">
                    Join 2,000+ designers and developers bridging the gap between code and design.
                </p>

                <div className="flex flex-col items-center gap-6">
                    <a href="#pricing" className="px-10 py-5 bg-accent text-white font-bold text-lg hover:bg-accent-dark transition-all duration-300 shadow-xl shadow-accent/20 flex items-center gap-3 rounded-full">
                        Get Access
                        <ArrowRight size={20} />
                    </a>
                </div>

                <div className="mt-24 pt-8 border-t border-gray-100 w-full flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 font-mono">
                    <p>© 2026 HTML to Figma.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="/privacy" className="hover:text-black">Privacy</a>
                        <a href="/terms" className="hover:text-black">Terms</a>
                        <a href="/contact" className="hover:text-black">Contact</a>
                    </div>
                </div>
            </div>
        </section>
    );
};