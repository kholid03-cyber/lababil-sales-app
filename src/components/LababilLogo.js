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
      {/* New Logo SVG - Updated with L containing B design */}
      <svg 
        width={size} 
        height={size * 0.75} // Adjust ratio to match new logo proportions
        viewBox="0 0 400 300" 
        className={colorClass}
      >
        <defs>
          {/* Gradients for 3D effect */}
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
          </linearGradient>
          
          <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.7" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        
        {/* Letter L (3D Blue) - Outer structure */}
        <path d="M50 50 L50 150 L150 150 L150 130 L70 130 L70 50 Z" fill="url(#blueGrad)" stroke="currentColor" strokeWidth="1" opacity="0.9"/>
        
        {/* Letter B (3D Silver) - Inside the L - Raised position */}
        {/* Main vertical bar of B */}
        <path d="M78 55 L78 115 L98 115 L98 55 Z" fill="url(#silverGrad)" strokeWidth="1"/>
        
        {/* Top horizontal section of B */}
        <path d="M78 55 L118 55 Q125 55 125 65 Q125 72 120 75 Q115 77 110 77 L78 77 Z" fill="url(#silverGrad)" strokeWidth="1"/>
        
        {/* Middle divider */}
        <path d="M78 77 L108 77 L108 83 L78 83 Z" fill="url(#silverGrad)" strokeWidth="1"/>
        
        {/* Bottom horizontal section of B */}
        <path d="M78 83 L130 83 Q145 83 145 100 Q145 110 140 115 Q135 115 125 115 L78 115 Z" fill="url(#silverGrad)" strokeWidth="1"/>
        
        {/* Add subtle highlight on B for 3D effect */}
        <path d="M80 57 L80 113 L85 113 L85 57 Z" fill="currentColor" opacity="0.3"/>
        <path d="M80 57 L115 57 Q120 57 120 62 Q120 65 118 67 L80 67 Z" fill="currentColor" opacity="0.2"/>
        <path d="M80 85 L127 85 Q135 85 135 93 Q135 100 130 103 L80 103 Z" fill="currentColor" opacity="0.2"/>
        
        {/* Camera lens outer circle - positioned in bottom part of B */}
        <circle cx="115" cy="100" r="10" fill="none" stroke="url(#silverGrad)" strokeWidth="2"/>
        
        {/* Camera lens inner circle */}
        <circle cx="115" cy="100" r="6" fill="url(#blueGrad)" strokeWidth="1"/>
        
        {/* Camera lens center */}
        <circle cx="115" cy="100" r="3" fill="currentColor"/>
        
        {/* Network elements - positioned inside top part of B */}
        <circle cx="95" cy="63" r="2" fill="currentColor" opacity="0.8"/>
        <circle cx="102" cy="61" r="1.5" fill="currentColor" opacity="0.6"/>
        <circle cx="107" cy="64" r="1.5" fill="currentColor" opacity="0.6"/>
        <circle cx="104" cy="69" r="1.5" fill="currentColor" opacity="0.6"/>
        
        {/* Connection lines for network */}
        <line x1="95" y1="63" x2="102" y2="61" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
        <line x1="102" y1="61" x2="107" y2="64" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
        <line x1="107" y1="64" x2="104" y2="69" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
        <line x1="104" y1="69" x2="95" y2="63" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      </svg>
      
      {/* Text Logo */}
      {showText && (
        <div className="ml-3">
          <div className={`font-bold text-lg leading-tight ${colorClass}`}>
            LABABIL
          </div>
          <div className={`text-sm leading-tight ${colorClass} opacity-80`}>
            solution
          </div>
        </div>
      )}
    </div>
  );
}

// Watermark version for print - Updated with new design
export function LababilWatermark({ opacity = 0.05, size = 200 }) {
  return (
    <svg 
      width={size} 
      height={size * 0.75} 
      viewBox="0 0 400 300" 
      style={{ opacity }}
    >
      <defs>
        <linearGradient id="watermarkBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: "#1e40af", stopOpacity: opacity}} />
          <stop offset="100%" style={{stopColor: "#3b82f6", stopOpacity: opacity * 0.5}} />
        </linearGradient>
        <linearGradient id="watermarkSilverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: "#6b7280", stopOpacity: opacity * 0.7}} />
          <stop offset="100%" style={{stopColor: "#9ca3af", stopOpacity: opacity * 0.4}} />
        </linearGradient>
      </defs>
      
      {/* Letter L - Outer structure */}
      <path d="M50 50 L50 150 L150 150 L150 130 L70 130 L70 50 Z" fill="url(#watermarkBlueGrad)"/>
      
      {/* Letter B - Inside the L */}
      <path d="M78 55 L78 115 L98 115 L98 55 Z" fill="url(#watermarkSilverGrad)"/>
      <path d="M78 55 L118 55 Q125 55 125 65 Q125 72 120 75 Q115 77 110 77 L78 77 Z" fill="url(#watermarkSilverGrad)"/>
      <path d="M78 77 L108 77 L108 83 L78 83 Z" fill="url(#watermarkSilverGrad)"/>
      <path d="M78 83 L130 83 Q145 83 145 100 Q145 110 140 115 Q135 115 125 115 L78 115 Z" fill="url(#watermarkSilverGrad)"/>
      
      {/* Camera lens */}
      <circle cx="115" cy="100" r="10" fill="none" stroke="url(#watermarkSilverGrad)" strokeWidth="2"/>
      <circle cx="115" cy="100" r="6" fill="url(#watermarkBlueGrad)"/>
      <circle cx="115" cy="100" r="3" fill="url(#watermarkBlueGrad)"/>
      
      {/* Network elements */}
      <circle cx="95" cy="63" r="2" fill="url(#watermarkBlueGrad)"/>
      <circle cx="102" cy="61" r="1.5" fill="url(#watermarkBlueGrad)"/>
      <circle cx="107" cy="64" r="1.5" fill="url(#watermarkBlueGrad)"/>
      <circle cx="104" cy="69" r="1.5" fill="url(#watermarkBlueGrad)"/>
      <line x1="95" y1="63" x2="102" y2="61" stroke="url(#watermarkBlueGrad)" strokeWidth="1"/>
      <line x1="102" y1="61" x2="107" y2="64" stroke="url(#watermarkBlueGrad)" strokeWidth="1"/>
      <line x1="107" y1="64" x2="104" y2="69" stroke="url(#watermarkBlueGrad)" strokeWidth="1"/>
      <line x1="104" y1="69" x2="95" y2="63" stroke="url(#watermarkBlueGrad)" strokeWidth="1"/>
      
      {/* Text */}
      <text x="50" y="200" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="url(#watermarkBlueGrad)">
        LABABIL
      </text>
      <text x="50" y="225" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="normal" fill="url(#watermarkSilverGrad)">
        solution
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
