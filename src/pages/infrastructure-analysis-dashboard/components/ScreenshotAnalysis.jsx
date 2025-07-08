import React, { useState, useCallback } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ScreenshotAnalysis = ({ 
  onCaptureScreenshot, 
  screenshots, 
  onDeleteScreenshot, 
  onAnalyzeScreenshot,
  isAnalyzing 
}) => {
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  const handleScreenshotCapture = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ 
        video: { mediaSource: 'screen' } 
      });
      
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
      
      video.onloadedmetadata = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);
        
        canvas.toBlob((blob) => {
          const screenshot = {
            id: Date.now(),
            blob,
            url: URL.createObjectURL(blob),
            timestamp: new Date().toISOString(),
            name: `Screenshot_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}`
          };
          
          onCaptureScreenshot?.(screenshot);
          stream.getTracks().forEach(track => track.stop());
        }, 'image/jpeg', 0.8);
      };
    } catch (error) {
      console.error('Screenshot capture failed:', error);
    }
  }, [onCaptureScreenshot]);

  const handleAnalyze = useCallback(() => {
    if (selectedScreenshot) {
      onAnalyzeScreenshot?.(selectedScreenshot);
    }
  }, [selectedScreenshot, onAnalyzeScreenshot]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Screenshot Analysis</h3>
        <Button
          variant="secondary"
          onClick={handleScreenshotCapture}
          iconName="Monitor"
          iconPosition="left"
          size="sm"
        >
          Capture Screen
        </Button>
      </div>

      {screenshots?.length > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
            {screenshots.map((screenshot) => (
              <div
                key={screenshot.id}
                className={`
                  relative p-3 rounded-lg border-2 cursor-pointer transition-all
                  ${selectedScreenshot?.id === screenshot.id
                    ? 'border-primary bg-primary-50' :'border-border bg-surface hover:border-secondary-300'
                  }
                `}
                onClick={() => setSelectedScreenshot(screenshot)}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <img
                      src={screenshot.url}
                      alt={screenshot.name}
                      className="w-16 h-12 object-cover rounded border"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-text-primary truncate">
                      {screenshot.name}
                    </h4>
                    <p className="text-xs text-text-secondary">
                      {new Date(screenshot.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteScreenshot?.(screenshot.id);
                      if (selectedScreenshot?.id === screenshot.id) {
                        setSelectedScreenshot(null);
                      }
                    }}
                    className="text-text-secondary hover:text-error transition-colors"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="primary"
            onClick={handleAnalyze}
            disabled={!selectedScreenshot || isAnalyzing}
            loading={isAnalyzing}
            iconName="Zap"
            iconPosition="left"
            fullWidth
          >
            {isAnalyzing ? 'Analyzing Screenshot...' : 'Analyze Selected Screenshot'}
          </Button>
        </div>
      )}

      {screenshots?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Monitor" size={48} className="mx-auto text-text-secondary mb-4" />
          <p className="text-text-secondary">
            No screenshots captured yet. Click "Capture Screen" to start.
          </p>
        </div>
      )}
    </div>
  );
};

export default ScreenshotAnalysis;