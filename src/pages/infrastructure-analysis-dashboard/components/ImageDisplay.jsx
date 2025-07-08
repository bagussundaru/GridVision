import React, { useRef, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ImageDisplay = ({ 
  imageUrl, 
  results, 
  isAnalyzing, 
  mode,
  videoRef,
  canvasRef 
}) => {
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const getBoundingBoxStyle = (bbox, imageElement, containerElement) => {
    if (!imageElement || !containerElement) return {};
    
    const imageRect = imageElement.getBoundingClientRect();
    const containerRect = containerElement.getBoundingClientRect();
    
    // Calculate the actual displayed image dimensions (considering object-fit: contain)
    const imageAspectRatio = imageElement.naturalWidth / imageElement.naturalHeight;
    const containerAspectRatio = containerElement.offsetWidth / containerElement.offsetHeight;
    
    let displayedWidth, displayedHeight, offsetX, offsetY;
    
    if (imageAspectRatio > containerAspectRatio) {
      // Image is wider than container
      displayedWidth = containerElement.offsetWidth;
      displayedHeight = containerElement.offsetWidth / imageAspectRatio;
      offsetX = 0;
      offsetY = (containerElement.offsetHeight - displayedHeight) / 2;
    } else {
      // Image is taller than container
      displayedWidth = containerElement.offsetHeight * imageAspectRatio;
      displayedHeight = containerElement.offsetHeight;
      offsetX = (containerElement.offsetWidth - displayedWidth) / 2;
      offsetY = 0;
    }
    
    // Convert normalized coordinates to pixel coordinates
    const left = offsetX + (bbox.x * displayedWidth);
    const top = offsetY + (bbox.y * displayedHeight);
    const width = bbox.width * displayedWidth;
    const height = bbox.height * displayedHeight;
    
    return {
      position: 'absolute',
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
      border: '2px solid',
      borderColor: getBoundingBoxColor(bbox.severity),
      backgroundColor: `${getBoundingBoxColor(bbox.severity)}20`,
      borderRadius: '4px',
      pointerEvents: 'none'
    };
  };

  const getBoundingBoxColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'var(--color-error)';
      case 'high':
        return 'var(--color-warning)';
      case 'medium':
        return 'var(--color-accent)';
      case 'low':
        return 'var(--color-success)';
      default:
        return 'var(--color-secondary)';
    }
  };

  useEffect(() => {
    // Force re-render of bounding boxes when results change
    if (results && results.length > 0 && imageRef.current && containerRef.current) {
      const timer = setTimeout(() => {
        // Trigger a re-render to ensure bounding boxes are positioned correctly
        const event = new Event('resize');
        window.dispatchEvent(event);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [results]);

  if (mode === 'camera') {
    return (
      <div className="relative w-full h-full bg-secondary-900 rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        <canvas
          ref={canvasRef}
          className="hidden"
        />
        
        {/* Camera overlay UI */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 bg-black bg-opacity-50 rounded-lg px-3 py-2">
            <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">LIVE</span>
          </div>
          <div className="bg-black bg-opacity-50 rounded-lg px-3 py-2">
            <span className="text-white text-sm">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
        
        {/* Bounding boxes for camera mode */}
        {results && results.length > 0 && results.map((result, index) => (
          <div
            key={index}
            style={getBoundingBoxStyle(result.bbox, videoRef.current, containerRef.current)}
          >
            <div className="absolute -top-6 left-0 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {result.label} ({Math.round(result.confidence * 100)}%)
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="w-full h-full bg-secondary-50 border-2 border-dashed border-border rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Icon name="ImageIcon" size={64} color="var(--color-secondary-400)" strokeWidth={1} className="mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No Image Selected</h3>
          <p className="text-text-secondary">
            Upload an image or start camera feed to begin analysis
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-secondary-50 rounded-lg overflow-hidden"
    >
      <Image
        ref={imageRef}
        src={imageUrl}
        alt="Infrastructure analysis target"
        className="w-full h-full object-contain"
      />
      
      {/* Analysis overlay */}
      {isAnalyzing && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-surface rounded-lg p-6 shadow-modal">
            <div className="flex items-center space-x-3">
              <div className="animate-spin">
                <Icon name="Loader2" size={24} color="var(--color-primary)" strokeWidth={2} />
              </div>
              <span className="text-text-primary font-medium">Analyzing image...</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Bounding boxes */}
      {results && results.length > 0 && results.map((result, index) => (
        <div
          key={index}
          style={getBoundingBoxStyle(result.bbox, imageRef.current, containerRef.current)}
        >
          <div className="absolute -top-6 left-0 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {result.label} ({Math.round(result.confidence * 100)}%)
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageDisplay;