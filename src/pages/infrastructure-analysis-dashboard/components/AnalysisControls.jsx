import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AnalysisControls = ({ 
  analysisType, 
  setAnalysisType, 
  onAnalyze, 
  isAnalyzing, 
  hasImageOrVideo,
  mode 
}) => {
  const analysisTypes = [
    {
      id: 'damage',
      label: 'Damage Detection',
      icon: 'AlertTriangle',
      description: 'Identify structural damage and defects'
    },
    {
      id: 'vegetation',
      label: 'Vegetation Encroachment',
      icon: 'TreePine',
      description: 'Detect vegetation interference'
    },
    {
      id: 'thermal',
      label: 'Thermal Analysis',
      icon: 'Thermometer',
      description: 'Analyze thermal patterns and hotspots'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Analysis Type</h3>
        <div className="space-y-3">
          {analysisTypes.map((type) => (
            <div
              key={type.id}
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                ${analysisType === type.id
                  ? 'border-primary bg-primary-50 shadow-card'
                  : 'border-border bg-surface hover:border-secondary-300 hover:bg-secondary-50'
                }
              `}
              onClick={() => setAnalysisType(type.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`
                  p-2 rounded-md
                  ${analysisType === type.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary-100 text-secondary-600'
                  }
                `}>
                  <Icon 
                    name={type.icon} 
                    size={20} 
                    color="currentColor"
                    strokeWidth={2}
                  />
                </div>
                <div className="flex-1">
                  <h4 className={`
                    font-medium
                    ${analysisType === type.id
                      ? 'text-primary' :'text-text-primary'
                    }
                  `}>
                    {type.label}
                  </h4>
                  <p className="text-sm text-text-secondary mt-1">
                    {type.description}
                  </p>
                </div>
                <div className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${analysisType === type.id
                    ? 'border-primary bg-primary' :'border-secondary-300'
                  }
                `}>
                  {analysisType === type.id && (
                    <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <Button
          variant="primary"
          onClick={onAnalyze}
          disabled={!hasImageOrVideo || isAnalyzing}
          loading={isAnalyzing}
          fullWidth
          iconName={isAnalyzing ? undefined : "Zap"}
          iconPosition="left"
          className="h-12"
        >
          {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
        </Button>
        
        {!hasImageOrVideo && (
          <p className="text-sm text-text-secondary mt-2 text-center">
            {mode === 'upload' ? 'Upload an image to start analysis' : 'Start camera to begin analysis'}
          </p>
        )}
      </div>
    </div>
  );
};

export default AnalysisControls;