import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const Pricing: React.FC<{ id: string }> = ({ id }) => {
    return (
        <section id={id} aria-label="HTML to Figma pricing plans" className="relative py-24 bg-white scroll-mt-24 border-t border-gray-100">
            <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-content mb-4">
                        Simple, transparent pricing.
                    </h2>
                    <p className="text-content-muted text-lg font-light">
                        Professional tools at a fraction of the manual cost.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <PriceCard
                        title="Monthly"
                        price="$12"
                        period="/mo"
                        description="Flexible for short sprints and single projects."
                        features={["Unlimited Imports", "Typography Mirroring"]}
                        checkoutUrl="https://gumroad.com/checkout?product=tqnzys&option=1kEWOYV-7AMz_YlmOADMRw%3D%3D&recurrence=monthly"
                    />
                    <PriceCard
                        title="Yearly"
                        price="$96"
                        period="/yr"
                        label="Most Popular"
                        description="Best for continuous design operations. Save 33%."
                        features={["Unlimited Imports", "Typography Mirroring", "Priority Support"]}
                        isPopular
                        checkoutUrl="https://gumroad.com/checkout?product=tqnzys&option=1kEWOYV-7AMz_YlmOADMRw%3D%3D&recurrence=yearly"
                    />
                </div>
            </div>
        </section>
    )
}

interface PriceCardProps {
    title: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    isPopular?: boolean;
    checkoutUrl: string;
    label?: string;
}

const PriceCard: React.FC<PriceCardProps> = ({ title, price, period, description, features, isPopular, checkoutUrl, label }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`relative flex flex-col h-full rounded-2xl p-8 border ${isPopular ? 'border-gray-900 shadow-xl' : 'border-gray-200'}`}
        >
            {label && (
                <div className="absolute top-0 right-8 -translate-y-1/2">
                    <span className="bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full">
                        {label}
                    </span>
                </div>
            )}

            <div className="mb-8">
                <h3 className="text-xl font-bold text-content mb-2">{title}</h3>
                <p className="text-sm text-content-muted min-h-[40px]">{description}</p>
            </div>

            <div className="mb-8">
                <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black tracking-tighter text-content">{price}</span>
                    <span className="text-content-muted font-medium">{period}</span>
                </div>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
                {features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-content-muted">
                        <Check size={18} className="shrink-0 text-gray-900" />
                        <span>{feat}</span>
                    </li>
                ))}
            </ul>

            <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="block w-full mt-auto">
                <button className={`w-full py-3.5 px-6 rounded-xl font-bold transition-all duration-200 ${isPopular ? 'bg-gray-900 text-white hover:bg-black hover:shadow-lg' : 'bg-white text-content border border-gray-200 hover:bg-gray-50'}`}>
                    {title === 'Monthly' ? 'Start Monthly' : 'Start Annual'}
                </button>
            </a>
        </motion.div>
    );
};