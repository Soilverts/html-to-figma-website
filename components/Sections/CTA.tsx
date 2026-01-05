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
                    Join 50,000+ teams bridging the gap between development and design.
                </p>

                <div className="flex flex-col items-center gap-6">
                    <button className="px-10 py-5 bg-accent text-white font-bold text-lg hover:bg-accent-dark transition-all duration-300 shadow-xl shadow-accent/20 flex items-center gap-3 rounded-full">
                        Install Plugin Free
                        <ArrowRight size={20} />
                    </button>
                    <a href="#" className="text-sm font-medium text-gray-500 hover:text-black transition-colors border-b border-transparent hover:border-black pb-0.5">
                        View on GitHub
                    </a>
                </div>

                <div className="mt-24 pt-8 border-t border-gray-100 w-full flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 font-mono">
                    <p>© 2026 HTML to Figma.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-black">Privacy</a>
                        <a href="#" className="hover:text-black">Terms</a>
                        <a href="#" className="hover:text-black">Contact</a>
                    </div>
                </div>
            </div>
        </section>
    );
};