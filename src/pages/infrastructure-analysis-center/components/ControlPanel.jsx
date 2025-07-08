import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ControlPanel = ({ 
  mode, 
  onModeChange, 
  analysisType, 
  onAnalysisTypeChange,
  onAnalyze,
  isAnalyzing,
  hasImageOrVideo,
  results,
  onExportResults 
}) => {
  const [exportFormat, setExportFormat] = useState('json');
  const [selectedResult, setSelectedResult] = useState(null);

  const modes = [
    { id: 'upload', label: 'File Upload', icon: 'Upload' },
    { id: 'camera', label: 'Live Camera', icon: 'Camera' },
    { id: 'cctv', label: 'CCTV Stream', icon: 'Monitor' },
    { id: 'screenshot', label: 'Screenshot', icon: 'Image' }
  ];

  const analysisTypes = [
    { 
      id: 'damage', 
      label: 'Damage Detection', 
      description: 'Identify structural damage and deterioration',
      icon: 'AlertTriangle',
      color: 'red'
    },
    { 
      id: 'vegetation', 
      label: 'Vegetation Analysis', 
      description: 'Detect vegetation encroachment and overgrowth',
      icon: 'Leaf',
      color: 'emerald'
    },
    { 
      id: 'thermal', 
      label: 'Thermal Monitoring', 
      description: 'Monitor temperature patterns and anomalies',
      icon: 'Thermometer',
      color: 'amber'
    }
  ];

  const exportFormats = [
    { id: 'json', label: 'JSON', icon: 'FileCode' },
    { id: 'csv', label: 'CSV', icon: 'FileSpreadsheet' },
    { id: 'pdf', label: 'PDF Report', icon: 'FileText' },
    { id: 'xml', label: 'XML', icon: 'FileCode' }
  ];

  const handleExport = () => {
    if (onExportResults) {
      onExportResults(exportFormat, results);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
      case 'low': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Source Selection */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Source Selection</h3>
        <div className="grid grid-cols-2 gap-3">
          {modes.map((modeOption) => (
            <button
              key={modeOption.id}
              onClick={() => onModeChange(modeOption.id)}
              className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                mode === modeOption.id
                  ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400' :'bg-slate-700/50 border-slate-600/50 text-slate-400 hover:bg-slate-700 hover:text-slate-300'
              }`}
            >
              <Icon name={modeOption.icon} size={16} />
              <span className="text-sm font-medium">{modeOption.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Parameters */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Analysis Parameters</h3>
        <div className="space-y-3">
          {analysisTypes.map((type) => (
            <div
              key={type.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                analysisType === type.id
                  ? `bg-${type.color}-500/20 border-${type.color}-500/30`
                  : 'bg-slate-700/50 border-slate-600/50 hover:bg-slate-700'
              }`}
              onClick={() => onAnalysisTypeChange(type.id)}
            >
              <div className="flex items-center gap-3">
                <Icon 
                  name={type.icon} 
                  size={20} 
                  className={analysisType === type.id ? `text-${type.color}-400` : 'text-slate-400'}
                />
                <div className="flex-1">
                  <div className={`font-medium ${analysisType === type.id ? 'text-white' : 'text-slate-300'}`}>
                    {type.label}
                  </div>
                  <div className="text-xs text-slate-500">{type.description}</div>
                </div>
                {analysisType === type.id && (
                  <Icon name="Check" size={16} className={`text-${type.color}-400`} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Control */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Analysis Control</h3>
        <Button
          onClick={onAnalyze}
          disabled={!hasImageOrVideo || isAnalyzing}
          loading={isAnalyzing}
          iconName="Play"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
        >
          {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
        </Button>
      </div>

      {/* Results */}
      {results && results.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Analysis Results</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedResult === index
                    ? 'bg-cyan-500/20 border-cyan-500/30' :'bg-slate-700/50 border-slate-600/50 hover:bg-slate-700'
                }`}
                onClick={() => setSelectedResult(selectedResult === index ? null : index)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">{result.label}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(result.severity)}`}>
                        {result.severity}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mb-2">
                      Confidence: {Math.round(result.confidence * 100)}%
                    </div>
                    {selectedResult === index && (
                      <div className="text-xs text-slate-300 mt-2">
                        {result.description}
                      </div>
                    )}
                  </div>
                  <Icon 
                    name={selectedResult === index ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-slate-400" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Export Options */}
      {results && results.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Export Results</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Export Format</label>
              <div className="grid grid-cols-2 gap-2">
                {exportFormats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setExportFormat(format.id)}
                    className={`flex items-center gap-2 p-2 rounded-lg border transition-all ${
                      exportFormat === format.id
                        ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400' :'bg-slate-700/50 border-slate-600/50 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    <Icon name={format.icon} size={14} />
                    <span className="text-sm">{format.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <Button
              onClick={handleExport}
              iconName="Download"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              Export Results
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;