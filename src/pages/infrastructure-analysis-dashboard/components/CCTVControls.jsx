import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const CCTVControls = ({ 
  isStreaming, 
  onStartStream, 
  onStopStream, 
  onCaptureFrame, 
  error,
  streamUrl,
  onStreamUrlChange 
}) => {
  const [localUrl, setLocalUrl] = useState(streamUrl || '');

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setLocalUrl(value);
    onStreamUrlChange?.(value);
  };

  const handleConnect = () => {
    if (localUrl.trim()) {
      onStartStream?.(localUrl.trim());
    }
  };

  const presetUrls = [
    {
      label: 'Sample RTSP Stream',
      url: 'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4'
    },
    {
      label: 'Local Camera (IP)',
      url: 'rtsp://192.168.1.100:554/stream'
    },
    {
      label: 'AXIS Camera',
      url: 'rtsp://camera.axis.com/axis-media/media.amp'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            RTSP Stream URL
          </label>
          <Input
            type="url"
            value={localUrl}
            onChange={handleUrlChange}
            placeholder="rtsp://example.com:554/stream"
            className="w-full"
            disabled={isStreaming}
          />
        </div>
        
        {/* Preset URLs */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Quick Presets
          </label>
          <div className="grid grid-cols-1 gap-2">
            {presetUrls.map((preset, index) => (
              <button
                key={index}
                onClick={() => {
                  setLocalUrl(preset.url);
                  onStreamUrlChange?.(preset.url);
                }}
                className="text-left p-2 bg-secondary-50 hover:bg-secondary-100 rounded-md border border-secondary-200 transition-colors"
                disabled={isStreaming}
              >
                <div className="text-sm font-medium text-text-primary">
                  {preset.label}
                </div>
                <div className="text-xs text-text-secondary truncate">
                  {preset.url}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {!isStreaming ? (
          <Button
            variant="primary"
            onClick={handleConnect}
            iconName="Play"
            iconPosition="left"
            className="flex-1"
            disabled={!localUrl.trim()}
          >
            Connect to Stream
          </Button>
        ) : (
          <>
            <Button
              variant="danger"
              onClick={onStopStream}
              iconName="Square"
              iconPosition="left"
              className="flex-1"
            >
              Stop Stream
            </Button>
            <Button
              variant="secondary"
              onClick={onCaptureFrame}
              iconName="Camera"
              iconPosition="left"
            >
              Screenshot
            </Button>
          </>
        )}
      </div>
      
      {error && (
        <div className="bg-error-50 border border-error-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} color="var(--color-error)" strokeWidth={2} />
            <span className="text-sm text-error font-medium">Stream Error</span>
          </div>
          <p className="text-sm text-error mt-1">{error}</p>
        </div>
      )}
      
      {isStreaming && (
        <div className="bg-success-50 border border-success-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-success font-medium">CCTV Stream Active</span>
          </div>
          <p className="text-sm text-success mt-1">
            Connected to RTSP stream. Click screenshot to analyze current frame.
          </p>
        </div>
      )}
    </div>
  );
};

export default CCTVControls;