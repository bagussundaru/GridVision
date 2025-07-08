import React, { useState, useRef, useCallback } from 'react';
import Icon from '../../../components/AppIcon';

const AnalysisViewport = ({ 
  mode, 
  selectedFile, 
  imageUrl, 
  results, 
  isAnalyzing,
  onFileSelect,
  onCameraStart,
  onCameraStop,
  onCaptureFrame,
  isStreaming,
  cameraError,
  videoRef,
  canvasRef 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onFileSelect(file, null);
      } else {
        onFileSelect(null, 'Please select a valid image file');
      }
    }
  }, [onFileSelect]);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        onFileSelect(file, null);
      } else {
        onFileSelect(null, 'Please select a valid image file');
      }
    }
  }, [onFileSelect]);

  const renderBoundingBoxes = () => {
    if (!results || results.length === 0) return null;

    return results.map((result, index) => (
      <div
        key={index}
        className="absolute border-2 border-cyan-400 bg-cyan-400/20 rounded"
        style={{
          left: `${result.bbox.x * 100}%`,
          top: `${result.bbox.y * 100}%`,
          width: `${result.bbox.width * 100}%`,
          height: `${result.bbox.height * 100}%`,
        }}
      >
        <div className="absolute -top-6 left-0 bg-cyan-400 text-slate-900 px-2 py-1 rounded text-xs font-medium">
          {result.label} ({Math.round(result.confidence * 100)}%)
        </div>
      </div>
    ));
  };

  const renderUploadInterface = () => (
    <div
      className={`relative h-full border-2 border-dashed rounded-lg transition-all ${
        dragActive
          ? 'border-cyan-400 bg-cyan-500/10' :'border-slate-600 bg-slate-900/50 hover:border-slate-500'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Upload" size={48} className="text-slate-400 mx-auto mb-4" />
          <p className="text-lg text-slate-300 mb-2">Upload Image or Video</p>
          <p className="text-sm text-slate-500 mb-4">
            Drag and drop files here, or click to select
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
          >
            Select Files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );

  const renderCameraInterface = () => (
    <div className="relative h-full bg-slate-900/50 rounded-lg overflow-hidden">
      {!isStreaming ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Icon name="Camera" size={48} className="text-slate-400 mx-auto mb-4" />
            <p className="text-lg text-slate-300 mb-2">Camera Feed</p>
            <p className="text-sm text-slate-500 mb-4">
              Start camera to begin live analysis
            </p>
            {cameraError && (
              <p className="text-red-400 text-sm mb-4">{cameraError}</p>
            )}
            <button
              onClick={onCameraStart}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
            >
              Start Camera
            </button>
          </div>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm rounded-lg px-3 py-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-white">LIVE</span>
          </div>
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <button
              onClick={onCaptureFrame}
              className="p-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
            >
              <Icon name="Camera" size={20} />
            </button>
            <button
              onClick={onCameraStop}
              className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              <Icon name="Square" size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );

  const renderImageDisplay = () => (
    <div className="relative h-full bg-slate-900/50 rounded-lg overflow-hidden">
      <img
        src={imageUrl}
        alt="Analysis target"
        className="w-full h-full object-contain"
      />
      {renderBoundingBoxes()}
      {isAnalyzing && (
        <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-white">Analyzing...</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    if (mode === 'upload') {
      return imageUrl ? renderImageDisplay() : renderUploadInterface();
    } else if (mode === 'camera') {
      return renderCameraInterface();
    } else {
      return renderUploadInterface();
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Analysis Viewport</h3>
        <div className="flex items-center gap-2">
          <div className="text-sm text-slate-400">
            Mode: <span className="text-cyan-400 capitalize">{mode}</span>
          </div>
        </div>
      </div>
      
      <div className="aspect-video">
        {renderContent()}
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default AnalysisViewport;