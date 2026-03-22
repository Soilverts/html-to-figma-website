import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How does HTML to Figma work?",
    answer: "HTML to Figma works in three simple steps: (1) Input \u2014 select an HTML file or paste raw HTML/CSS code, (2) Configure \u2014 adjust scale and import settings, (3) Generate \u2014 receive native, editable Figma layers. The plugin parses your HTML structure and CSS styles using Figma\u2019s Plugin API, then recreates them as clean frames, text layers, and vector shapes. The entire process takes under 2 minutes compared to 2\u20134 hours of manual recreation."
  },
  {
    question: "Does HTML to Figma preserve CSS layouts like Flexbox?",
    answer: "Yes. HTML to Figma can optionally convert CSS Flexbox layouts (as defined in the W3C CSS Flexible Box Layout Module) into Figma\u2019s native Auto-Layout system when enabled in settings. Your flex-direction, align-items, justify-content, gap, and padding are mapped to corresponding Auto-Layout properties."
  },
  {
    question: "What typography features are preserved when converting HTML to Figma?",
    answer: "HTML to Figma preserves font families, font weights, font sizes, line-heights, letter-spacing, and text alignment per the CSS Fonts Module Level 4 specification. If a font is not available in Figma, it falls back to Inter Regular with a warning."
  },
  {
    question: "How much does HTML to Figma cost?",
    answer: "HTML to Figma offers two pricing plans: a Monthly plan at $12/month for flexible short sprints, and a Yearly plan at $96/year ($8/month equivalent) which includes priority support. Both plans include unlimited imports and full typography preservation."
  },
  {
    question: "What are the main use cases for HTML to Figma?",
    answer: "HTML to Figma is used for four primary workflows: (1) Legacy Migration \u2014 rebuild old websites in Figma without starting from scratch, saving an estimated 2\u20134 hours per page, (2) Developer Handoff \u2014 reverse engineer implementations back into design files, (3) Competitor Analysis \u2014 import competitor layouts to deconstruct design patterns and spacing systems, (4) Design Kickstart \u2014 import existing page layouts as a starting point for design iteration."
  },
  {
    question: "Does HTML to Figma handle images and SVGs?",
    answer: "Yes. HTML to Figma preserves high-resolution image fills and imports SVG elements as native Figma vector paths rather than rasterized images. This ensures your imported designs remain fully scalable and editable within Figma."
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
    answer: "HTML to Figma takes a code-first approach: you paste HTML/CSS directly into the plugin, so no browser extension is required and no live URL is needed. This means it works with local development builds, unreleased components, email templates, and any HTML that isn't publicly accessible. URL-based tools are limited to pages that are already live on the web."
  },
  {
    question: "Can I use HTML to Figma with VS Code or my IDE?",
    answer: "Yes. Open your component or page in a browser preview (for example, a local dev server or Storybook), then use browser DevTools to copy the rendered HTML of the element you want to import. Paste that HTML directly into the HTML to Figma plugin in Figma. The workflow is IDE-agnostic and works with any editor or framework."
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
