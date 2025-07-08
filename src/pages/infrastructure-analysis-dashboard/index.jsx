import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import ModeToggle from './components/ModeToggle';
import FileUpload from './components/FileUpload';
import CameraControls from './components/CameraControls';
import CCTVControls from './components/CCTVControls';
import ScreenshotAnalysis from './components/ScreenshotAnalysis';
import ImageDisplay from './components/ImageDisplay';
import AnalysisControls from './components/AnalysisControls';
import AnalysisResults from './components/AnalysisResults';

const InfrastructureAnalysisDashboard = () => {
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

  // CCTV specific state
  const [cctvStreamUrl, setCctvStreamUrl] = useState('');
  const [cctvError, setCctvError] = useState(null);
  const [isCctvStreaming, setIsCctvStreaming] = useState(false);

  // Screenshot specific state
  const [screenshots, setScreenshots] = useState([]);

  // Refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cctvVideoRef = useRef(null);

  // Mock analysis data
  const mockAnalysisData = {
    damage: [
      {
        label: "Structural Crack",
        description: "Vertical crack detected in concrete wall, approximately 15cm length",
        confidence: 0.94,
        severity: "high",
        bbox: { x: 0.3, y: 0.2, width: 0.15, height: 0.25 }
      },
      {
        label: "Surface Corrosion",
        description: "Metal corrosion visible on support beam",
        confidence: 0.87,
        severity: "medium",
        bbox: { x: 0.6, y: 0.4, width: 0.2, height: 0.15 }
      },
      {
        label: "Paint Deterioration",
        description: "Paint peeling and weathering on exterior surface",
        confidence: 0.76,
        severity: "low",
        bbox: { x: 0.1, y: 0.6, width: 0.25, height: 0.2 }
      }
    ],
    vegetation: [
      {
        label: "Tree Overgrowth",
        description: "Large tree branches interfering with power lines",
        confidence: 0.91,
        severity: "critical",
        bbox: { x: 0.2, y: 0.1, width: 0.4, height: 0.5 }
      },
      {
        label: "Vine Growth",
        description: "Climbing vines on utility pole structure",
        confidence: 0.83,
        severity: "medium",
        bbox: { x: 0.7, y: 0.3, width: 0.2, height: 0.4 }
      }
    ],
    thermal: [
      {
        label: "Hot Spot",
        description: "Elevated temperature detected in electrical connection",
        confidence: 0.89,
        severity: "high",
        bbox: { x: 0.4, y: 0.3, width: 0.1, height: 0.1 }
      },
      {
        label: "Heat Signature",
        description: "Abnormal thermal pattern in transformer housing",
        confidence: 0.92,
        severity: "critical",
        bbox: { x: 0.5, y: 0.5, width: 0.3, height: 0.2 }
      },
      {
        label: "Cold Spot",
        description: "Potential insulation failure indicated by temperature drop",
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

  // CCTV handling
  const startCctvStream = useCallback(async (url) => {
    try {
      setCctvError(null);
      setIsCctvStreaming(true);
      
      // Note: Direct RTSP streaming in browsers requires additional setup
      // For demo purposes, we'll simulate the connection // In production, you'd use WebRTC, HLS, or similar streaming protocols
      
      if (cctvVideoRef.current) {
        // Simulate RTSP stream connection
        // In real implementation, you would connect to RTSP proxy or use WebRTC
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to connect to RTSP stream');
        }
        
        // For demo, we'll use a placeholder or convert RTSP to WebRTC/HLS console.log('CCTV Stream connected:', url);
      }
    } catch (err) {
      setCctvError('Unable to connect to CCTV stream. Please check the URL and network connection.');
      setIsCctvStreaming(false);
      console.error('CCTV stream error:', err);
    }
  }, []);

  const stopCctvStream = useCallback(() => {
    setIsCctvStreaming(false);
    setCctvError(null);
    setResults([]);
    
    if (cctvVideoRef.current) {
      cctvVideoRef.current.srcObject = null;
    }
  }, []);

  const captureFrame = useCallback(() => {
    const videoElement = mode === 'camera' ? videoRef.current : cctvVideoRef.current;
    
    if (videoElement && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = videoElement.videoWidth || 1280;
      canvas.height = videoElement.videoHeight || 720;
      
      ctx.drawImage(videoElement, 0, 0);
      
      // Convert to blob and create URL for analysis
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      }, 'image/jpeg', 0.8);
    }
  }, [mode]);

  // Screenshot handling
  const handleCaptureScreenshot = useCallback((screenshot) => {
    setScreenshots(prev => [...prev, screenshot]);
  }, []);

  const handleDeleteScreenshot = useCallback((screenshotId) => {
    setScreenshots(prev => {
      const screenshot = prev.find(s => s.id === screenshotId);
      if (screenshot) {
        URL.revokeObjectURL(screenshot.url);
      }
      return prev.filter(s => s.id !== screenshotId);
    });
  }, []);

  const handleAnalyzeScreenshot = useCallback((screenshot) => {
    setImageUrl(screenshot.url);
    setResults([]);
  }, []);

  // Mode switching
  const handleModeChange = useCallback((newMode) => {
    setMode(newMode);
    setResults([]);
    setError(null);
    setCameraError(null);
    setCctvError(null);
    
    if (newMode === 'upload') {
      stopCamera();
      stopCctvStream();
    } else if (newMode === 'camera') {
      stopCctvStream();
      if (selectedFile) {
        setSelectedFile(null);
        if (imageUrl) {
          URL.revokeObjectURL(imageUrl);
        }
        setImageUrl(null);
      }
    } else if (newMode === 'cctv') {
      stopCamera();
      if (selectedFile) {
        setSelectedFile(null);
        if (imageUrl) {
          URL.revokeObjectURL(imageUrl);
        }
        setImageUrl(null);
      }
    }
  }, [stopCamera, stopCctvStream, selectedFile, imageUrl]);

  // Analysis simulation
  const handleAnalyze = useCallback(async () => {
    if (!imageUrl && !isStreaming && !isCctvStreaming) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Get mock results based on analysis type
      const mockResults = mockAnalysisData[analysisType] || [];
      setResults(mockResults);
    } catch (err) {
      setError('Analysis failed. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  }, [imageUrl, isStreaming, isCctvStreaming, analysisType]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
      screenshots.forEach(screenshot => {
        URL.revokeObjectURL(screenshot.url);
      });
    };
  }, [stream, imageUrl, screenshots]);

  const hasImageOrVideo = Boolean(imageUrl || isStreaming || isCctvStreaming);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Infrastructure Analysis Dashboard
                </h1>
                <p className="text-text-secondary">
                  AI-powered infrastructure inspection using ShiftwiseConv neural networks for damage detection, vegetation analysis, and thermal monitoring.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/topology-dashboard')}
                  iconName="network"
                  size="sm"
                >
                  View Topology
                </Button>
              </div>
            </div>
          </div>

          {/* Mode Toggle */}
          <div className="mb-6">
            <ModeToggle mode={mode} onModeChange={handleModeChange} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Panel - Image/Video Display */}
            <div className="lg:col-span-3 space-y-6">
              {/* Upload/Camera/CCTV Controls */}
              {mode === 'upload' ? (
                <FileUpload
                  onFileSelect={handleFileSelect}
                  selectedFile={selectedFile}
                  error={error}
                />
              ) : mode === 'camera' ? (
                <CameraControls
                  isStreaming={isStreaming}
                  onStartCamera={startCamera}
                  onStopCamera={stopCamera}
                  onCaptureFrame={captureFrame}
                  error={cameraError}
                />
              ) : mode === 'cctv' ? (
                <CCTVControls
                  isStreaming={isCctvStreaming}
                  onStartStream={startCctvStream}
                  onStopStream={stopCctvStream}
                  onCaptureFrame={captureFrame}
                  error={cctvError}
                  streamUrl={cctvStreamUrl}
                  onStreamUrlChange={setCctvStreamUrl}
                />
              ) : null}

              {/* Image/Video Display */}
              <div className="bg-surface border border-border rounded-lg overflow-hidden">
                <div className="aspect-video">
                  <ImageDisplay
                    imageUrl={imageUrl}
                    results={results}
                    isAnalyzing={isAnalyzing}
                    mode={mode}
                    videoRef={mode === 'camera' ? videoRef : cctvVideoRef}
                    canvasRef={canvasRef}
                  />
                </div>
              </div>
            </div>

            {/* Right Panel - Controls and Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Analysis Controls */}
              <div className="bg-surface border border-border rounded-lg p-6">
                <AnalysisControls
                  analysisType={analysisType}
                  setAnalysisType={setAnalysisType}
                  onAnalyze={handleAnalyze}
                  isAnalyzing={isAnalyzing}
                  hasImageOrVideo={hasImageOrVideo}
                  mode={mode}
                />
              </div>

              {/* Screenshot Analysis */}
              <div className="bg-surface border border-border rounded-lg p-6">
                <ScreenshotAnalysis
                  onCaptureScreenshot={handleCaptureScreenshot}
                  screenshots={screenshots}
                  onDeleteScreenshot={handleDeleteScreenshot}
                  onAnalyzeScreenshot={handleAnalyzeScreenshot}
                  isAnalyzing={isAnalyzing}
                />
              </div>

              {/* Analysis Results */}
              <div className="bg-surface border border-border rounded-lg p-6">
                <AnalysisResults
                  results={results}
                  isAnalyzing={isAnalyzing}
                  analysisType={analysisType}
                />
              </div>
            </div>
          </div>

          {/* Technical Information */}
          <div className="mt-12 bg-secondary-50 border border-secondary-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              ShiftwiseConv Neural Network Architecture
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium text-text-primary mb-2">Damage Detection</h3>
                <p className="text-sm text-text-secondary">
                  Advanced computer vision algorithms trained on infrastructure datasets to identify structural damage, cracks, corrosion, and material degradation.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-text-primary mb-2">Vegetation Analysis</h3>
                <p className="text-sm text-text-secondary">
                  Specialized models for detecting vegetation encroachment on power lines, utility poles, and critical infrastructure components.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-text-primary mb-2">Thermal Monitoring</h3>
                <p className="text-sm text-text-secondary">
                  Thermal pattern recognition for identifying electrical hotspots, insulation failures, and temperature anomalies in infrastructure systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InfrastructureAnalysisDashboard;