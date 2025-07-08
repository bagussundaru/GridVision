import React from 'react';

const PLNLogo = ({ className = "w-8 h-8", showText = false }) => {
  return (
    <div className={`flex items-center ${className}`}>
      {/* PLN Logo Image */}
      <img 
        src="/assets/images/image-1751736008269.png" 
        alt="PLN Logo"
        className="w-full h-full object-contain"
      />
      
      {/* Text PLN jika diminta */}
      {showText && (
        <span className="ml-2 font-bold text-pln-blue-dark text-lg">
          PLN
        </span>
      )}
    </div>
  );
};

export default PLNLogo;