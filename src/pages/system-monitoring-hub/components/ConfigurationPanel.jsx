import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfigurationPanel = ({ 
  refreshInterval, 
  onRefreshIntervalChange, 
  autoRefresh, 
  onAutoRefreshChange 
}) => {
  const [thresholds, setThresholds] = useState({
    cpuWarning: 70,
    cpuCritical: 85,
    memoryWarning: 75,
    memoryCritical: 90,
    networkWarning: 800,
    networkCritical: 950
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    webhook: true,
    desktop: true
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const refreshIntervalOptions = [
    { value: 1000, label: '1 second' },
    { value: 5000, label: '5 seconds' },
    { value: 10000, label: '10 seconds' },
    { value: 30000, label: '30 seconds' },
    { value: 60000, label: '1 minute' }
  ];

  const handleThresholdChange = (key, value) => {
    setThresholds(prev => ({
      ...prev,
      [key]: parseInt(value)
    }));
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveConfiguration = () => {
    // In a real application, this would save to backend
    console.log('Configuration saved:', { thresholds, notifications });
    // Show success message
  };

  const handleResetConfiguration = () => {
    setThresholds({
      cpuWarning: 70,
      cpuCritical: 85,
      memoryWarning: 75,
      memoryCritical: 90,
      networkWarning: 800,
      networkCritical: 950
    });
    setNotifications({
      email: true,
      sms: false,
      webhook: true,
      desktop: true
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Configuration</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "chevron-up" : "chevron-down"}
        >
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      </div>

      {/* Basic Settings */}
      <div className="space-y-4">
        {/* Auto Refresh Toggle */}
        <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <Icon name="refresh-cw" size={16} className="text-text-secondary" />
            <div>
              <span className="text-sm font-medium text-text-primary">
                Auto Refresh
              </span>
              <p className="text-xs text-text-secondary">
                Automatically update dashboard data
              </p>
            </div>
          </div>
          <button
            onClick={onAutoRefreshChange}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              autoRefresh ? 'bg-primary' : 'bg-border'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                autoRefresh ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Refresh Interval */}
        <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <Icon name="clock" size={16} className="text-text-secondary" />
            <div>
              <span className="text-sm font-medium text-text-primary">
                Refresh Interval
              </span>
              <p className="text-xs text-text-secondary">
                How often to update data
              </p>
            </div>
          </div>
          <select
            value={refreshInterval}
            onChange={(e) => onRefreshIntervalChange(parseInt(e.target.value))}
            className="bg-background border border-border rounded px-3 py-1 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={!autoRefresh}
          >
            {refreshIntervalOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Expanded Settings */}
      {isExpanded && (
        <div className="mt-6 space-y-6">
          {/* Alert Thresholds */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">
              Alert Thresholds
            </h4>
            <div className="space-y-3">
              {Object.entries(thresholds).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                  <div>
                    <span className="text-sm font-medium text-text-primary capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => handleThresholdChange(key, e.target.value)}
                      className="w-20 h-2 bg-border rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm text-text-primary w-12 text-right">
                      {value}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">
              Notifications
            </h4>
            <div className="space-y-3">
              {Object.entries(notifications).map(([key, enabled]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <Icon 
                      name={
                        key === 'email' ? 'mail' :
                        key === 'sms' ? 'phone' :
                        key === 'webhook'? 'webhook' : 'bell'
                      } 
                      size={16} 
                      className="text-text-secondary" 
                    />
                    <span className="text-sm font-medium text-text-primary capitalize">
                      {key}
                    </span>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      enabled ? 'bg-primary' : 'bg-border'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveConfiguration}
              iconName="save"
            >
              Save Configuration
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetConfiguration}
              iconName="refresh-cw"
            >
              Reset to Default
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigurationPanel;