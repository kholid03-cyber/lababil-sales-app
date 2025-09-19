import React from 'react';

export default function LababilLogo({ 
  size = 24, 
  className = "", 
  showText = false, 
  variant = "default" // "default", "gradient", "white"
}) {
  const logoColors = {
    default: "text-blue-600",
    gradient: "text-white",
    white: "text-white"
  };

  const colorClass = logoColors[variant] || logoColors.default;

  return (
    <div className={`flex items-center ${className}`}>
      {/* Logo SVG */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 32 32" 
        className={colorClass}
      >
        {/* L Shape */}
        <rect x="3" y="6" width="4" height="16" fill="currentColor"/>
        <rect x="3" y="18" width="8" height="4" fill="currentColor"/>
        
        {/* B Shape with camera lens */}
        <rect x="14" y="6" width="4" height="16" fill="currentColor"/>
        <rect x="14" y="6" width="8" height="4" fill="currentColor"/>
        <rect x="14" y="12" width="6" height="3" fill="currentColor"/>
        <rect x="14" y="18" width="8" height="4" fill="currentColor"/>
        
        {/* Camera lens circle */}
        <circle cx="26" cy="14" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="26" cy="14" r="1.5" fill="currentColor"/>
        
        {/* Small molecular structure accent (4 dots) */}
        <circle cx="28" cy="8" r="1" fill="currentColor" opacity="0.8"/>
        <circle cx="26" cy="6" r="0.8" fill="currentColor" opacity="0.6"/>
        <circle cx="24" cy="8" r="0.6" fill="currentColor" opacity="0.4"/>
        <line x1="28" y1="8" x2="26" y2="6" stroke="currentColor" strokeWidth="0.5" opacity="0.6"/>
        <line x1="26" y1="6" x2="24" y2="8" stroke="currentColor" strokeWidth="0.5" opacity="0.6"/>
      </svg>
      
      {/* Text Logo */}
      {showText && (
        <div className="ml-3">
          <div className={`font-bold text-lg leading-tight ${colorClass}`}>
            LABABIL
          </div>
          <div className={`text-sm leading-tight ${colorClass} opacity-80`}>
            SOLUTION
          </div>
        </div>
      )}
    </div>
  );
}

// Watermark version for print
export function LababilWatermark({ opacity = 0.05, size = 200 }) {
  return (
    <svg 
      width={size} 
      height={size * 0.6} 
      viewBox="0 0 200 120" 
      style={{ opacity }}
    >
      <defs>
        <linearGradient id="watermarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: "#1e40af", stopOpacity: opacity}} />
          <stop offset="100%" style={{stopColor: "#3b82f6", stopOpacity: opacity * 0.5}} />
        </linearGradient>
      </defs>
      
      {/* Larger L Shape */}
      <rect x="20" y="20" width="25" height="60" fill="url(#watermarkGrad)"/>
      <rect x="20" y="65" width="40" height="15" fill="url(#watermarkGrad)"/>
      
      {/* Larger B Shape with camera lens */}
      <rect x="70" y="20" width="25" height="60" fill="url(#watermarkGrad)"/>
      <rect x="70" y="20" width="35" height="15" fill="url(#watermarkGrad)"/>
      <rect x="70" y="42" width="30" height="12" fill="url(#watermarkGrad)"/>
      <rect x="70" y="65" width="35" height="15" fill="url(#watermarkGrad)"/>
      
      {/* Camera lens circle */}
      <circle cx="125" cy="50" r="15" fill="none" stroke="url(#watermarkGrad)" strokeWidth="3"/>
      <circle cx="125" cy="50" r="8" fill="url(#watermarkGrad)"/>
      
      {/* Molecular structure */}
      <circle cx="135" cy="35" r="2" fill="url(#watermarkGrad)" opacity="0.8"/>
      <circle cx="130" cy="30" r="1.5" fill="url(#watermarkGrad)" opacity="0.6"/>
      <circle cx="125" cy="35" r="1" fill="url(#watermarkGrad)" opacity="0.4"/>
      <line x1="135" y1="35" x2="130" y2="30" stroke="url(#watermarkGrad)" strokeWidth="1" opacity="0.6"/>
      <line x1="130" y1="30" x2="125" y2="35" stroke="url(#watermarkGrad)" strokeWidth="1" opacity="0.6"/>
      
      {/* Text */}
      <text x="20" y="100" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="url(#watermarkGrad)">
        LABABIL
      </text>
      <text x="20" y="115" fontFamily="Arial, sans-serif" fontSize="12" fill="url(#watermarkGrad)">
        SOLUTION
      </text>
    </svg>
  );
}

// Logo variations for different uses
export const LogoVariants = {
  Header: (props) => <LababilLogo size={24} showText={true} variant="gradient" {...props} />,
  Print: (props) => <LababilLogo size={48} showText={true} variant="default" {...props} />,
  Footer: (props) => <LababilLogo size={32} showText={false} variant="default" {...props} />,
  Watermark: (props) => <LababilWatermark {...props} />
};
