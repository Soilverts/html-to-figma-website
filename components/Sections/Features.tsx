import React from 'react';
import { Layers, Type, Image as ImageIcon, Layout, Box, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const featureData = [
  {
    title: "Vector Production",
    desc: "Clean vector rectangles and frames, never rasterized.",
    icon: <Box strokeWidth={1.5} size={22} />
  },
  {
    title: "Typography Mirroring",
    desc: "Font families, line-heights, and kerning fully preserved.",
    icon: <Type strokeWidth={1.5} size={22} />
  },
  {
    title: "Auto-Layout Ready",
    desc: "Flexbox & Grid translated to Auto-Layout automatically.",
    icon: <Layout strokeWidth={1.5} size={22} />
  },
  {
    title: "Color Styles",
    desc: "Extracts CSS variables into a local Figma palette.",
    icon: <Palette strokeWidth={1.5} size={22} />
  },
  {
    title: "Image Handling",
    desc: "High-res fills preserved. SVGs imported as paths.",
    icon: <ImageIcon strokeWidth={1.5} size={22} />
  },
  {
    title: "Component Detection",
    desc: "Identifies repeating patterns to suggest Components.",
    icon: <Layers strokeWidth={1.5} size={22} />
  }
];

export const Features: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id} className="relative py-32 bg-surface">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-content mb-6">
              Precision in every pixel.
            </h2>
            <p className="text-content-muted text-lg font-light leading-relaxed max-w-xl">
              Designed for professionals who demand exact replicas of their code in their design tools. No approximations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureData.map((f, i) => (
            <FeatureCard key={i} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, desc, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card className="h-full border-transparent hover:border-accent/20 bg-white shadow-soft hover:shadow-lg transition-all duration-500">
        <CardHeader className="pb-4">
          <div className="mb-4 text-content w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100">
            {icon}
          </div>
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-content-muted leading-relaxed text-sm">{desc}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}