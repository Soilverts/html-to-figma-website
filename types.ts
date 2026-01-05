import React from 'react';

export interface SectionProps {
  id: string;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

export interface StepProps {
  number: string;
  title: string;
  description: string;
}