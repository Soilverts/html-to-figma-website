import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CTA: React.FC<{ id: string }> = ({ id }) => {
    return (
        <section id={id} className="relative py-20 md:py-32 bg-white flex flex-col items-center justify-center border-t border-gray-100 overflow-hidden">
            <div className="container mx-auto px-6 text-center max-w-4xl z-10">
                <h2 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-content mb-6 md:mb-8">
                    Design <br /><span className="text-gray-500">Waitless.</span>
                </h2>
                <p className="text-base md:text-xl text-content-muted max-w-2xl mx-auto mb-10 md:mb-12 font-light">
                    Start with 10 trial conversions. Import a public URL or supply HTML from your own workflow.
                </p>

                <div className="flex flex-col items-center gap-6">
                    <a href="#pricing" className="group relative inline-flex items-center justify-center px-12 py-6 font-bold text-lg text-white transition-all duration-300 bg-content rounded-full hover:bg-black hover:scale-105 hover:shadow-2xl hover:shadow-black/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                        <span className="mr-8">Get Access</span>
                        <div className="absolute right-2 top-2 bottom-2 aspect-square bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white transition-colors duration-300 delay-100">
                            <ArrowRight size={20} className="text-white group-hover:text-black transition-colors duration-300 delay-100" />
                        </div>
                    </a>
                </div>

                <footer className="mt-20 md:mt-32 pt-8 md:pt-12 border-t border-gray-200 w-full flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-gray-500 font-mono tracking-widest uppercase">
                    <p>&copy; 2026 HTML to Figma.</p>
                    <div className="flex gap-8 mt-6 md:mt-0">
                        <a href="https://www.figma.com/community/plugin/1591359863857120491/jesse-html-to-figma-import-websites-as-editable-designs-web-css-html" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Figma Plugin</a>
                        <a href="/guide" className="hover:text-accent transition-colors">Guide</a>
                        <a href="/blog" className="hover:text-accent transition-colors">Blog</a>
                        <a href="/glossary" className="hover:text-accent transition-colors">Glossary</a>
                        <a href="/alternatives" className="hover:text-accent transition-colors">Alternatives</a>
                        <a href="/compare" className="hover:text-accent transition-colors">Compare</a>
                        <a href="/changelog" className="hover:text-accent transition-colors">Changelog</a>
                        <a href="/about" className="hover:text-accent transition-colors">About</a>
                        <a href="/privacy" className="hover:text-accent transition-colors">Privacy</a>
                        <a href="/terms" className="hover:text-accent transition-colors">Terms</a>
                        <a href="/contact" className="hover:text-accent transition-colors">Contact</a>
                    </div>
                </footer>
            </div>

            {/* Minimalist Background Accents */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-gray-100 to-transparent w-full z-0" />
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-gray-100 to-transparent h-full z-0" />
        </section>
    );
};
