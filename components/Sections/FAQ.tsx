import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How does HTML to Figma work?",
    answer: "HTML to Figma accepts pasted/file HTML or a public URL. Public URL capture offers Pixel mode for a lossless visual reference and Editable mode for best-effort native layers. Manual input creates editable frames, text, shapes, and images from supplied markup. Review fonts, media, and complex effects after conversion."
  },
  {
    question: "Does HTML to Figma preserve CSS layouts like Flexbox?",
    answer: "HTML to Figma reads computed positions and sizes from Flexbox layouts and maps supported geometry to measured Figma frames. Fonts, effects, responsive behavior, and complex layout can still differ, so compare the result with the browser. Flexbox containers become positioned frames rather than automatic Figma Auto Layout; apply Auto Layout manually when needed."
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
    answer: "HTML to Figma is used for four primary workflows: (1) Legacy Migration \u2014 start from an imported website instead of redrawing every layer, (2) Developer Handoff \u2014 compare implementation with design files, (3) Competitor Analysis \u2014 inspect layout and visual patterns, (4) Design Kickstart \u2014 use an existing page as a starting point for iteration."
  },
  {
    question: "Does HTML to Figma handle images and SVGs?",
    answer: "HTML to Figma preserves image fills and SVG content where supported. In URL capture, canvas, video, WebGL, and complex large SVG regions may be rasterized so visible content is not lost."
  },
  {
    question: "Can I convert React/JSX components to Figma?",
    answer: "Yes. Use public URL capture for a deployed React page. For localhost or Storybook, export a complete HTML document with its generated CSS and assets. Isolated outerHTML does not include CSS Module, Tailwind, or CSS-in-JS rules."
  },
  {
    question: "Does HTML to Figma support Tailwind CSS classes?",
    answer: "Yes, when the generated Tailwind stylesheet is available to the input. Use public URL capture or include the compiled CSS with a complete HTML document. Tailwind class names alone do not contain their visual values."
  },
  {
    question: "Can I sync my design system between code and Figma?",
    answer: "Yes. Export the rendered HTML of a component from your codebase, import it into Figma with HTML to Figma, and compare the resulting layers against your Figma design tokens and components. This workflow lets teams catch drift between the coded implementation and the design file without manual redrawing."
  },
  {
    question: "How does HTML to Figma compare with other website import tools?",
    answer: "HTML to Figma supports pasted or file-based HTML for local and private sources, plus public URL capture without a browser extension. Choose lossless Pixel mode for a visual reference or best-effort Editable mode for native layers."
  },
  {
    question: "Can I use HTML to Figma with VS Code or my IDE?",
    answer: "Yes. Use a public preview URL, or export a complete HTML document from your local project with its generated CSS and assets. The workflow is IDE-agnostic, but the supplied document must contain the styles required to render it."
  },
  {
    question: "Can I convert Claude, v0, or other AI-generated designs to Figma?",
    answer: "Yes. For a deployed AI-generated preview, use public URL capture. For private output, export a complete HTML document with CSS and assets. Supported text, fills, media, and measured frames can become editable Figma layers; fonts, effects, and complex layouts may require cleanup. Figma also offers an official Claude Code workflow through its MCP server."
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
