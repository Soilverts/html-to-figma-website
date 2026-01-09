import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const Pricing: React.FC<{ id: string }> = ({ id }) => {
    return (
        <section id={id} className="relative py-32 bg-white border-t border-gray-100">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-content mb-4">Transparent Pricing.</h2>
                        <p className="text-content-muted text-lg">Professional tools at a fraction of the manual cost.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                    <PriceCard
                        title="Monthly"
                        price="$12"
                        period="/mo"
                        description="Flexible for short sprints."
                        features={["Unlimited Imports", "Typography Mirroring"]}
                        delay={0}
                        checkoutUrl="https://gumroad.com/checkout?product=tqnzys&option=1kEWOYV-7AMz_YlmOADMRw%3D%3D&recurrence=monthly"
                    />
                    <PriceCard
                        title="Yearly"
                        price="$96"
                        period="/yr"
                        description="Best for continuous teams."
                        features={["Unlimited Imports", "Typography Mirroring", "Priority Support"]}
                        isPopular
                        delay={0.1}
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
    delay: number;
    checkoutUrl: string;
}

const PriceCard: React.FC<PriceCardProps> = ({ title, price, period, description, features, isPopular, delay, checkoutUrl }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
        >
            <Card className={`relative flex flex-col h-full border-2 ${isPopular
                ? 'bg-gray-900 border-gray-900 text-white shadow-2xl'
                : 'bg-white border-gray-100 text-content hover:border-gray-200'
                }`}>
                {isPopular && (
                    <div className="absolute top-0 right-0 p-4">
                        <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-none backdrop-blur-md">Popular</Badge>
                    </div>
                )}

                <CardHeader className="pb-8">
                    <h3 className={`text-sm font-bold uppercase tracking-wider mb-2 ${isPopular ? 'text-gray-400' : 'text-gray-500'}`}>{title}</h3>
                    <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-bold tracking-tight">{price}</span>
                        <span className={`text-lg ${isPopular ? 'text-gray-500' : 'text-gray-400'}`}>{period}</span>
                    </div>
                    <p className={`mt-4 text-sm ${isPopular ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>
                </CardHeader>

                <CardContent className="flex-1">
                    <ul className="space-y-4">
                        {features.map((feat, i) => (
                            <li key={i} className={`flex items-start gap-3 text-sm font-medium ${isPopular ? 'text-gray-300' : 'text-gray-600'}`}>
                                <Check size={16} className={`shrink-0 mt-0.5 ${isPopular ? 'text-white' : 'text-black'}`} />
                                {feat}
                            </li>
                        ))}
                    </ul>
                </CardContent>

                <CardFooter className="pt-8">
                    <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button
                            size="lg"
                            variant={isPopular ? 'secondary' : 'default'}
                            className={`w-full font-bold ${isPopular ? 'bg-white text-black hover:bg-gray-100' : ''}`}
                        >
                            {isPopular ? 'Start Annual' : 'Start Monthly'}
                        </Button>
                    </a>
                </CardFooter>
            </Card>
        </motion.div>
    );
}