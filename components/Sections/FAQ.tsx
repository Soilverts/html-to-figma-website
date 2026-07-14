import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How does HTML to Figma work?",
    answer: "HTML to Figma works in three simple steps: (1) Input \u2014 select an HTML file or paste raw HTML/CSS code, (2) Configure \u2014 set the scale factor (images and fonts import automatically), (3) Generate \u2014 receive native, editable Figma layers. The plugin parses your HTML structure and CSS styles using Figma\u2019s Plugin API, then recreates them as clean frames, text layers, and vector shapes. The entire process takes under 2 minutes compared to 2\u20134 hours of manual recreation."
  },
  {
    question: "Does HTML to Figma preserve CSS layouts like Flexbox?",
    answer: "HTML to Figma reads computed CSS positions and sizes from your Flexbox layouts and recreates them as accurately positioned Figma frames. Each element\u2019s width, height, padding, and spacing are preserved in the resulting Figma layers. Note: Flexbox containers are converted to fixed-position frames, not Figma Auto-Layout. You can manually apply Auto-Layout in Figma after import if needed."
  },
  {
    question: "What typography features are preserved when converting HTML to Figma?",
    answer: "HTML to Figma preserves font families, font weights, font sizes, line-heights, letter-spacing, and text alignment per the CSS Fonts Module Level 4 specification. If a font is not available in Figma, it falls back to Inter Regular with a warning."
  },
  {
    question: "How much does HTML to Figma cost?",
    answer: "HTML to Figma costs $12/month or $96/year. Both plans include manual HTML import. Monthly includes up to 50 public URL captures per day; Yearly includes up to 200. The plugin includes 10 trial conversions before a license is required."
  },
  {
    question: "What are the main use cases for HTML to Figma?",
    answer: "HTML to Figma is used for four primary workflows: (1) Legacy Migration \u2014 rebuild old websites in Figma without starting from scratch, saving an estimated 2\u20134 hours per page, (2) Developer Handoff \u2014 reverse engineer implementations back into design files, (3) Competitor Analysis \u2014 import competitor layouts to deconstruct design patterns and spacing systems, (4) Design Kickstart \u2014 import existing page layouts as a starting point for design iteration."
  },
  {
    question: "Does HTML to Figma handle images and SVGs?",
    answer: "HTML to Figma preserves image fills and SVG content where supported. In URL capture, canvas, video, WebGL, and complex large SVG regions may be rasterized so visible content is not lost."
  },
  {
    question: "Can I convert React/JSX components to Figma?",
    answer: "Yes. Render your React component in the browser, then copy the resulting HTML from the page. Paste that HTML into the HTML to Figma plugin and it will generate native Figma layers — frames, text, and shapes — from your component's output. No special React integration is needed; the plugin works with any valid HTML regardless of how it was produced."
  },
  {
    question: "Does HTML to Figma support Tailwind CSS classes?",
    answer: "Yes. Tailwind utility classes are parsed the same way as any other CSS. The plugin reads computed styles from the browser's rendering engine, so it doesn't matter whether your styles come from Tailwind, plain CSS, or a CSS-in-JS library — the final visual output is what gets converted into Figma properties."
  },
  {
    question: "Can I sync my design system between code and Figma?",
    answer: "Yes. Export the rendered HTML of a component from your codebase, import it into Figma with HTML to Figma, and compare the resulting layers against your Figma design tokens and components. This workflow lets teams catch drift between the coded implementation and the design file without manual redrawing."
  },
  {
    question: "How does HTML to Figma compare to URL-based tools like html.to.design?",
    answer: "HTML to Figma supports both workflows without a browser extension. Paste HTML for localhost, private builds, and email templates, or enter a public URL and choose lossless Pixel mode or best-effort Editable mode."
  },
  {
    question: "Can I use HTML to Figma with VS Code or my IDE?",
    answer: "Yes. Open your component or page in a browser preview (for example, a local dev server or Storybook), then use browser DevTools to copy the rendered HTML of the element you want to import. Paste that HTML directly into the HTML to Figma plugin in Figma. The workflow is IDE-agnostic and works with any editor or framework."
  },
  {
    question: "Can I convert Claude, v0, or other AI-generated designs to Figma?",
    answer: "Yes — this is one of the most popular workflows. AI tools like Claude (Artifacts and Claude Code), Vercel v0, Bolt, Lovable, and ChatGPT all generate UI as HTML and CSS. Open the AI-generated UI in a browser (the live Artifact or preview, or a local dev server), copy the rendered HTML from DevTools, and paste it into the HTML to Figma plugin. The browser resolves all styles to computed values first, so the AI output transfers as native, editable Figma layers — text, vector paths, and pixel-accurate frames. See the dedicated Claude to Figma and v0 to Figma guides for step-by-step instructions."
  }
];

export const FAQ: React.FC<{ id: string }> = ({ id }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id={id} aria-label="Frequently asked questions about HTML to Figma" className="relative py-16 md:py-24 bg-white scroll-mt-24 border-t border-gray-100">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-content mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-content-muted text-base md:text-lg font-light mb-12 md:mb-16">
            Everything you need to know about converting HTML to Figma.
          </p>
        </motion.div>

        <div className="divide-y divide-gray-100">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="py-6"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-start justify-between gap-4 text-left group cursor-pointer"
                aria-expanded={openIndex === i}
              >
                <h3 className="text-base md:text-lg font-semibold text-content group-hover:text-accent transition-colors duration-300 pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  size={20}
                  className={`shrink-0 mt-1 text-gray-400 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-content-muted text-sm md:text-base font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
