import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusIndicators = ({ networkStatus, metrics, timestamp }) => {
  const getSystemStatus = () => {
    const cpuUsage = parseFloat(metrics?.cpuUsage || 0);
    const memoryUsage = parseFloat(metrics?.memoryUsage || 0);
    const processingQueue = parseInt(metrics?.processingQueue || 0);

    if (cpuUsage > 85 || memoryUsage > 90 || processingQueue > 45) {
      return 'critical';
    } else if (cpuUsage > 70 || memoryUsage > 75 || processingQueue > 30) {
      return 'warning';
    } else {
      return 'operational';
    }
  };

  const systemStatus = getSystemStatus();

  const statusConfig = {
    operational: {
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      icon: 'check-circle',
      label: 'Operational',
      description: 'All systems functioning normally'
    },
    warning: {
      color: 'text-chart-4',
      bgColor: 'bg-chart-4/10',
      borderColor: 'border-chart-4/20',
      icon: 'alert-triangle',
      label: 'Warning',
      description: 'System performance degraded'
    },
    critical: {
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive/20',
      icon: 'alert-circle',
      label: 'Critical',
      description: 'Immediate attention required'
    }
  };

  const currentStatus = statusConfig[systemStatus];

  const serviceStatuses = [
    {
      name: 'AI Processing',
      status: systemStatus === 'critical' ? 'degraded' : 'operational',
      icon: 'cpu',
      uptime: '99.9%'
    },
    {
      name: 'Network',
      status: networkStatus === 'warning' ? 'warning' : 'operational',
      icon: 'network',
      uptime: '99.8%'
    },
    {
      name: 'Database',
      status: 'operational',
      icon: 'database',
      uptime: '100%'
    },
    {
      name: 'Analytics',
      status: systemStatus === 'critical' ? 'degraded' : 'operational',
      icon: 'bar-chart',
      uptime: '99.7%'
    }
  ];

  const getServiceStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'text-primary';
      case 'warning':
        return 'text-chart-4';
      case 'degraded':
        return 'text-destructive';
      default:
        return 'text-text-secondary';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Overall System Status */}
      <div className={`
        p-6 rounded-lg border-2 ${currentStatus.bgColor} ${currentStatus.borderColor}
        transition-all duration-200 hover:shadow-lg
      `}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${currentStatus.bgColor} ${currentStatus.borderColor} border`}>
              <Icon 
                name={currentStatus.icon} 
                size={24} 
                className={`${currentStatus.color} animate-pulse`}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                System Status
              </h3>
              <p className="text-sm text-text-secondary">
                {currentStatus.description}
              </p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-medium ${
            currentStatus.bgColor
          } ${currentStatus.color}`}>
            {currentStatus.label}
          </div>
        </div>
        
        <div className="text-xs text-text-secondary">
          Last updated: {formatTimestamp(timestamp)}
        </div>
      </div>

      {/* Service Status Grid */}
      <div className="lg:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviceStatuses.map((service) => (
            <div 
              key={service.name}
              className="p-4 bg-surface border border-border rounded-lg hover:border-primary/50 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Icon 
                    name={service.icon} 
                    size={20} 
                    className="text-text-secondary"
                  />
                  <span className="font-medium text-text-primary">
                    {service.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    service.status === 'operational' ?'bg-primary animate-pulse' 
                      : service.status === 'warning' ?'bg-chart-4 animate-pulse' :'bg-destructive animate-pulse'
                  }`}></div>
                  <span className={`text-sm font-medium capitalize ${
                    getServiceStatusColor(service.status)
                  }`}>
                    {service.status}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Uptime</span>
                <span className="text-sm font-medium text-text-primary">
                  {service.uptime}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusIndicators;