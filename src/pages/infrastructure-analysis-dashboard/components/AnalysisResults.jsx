import React from 'react';
import Icon from '../../../components/AppIcon';

const AnalysisResults = ({ results, isAnalyzing, analysisType }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-error bg-error-50 border-error-200';
      case 'high':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'medium':
        return 'text-accent bg-accent-50 border-accent-200';
      case 'low':
        return 'text-success bg-success-50 border-success-200';
      default:
        return 'text-secondary bg-secondary-50 border-secondary-200';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return 'AlertCircle';
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'Info';
      case 'low':
        return 'CheckCircle';
      default:
        return 'Circle';
    }
  };

  const getAnalysisTypeLabel = (type) => {
    switch (type) {
      case 'damage':
        return 'Damage Detection';
      case 'vegetation':
        return 'Vegetation Encroachment';
      case 'thermal':
        return 'Thermal Analysis';
      default:
        return 'Analysis';
    }
  };

  if (isAnalyzing) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Analysis Results</h3>
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="animate-spin">
                <Icon name="Loader2" size={24} color="var(--color-primary)" strokeWidth={2} />
              </div>
              <span className="text-text-secondary">Processing analysis...</span>
            </div>
            <div className="mt-4 bg-secondary-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Cpu" size={16} color="var(--color-accent)" strokeWidth={2} />
                <span className="text-sm font-medium text-text-primary">ShiftwiseConv Neural Network</span>
              </div>
              <p className="text-sm text-text-secondary">
                Running {getAnalysisTypeLabel(analysisType).toLowerCase()} using advanced computer vision algorithms...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Analysis Results</h3>
          <div className="bg-surface border border-border rounded-lg p-6 text-center">
            <Icon name="Search" size={48} color="var(--color-secondary-400)" strokeWidth={1.5} className="mx-auto mb-4" />
            <p className="text-text-secondary">No analysis results yet</p>
            <p className="text-sm text-text-tertiary mt-1">
              Upload an image or start camera feed to begin analysis
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Analysis Results</h3>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Clock" size={14} color="currentColor" strokeWidth={2} />
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          <div className="bg-secondary-50 px-4 py-3 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Target" size={16} color="var(--color-primary)" strokeWidth={2} />
                <span className="font-medium text-text-primary">
                  {getAnalysisTypeLabel(analysisType)}
                </span>
              </div>
              <span className="text-sm text-text-secondary">
                {results.length} detection{results.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          
          <div className="divide-y divide-border max-h-96 overflow-y-auto">
            {results.map((result, index) => (
              <div key={index} className="p-4 hover:bg-secondary-50 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className={`
                    px-2 py-1 rounded-md border text-xs font-medium
                    ${getSeverityColor(result.severity)}
                  `}>
                    <div className="flex items-center space-x-1">
                      <Icon 
                        name={getSeverityIcon(result.severity)} 
                        size={12} 
                        color="currentColor"
                        strokeWidth={2}
                      />
                      <span className="capitalize">{result.severity}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary">{result.label}</h4>
                    <p className="text-sm text-text-secondary mt-1">{result.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Icon name="Percent" size={12} color="var(--color-text-tertiary)" strokeWidth={2} />
                        <span className="text-xs text-text-tertiary">
                          {Math.round(result.confidence * 100)}% confidence
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} color="var(--color-text-tertiary)" strokeWidth={2} />
                        <span className="text-xs text-text-tertiary">
                          ({result.bbox.x}, {result.bbox.y})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;