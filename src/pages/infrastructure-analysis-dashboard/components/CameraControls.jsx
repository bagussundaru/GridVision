import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CameraControls = ({ 
  isStreaming, 
  onStartCamera, 
  onStopCamera, 
  onCaptureFrame, 
  error 
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        {!isStreaming ? (
          <Button
            variant="primary"
            onClick={onStartCamera}
            iconName="Camera"
            iconPosition="left"
            className="flex-1"
          >
            Start Camera
          </Button>
        ) : (
          <>
            <Button
              variant="danger"
              onClick={onStopCamera}
              iconName="CameraOff"
              iconPosition="left"
              className="flex-1"
            >
              Stop Camera
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
            <span className="text-sm text-error font-medium">Camera Error</span>
          </div>
          <p className="text-sm text-error mt-1">{error}</p>
        </div>
      )}
      
      {isStreaming && (
        <div className="bg-success-50 border border-success-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-success font-medium">Camera Active</span>
          </div>
          <p className="text-sm text-success mt-1">
            Live video stream is running. Click screenshot to capture and analyze current frame.
          </p>
        </div>
      )}
    </div>
  );
};

export default CameraControls;