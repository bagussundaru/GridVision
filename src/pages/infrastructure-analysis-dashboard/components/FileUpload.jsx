import React, { useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FileUpload = ({ onFileSelect, selectedFile, error }) => {
  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        onFileSelect(null, 'File size must be less than 5MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        onFileSelect(null, 'Please select a valid image file');
        return;
      }
      
      onFileSelect(file, null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <div 
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
          ${selectedFile 
            ? 'border-success bg-success-50 hover:bg-success-100' :'border-border bg-surface hover:border-primary hover:bg-primary-50'
          }
        `}
        onClick={handleFileClick}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className={`
            p-4 rounded-full
            ${selectedFile 
              ? 'bg-success text-success-foreground' 
              : 'bg-secondary-100 text-secondary-600'
            }
          `}>
            <Icon 
              name={selectedFile ? "CheckCircle" : "Upload"} 
              size={32} 
              color="currentColor"
              strokeWidth={1.5}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-2">
              {selectedFile ? 'File Selected' : 'Upload Image'}
            </h3>
            <p className="text-text-secondary">
              {selectedFile 
                ? `${selectedFile.name} (${formatFileSize(selectedFile.size)})`
                : 'Click to browse or drag and drop your image here'
              }
            </p>
            <p className="text-sm text-text-tertiary mt-1">
              Supports JPG, PNG, WebP • Max 5MB
            </p>
          </div>
        </div>
      </div>
      
      {selectedFile && (
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={handleFileClick}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Change File
          </Button>
          <Button
            variant="ghost"
            onClick={() => onFileSelect(null, null)}
            iconName="X"
            iconPosition="left"
          >
            Remove
          </Button>
        </div>
      )}
      
      {error && (
        <div className="bg-error-50 border border-error-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} color="var(--color-error)" strokeWidth={2} />
            <span className="text-sm text-error font-medium">Upload Error</span>
          </div>
          <p className="text-sm text-error mt-1">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;