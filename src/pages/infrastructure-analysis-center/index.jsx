import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AnalysisViewport from './components/AnalysisViewport';
import ControlPanel from './components/ControlPanel';

const InfrastructureAnalysisCenter = () => {
  const navigate = useNavigate();
  
  // State management
  const [mode, setMode] = useState('upload');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [analysisType, setAnalysisType] = useState('damage');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [stream, setStream] = useState(null);

  // Refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Mock analysis data
  const mockAnalysisData = {
    damage: [
      {
        label: "Structural Crack",
        description: "Vertical crack detected in concrete wall, approximately 15cm length. Immediate inspection recommended.",
        confidence: 0.94,
        severity: "high",
        bbox: { x: 0.3, y: 0.2, width: 0.15, height: 0.25 }
      },
      {
        label: "Surface Corrosion",
        description: "Metal corrosion visible on support beam. Monitor for progression.",
        confidence: 0.87,
        severity: "medium",
        bbox: { x: 0.6, y: 0.4, width: 0.2, height: 0.15 }
      },
      {
        label: "Paint Deterioration",
        description: "Paint peeling and weathering on exterior surface. Cosmetic issue.",
        confidence: 0.76,
        severity: "low",
        bbox: { x: 0.1, y: 0.6, width: 0.25, height: 0.2 }
      }
    ],
    vegetation: [
      {
        label: "Tree Overgrowth",
        description: "Large tree branches interfering with power lines. Critical safety hazard.",
        confidence: 0.91,
        severity: "critical",
        bbox: { x: 0.2, y: 0.1, width: 0.4, height: 0.5 }
      },
      {
        label: "Vine Growth",
        description: "Climbing vines on utility pole structure. Requires trimming.",
        confidence: 0.83,
        severity: "medium",
        bbox: { x: 0.7, y: 0.3, width: 0.2, height: 0.4 }
      }
    ],
    thermal: [
      {
        label: "Hot Spot",
        description: "Elevated temperature detected in electrical connection. Potential fire hazard.",
        confidence: 0.89,
        severity: "high",
        bbox: { x: 0.4, y: 0.3, width: 0.1, height: 0.1 }
      },
      {
        label: "Heat Signature",
        description: "Abnormal thermal pattern in transformer housing. Requires immediate attention.",
        confidence: 0.92,
        severity: "critical",
        bbox: { x: 0.5, y: 0.5, width: 0.3, height: 0.2 }
      },
      {
        label: "Cold Spot",
        description: "Potential insulation failure indicated by temperature drop.",
        confidence: 0.78,
        severity: "medium",
        bbox: { x: 0.1, y: 0.7, width: 0.2, height: 0.15 }
      }
    ]
  };

  // File handling
  const handleFileSelect = useCallback((file, fileError) => {
    setError(fileError);
    setSelectedFile(file);
    setResults([]);
    
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    } else {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
      setImageUrl(null);
    }
  }, [imageUrl]);

  // Camera handling
  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 },
          facingMode: 'environment'
        }
      });
      
      setStream(mediaStream);
      setIsStreaming(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setCameraError('Unable to access camera. Please check permissions and try again.');
      console.error('Camera access error:', err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsStreaming(false);
    setCameraError(null);
    setResults([]);
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [stream]);

  const captureFrame = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = videoRef.current.videoWidth || 1280;
      canvas.height = videoRef.current.videoHeight || 720;
      
      ctx.drawImage(videoRef.current, 0, 0);
      
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      }, 'image/jpeg', 0.8);
    }
  }, []);

  // Mode switching
  const handleModeChange = useCallback((newMode) => {
    setMode(newMode);
    setResults([]);
    setError(null);
    setCameraError(null);
    
    if (newMode === 'upload') {
      stopCamera();
    } else if (newMode === 'camera') {
      if (selectedFile) {
        setSelectedFile(null);
        if (imageUrl) {
          URL.revokeObjectURL(imageUrl);
        }
        setImageUrl(null);
      }
    }
  }, [stopCamera, selectedFile, imageUrl]);

  // Analysis simulation
  const handleAnalyze = useCallback(async () => {
    if (!imageUrl && !isStreaming) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Get mock results based on analysis type
      const mockResults = mockAnalysisData[analysisType] || [];
      setResults(mockResults);
    } catch (err) {
      setError('Analysis failed. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  }, [imageUrl, isStreaming, analysisType]);

  // Export results
  const handleExportResults = useCallback((format, data) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `analysis_results_${timestamp}.${format}`;
    
    let content = '';
    let mimeType = '';
    
    switch (format) {
      case 'json':
        content = JSON.stringify(data, null, 2);
        mimeType = 'application/json';
        break;
      case 'csv':
        const headers = ['Label', 'Confidence', 'Severity', 'Description'];
        const rows = data.map(item => [
          item.label,
          Math.round(item.confidence * 100) + '%',
          item.severity,
          item.description
        ]);
        content = [headers, ...rows].map(row => row.join(',')).join('\n');
        mimeType = 'text/csv';
        break;
      case 'xml':
        content = `<?xml version="1.0" encoding="UTF-8"?>
<analysis_results>
${data.map(item => `  <result>
    <label>${item.label}</label>
    <confidence>${item.confidence}</confidence>
    <severity>${item.severity}</severity>
    <description>${item.description}</description>
  </result>`).join('\n')}
</analysis_results>`;
        mimeType = 'application/xml';
        break;
      default:
        return;
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [stream, imageUrl]);

  const hasImageOrVideo = Boolean(imageUrl || isStreaming);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="sm"
                iconName="ArrowLeft"
                onClick={() => navigate('/mission-control-dashboard')}
                className="text-slate-300 hover:text-white"
              >
                Back to Mission Control
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
                  <Icon name="Camera" size={20} className="text-cyan-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Infrastructure Analysis Center</h1>
                  <p className="text-sm text-slate-400">Professional analysis suite for infrastructure inspection</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 rounded-lg border border-slate-600/50">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-300">AI Engine Online</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="Settings"
                className="border-slate-600/50 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Analysis Viewport */}
          <div className="lg:col-span-2">
            <AnalysisViewport
              mode={mode}
              selectedFile={selectedFile}
              imageUrl={imageUrl}
              results={results}
              isAnalyzing={isAnalyzing}
              onFileSelect={handleFileSelect}
              onCameraStart={startCamera}
              onCameraStop={stopCamera}
              onCaptureFrame={captureFrame}
              isStreaming={isStreaming}
              cameraError={cameraError}
              videoRef={videoRef}
              canvasRef={canvasRef}
            />
          </div>

          {/* Control Panel */}
          <div className="lg:col-span-1">
            <ControlPanel
              mode={mode}
              onModeChange={handleModeChange}
              analysisType={analysisType}
              onAnalysisTypeChange={setAnalysisType}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              hasImageOrVideo={hasImageOrVideo}
              results={results}
              onExportResults={handleExportResults}
            />
          </div>
        </div>
      </main>

      {/* Technical Information */}
      <footer className="bg-slate-800/50 backdrop-blur-sm border-t border-slate-700/50 p-6 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-2">Damage Detection</h3>
              <p className="text-sm text-slate-400">
                Advanced computer vision algorithms trained on infrastructure datasets to identify structural damage, cracks, corrosion, and material degradation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Vegetation Analysis</h3>
              <p className="text-sm text-slate-400">
                Specialized models for detecting vegetation encroachment on power lines, utility poles, and critical infrastructure components.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Thermal Monitoring</h3>
              <p className="text-sm text-slate-400">
                Thermal pattern recognition for identifying electrical hotspots, insulation failures, and temperature anomalies in infrastructure systems.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InfrastructureAnalysisCenter;