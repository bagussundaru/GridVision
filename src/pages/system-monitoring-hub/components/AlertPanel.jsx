import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertPanel = ({ alerts, onAlertAction }) => {
  const [filter, setFilter] = useState('all');

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'high':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'medium':
        return 'text-chart-4 bg-chart-4/10 border-chart-4/20';
      case 'low':
        return 'text-primary bg-primary/10 border-primary/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return 'alert-triangle';
      case 'warning':
        return 'alert-circle';
      case 'info':
        return 'info';
      default:
        return 'bell';
    }
  };

  const filteredAlerts = alerts?.filter(alert => {
    if (filter === 'all') return true;
    return alert.severity === filter;
  }) || [];

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">System Alerts</h3>
        <div className="flex items-center gap-2">
          <div className="animate-pulse w-2 h-2 bg-destructive rounded-full"></div>
          <span className="text-sm text-text-secondary">
            {filteredAlerts.length} Active
          </span>
        </div>
      </div>

      {/* Alert Filter */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-text-secondary">Filter:</span>
        <div className="flex bg-background border border-border rounded-lg p-1">
          {['all', 'high', 'medium', 'low'].map((severity) => (
            <button
              key={severity}
              onClick={() => setFilter(severity)}
              className={`px-3 py-1 rounded text-sm transition-all capitalize ${
                filter === severity
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-accent'
              }`}
            >
              {severity}
            </button>
          ))}
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="check-circle" size={48} className="text-primary mx-auto mb-2" />
            <p className="text-text-secondary">No active alerts</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border transition-all duration-200 hover:border-primary/50 ${
                getSeverityColor(alert.severity)
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <Icon 
                    name={getAlertIcon(alert.type)} 
                    size={16} 
                    className="text-current"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-medium px-2 py-1 rounded capitalize ${
                      alert.severity === 'critical' || alert.severity === 'high' ?'bg-destructive/20 text-destructive'
                        : alert.severity === 'medium' ?'bg-chart-4/20 text-chart-4' :'bg-primary/20 text-primary'
                    }`}>
                      {alert.severity}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {formatTimestamp(alert.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-text-primary mb-2 line-clamp-2">
                    {alert.message}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => onAlertAction(alert.id, 'acknowledge')}
                    >
                      Acknowledge
                    </Button>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => onAlertAction(alert.id, 'dismiss')}
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Alert Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-destructive">
              {alerts?.filter(a => a.severity === 'critical' || a.severity === 'high').length || 0}
            </div>
            <div className="text-xs text-text-secondary">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-chart-4">
              {alerts?.filter(a => a.severity === 'medium').length || 0}
            </div>
            <div className="text-xs text-text-secondary">Medium</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">
              {alerts?.filter(a => a.severity === 'low').length || 0}
            </div>
            <div className="text-xs text-text-secondary">Low</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-text-primary">
              {alerts?.length || 0}
            </div>
            <div className="text-xs text-text-secondary">Total</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertPanel;