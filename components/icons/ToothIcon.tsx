import React from 'react';

/**
 * A component that displays the "32 Shade Dental" logo.
 * Replaces the original generic tooth icon.
 * Updated colors to match the modern, dark purple glass morphism theme.
 */
export const ToothIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" aria-label="32 Shade Dental Logo" role="img">
    <style>{`.logo-font { font-family: Inter, Avenir, 'Helvetica Neue', 'Arial', sans-serif; font-weight: 900; }`}</style>
    
    {/* Right side block */}
    <g>
      {/* Top line */}
      <rect x="85" y="10" height="4" width="110" fill="rgba(139, 92, 246, 0.3)" rx="2" />

      {/* SHADE */}
      <text x="90" y="38" fontSize="30" className="logo-font" letterSpacing="-1.5">
        <tspan fill="#c4b5fd">S</tspan>
        <tspan fill="#ede9fe">HAD</tspan>
        <tspan fill="#c4b5fd">E</tspan>
      </text>

      {/* Tooth Icon */}
      <g transform="translate(115, 38) scale(0.65)">
        <path 
          d="M38.8,11.3c-2.5-1.6-5.6-2.2-8.6-1.4c-4.4,1.1-8.1,3.8-10.3,7.9c-2.2,4.1-3,8.7-2.3,13.4c1.1,4.6,3.8,8.7,7.9,11.3c4.1,2.6,8.9,3.6,13.5,2.5c4.6-1.1,8.7-3.8,11.3-7.9c2.6-4.1,3.6-8.9,2.5-13.5C51.9,21.5,49.2,17.4,45.1,14.8C43.3,13.6,41.1,12.4,38.8,11.3z"
          fill="none" 
          stroke="#a78bfa"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      
      {/* Bottom line */}
      <rect x="85" y="65" height="4" width="110" fill="rgba(139, 92, 246, 0.3)" rx="2" />
      
      {/* DENTAL */}
      <text x="100" y="90" fill="#c4b5fd" fontSize="28" className="logo-font" letterSpacing="-1">DENTAL</text>

    </g>

    {/* Left side "32" */}
    <text x="5" y="60" fill="#ddd6fe" fontSize="50" className="logo-font">32</text>
  </svg>
);