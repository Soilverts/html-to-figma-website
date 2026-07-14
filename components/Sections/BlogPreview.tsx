import React from 'react';
import { ArrowRight } from 'lucide-react';

const posts = [
  {
    href: '/blog/how-to-convert-html-to-figma',
    label: 'Tutorial · 8 min read',
    title: 'How to Convert HTML to Figma: A Developer\'s Guide',
    description: 'Paste rendered HTML for native layers, or use public URL capture when you need an entire deployed page.',
    tags: 'html2design · tutorial',
    date: 'Mar 16, 2026',
    datetime: '2026-03-16',
  },
  {
    href: '/blog/import-website-into-figma',
    label: 'Tutorial · 7 min read',
    title: 'How to Import a Website into Figma',
    description: 'Two methods compared: Chrome extension vs HTML code paste. Covers localhost, staging environments, and auth-gated dashboards.',
    tags: 'web-to-figma · tutorial',
    date: 'Mar 17, 2026',
    datetime: '2026-03-17',
  },
  {
    href: '/blog/react-component-to-figma',
    label: 'Tutorial · 8 min read',
    title: 'How to Convert React Components to Figma Designs',
    description: 'React renders to HTML — and that output converts to editable Figma layers in seconds. Covers Storybook, Next.js, and Tailwind.',
    tags: 'react · tutorial',
    date: 'Mar 18, 2026',
    datetime: '2026-03-18',
  },
];

export const BlogPreview: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id} className="py-20 md:py-28 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-accent mb-3">From Our Blog</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-content leading-tight">
              Figma Workflow<br className="hidden sm:block" /> Guides &amp; Tips
            </h2>
          </div>
          <a
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-content-muted hover:text-accent transition-colors font-medium"
          >
            All articles <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post) => (
            <article
              key={post.href}
              className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-accent/30 hover:shadow-md transition-all duration-200"
            >
              <a href={post.href} className="block h-full flex flex-col">
                <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-3">{post.label}</p>
                <h3 className="text-base font-bold tracking-tight text-content mb-3 group-hover:text-accent transition-colors leading-snug flex-1">
                  {post.title}
                </h3>
                <p className="text-sm text-content-muted leading-relaxed mb-4 line-clamp-3">
                  {post.description}
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <time dateTime={post.datetime} className="text-xs text-gray-600 font-mono">{post.date}</time>
                  <span className="text-gray-200">·</span>
                  <span className="text-xs text-gray-600">{post.tags}</span>
                </div>
              </a>
            </article>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <a href="/blog" className="inline-flex items-center gap-1.5 text-sm text-content-muted hover:text-accent transition-colors font-medium">
            All articles <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};
