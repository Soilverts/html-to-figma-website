import React from 'react';

export const NoiseOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[5] pointer-events-none opacity-[0.07] mix-blend-overlay">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
                <feTurbulence 
                    type="fractalNoise" 
                    baseFrequency="0.85" 
                    numOctaves="3" 
                    stitchTiles="stitch" 
                />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
        <div className="absolute inset-0 bg-vignette" />
    </div>
  );
};