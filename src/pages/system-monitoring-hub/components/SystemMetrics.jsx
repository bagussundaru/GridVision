import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemMetrics = ({ metrics, timeRange }) => {
  const getMetricColor = (value, thresholds) => {
    const numValue = parseFloat(value);
    if (numValue >= thresholds.critical) return 'text-destructive';
    if (numValue >= thresholds.warning) return 'text-chart-4';
    return 'text-primary';
  };

  const getMetricBgColor = (value, thresholds) => {
    const numValue = parseFloat(value);
    if (numValue >= thresholds.critical) return 'bg-destructive/10';
    if (numValue >= thresholds.warning) return 'bg-chart-4/10';
    return 'bg-primary/10';
  };

  const metricsConfig = [
    {
      key: 'cpuUsage',
      label: 'CPU Usage',
      value: metrics?.cpuUsage || '0',
      unit: '%',
      icon: 'cpu',
      thresholds: { warning: 70, critical: 85 }
    },
    {
      key: 'memoryUsage',
      label: 'Memory Usage',
      value: metrics?.memoryUsage || '0',
      unit: '%',
      icon: 'memory-stick',
      thresholds: { warning: 75, critical: 90 }
    },
    {
      key: 'networkBandwidth',
      label: 'Network Bandwidth',
      value: metrics?.networkBandwidth || '0',
      unit: 'Mbps',
      icon: 'network',
      thresholds: { warning: 800, critical: 950 }
    },
    {
      key: 'processingQueue',
      label: 'Processing Queue',
      value: metrics?.processingQueue || '0',
      unit: 'tasks',
      icon: 'list',
      thresholds: { warning: 30, critical: 45 }
    },
    {
      key: 'activeConnections',
      label: 'Active Connections',
      value: metrics?.activeConnections || '0',
      unit: 'conn',
      icon: 'users',
      thresholds: { warning: 180, critical: 220 }
    },
    {
      key: 'systemLoad',
      label: 'System Load',
      value: metrics?.systemLoad || '0',
      unit: '',
      icon: 'gauge',
      thresholds: { warning: 2.5, critical: 3.5 }
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">System Metrics</h3>
        <div className="flex items-center gap-2">
          <div className="animate-pulse w-2 h-2 bg-primary rounded-full"></div>
          <span className="text-sm text-text-secondary">Live Data</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {metricsConfig.map((metric) => (
          <div 
            key={metric.key}
            className={`p-3 rounded-lg border transition-all duration-200 ${
              getMetricBgColor(metric.value, metric.thresholds)
            } border-border hover:border-primary/50 min-h-[120px] flex flex-col justify-between`}
          >
            <div className="mb-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon 
                  name={metric.icon} 
                  size={12} 
                  className="text-text-secondary flex-shrink-0" 
                />
                <span className="text-xs font-medium text-text-secondary truncate">
                  {metric.label}
                </span>
              </div>
              <div className="flex justify-end">
                <div className={`text-xs px-1.5 py-0.5 rounded text-center min-w-[45px] ${
                  parseFloat(metric.value) >= metric.thresholds.critical
                    ? 'bg-destructive/20 text-destructive'
                    : parseFloat(metric.value) >= metric.thresholds.warning
                    ? 'bg-chart-4/20 text-chart-4' :'bg-primary/20 text-primary'
                }`}>
                  {parseFloat(metric.value) >= metric.thresholds.critical
                    ? 'CRITICAL'
                    : parseFloat(metric.value) >= metric.thresholds.warning
                    ? 'WARNING' :'NORMAL'
                  }
                </div>
              </div>
            </div>
            <div className="flex items-baseline gap-1 mb-3">
              <span className={`text-lg font-bold leading-none ${
                getMetricColor(metric.value, metric.thresholds)
              }`}>
                {metric.value}
              </span>
              <span className="text-xs text-text-secondary">
                {metric.unit}
              </span>
            </div>
            <div className="mt-auto">
              <div className="h-1 bg-border rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    parseFloat(metric.value) >= metric.thresholds.critical
                      ? 'bg-destructive'
                      : parseFloat(metric.value) >= metric.thresholds.warning
                      ? 'bg-chart-4' :'bg-primary'
                  }`}
                  style={{ 
                    width: `${Math.min(100, (parseFloat(metric.value) / 100) * 100)}%` 
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional System Information */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Icon name="clock" size={12} className="text-text-secondary" />
              <span className="text-xs text-text-secondary">Uptime:</span>
            </div>
            <div className="text-sm font-medium text-text-primary">
              {metrics?.uptime || '15d 8h 42m'}
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Icon name="hard-drive" size={12} className="text-text-secondary" />
              <span className="text-xs text-text-secondary">Disk Usage:</span>
            </div>
            <div className="text-sm font-medium text-text-primary">
              {metrics?.diskUsage || '30.4'}%
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Icon name="thermometer" size={12} className="text-text-secondary" />
              <span className="text-xs text-text-secondary">Temperature:</span>
            </div>
            <div className="text-sm font-medium text-text-primary">
              {metrics?.temperature || '38.7'}°C
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMetrics;