import React from 'react';
import Button from '../../../components/ui/Button';

const ModeToggle = ({ mode, onModeChange }) => {
  return (
    <div className="flex items-center space-x-2 bg-secondary-100 p-1 rounded-lg">
      <Button
        variant={mode === 'upload' ? 'primary' : 'ghost'}
        onClick={() => onModeChange('upload')}
        iconName="Upload"
        iconPosition="left"
        className="flex-1"
      >
        Upload Image
      </Button>
      <Button
        variant={mode === 'camera' ? 'primary' : 'ghost'}
        onClick={() => onModeChange('camera')}
        iconName="Camera"
        iconPosition="left"
        className="flex-1"
      >
        Live Camera
      </Button>
      <Button
        variant={mode === 'cctv' ? 'primary' : 'ghost'}
        onClick={() => onModeChange('cctv')}
        iconName="Monitor"
        iconPosition="left"
        className="flex-1"
      >
        CCTV Stream
      </Button>
    </div>
  );
};

export default ModeToggle;