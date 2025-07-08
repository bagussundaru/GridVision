import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SystemLogs = ({ logs, maxEntries = 10 }) => {
  const [filter, setFilter] = useState('all');

  const getLogIcon = (level) => {
    switch (level) {
      case 'error':
        return 'alert-triangle';
      case 'warning':
        return 'alert-circle';
      case 'success':
        return 'check-circle';
      case 'info':
        return 'info';
      default:
        return 'file-text';
    }
  };

  const getLogColor = (level) => {
    switch (level) {
      case 'error':
        return 'text-destructive';
      case 'warning':
        return 'text-chart-4';
      case 'success':
        return 'text-primary';
      case 'info':
        return 'text-chart-2';
      default:
        return 'text-text-secondary';
    }
  };

  const filteredLogs = logs?.filter(log => {
    if (filter === 'all') return true;
    return log.level === filter;
  }).slice(0, maxEntries) || [];

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
        <h3 className="text-lg font-semibold text-text-primary">System Logs</h3>
        <div className="flex items-center gap-2">
          <div className="animate-pulse w-2 h-2 bg-chart-2 rounded-full"></div>
          <span className="text-sm text-text-secondary">Live</span>
        </div>
      </div>

      {/* Log Filter */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-text-secondary">Level:</span>
        <div className="flex bg-background border border-border rounded-lg p-1">
          {['all', 'error', 'warning', 'success', 'info'].map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-3 py-1 rounded text-sm transition-all capitalize ${
                filter === level
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-accent'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Log Entries */}
      <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-thin">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="file-text" size={48} className="text-text-secondary mx-auto mb-2" />
            <p className="text-text-secondary">No log entries</p>
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border hover:border-primary/50 transition-all duration-200"
            >
              <div className="flex-shrink-0 mt-1">
                <Icon 
                  name={getLogIcon(log.level)} 
                  size={14} 
                  className={getLogColor(log.level)}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-medium px-2 py-1 rounded uppercase ${
                    log.level === 'error' ?'bg-destructive/20 text-destructive'
                      : log.level === 'warning' ?'bg-chart-4/20 text-chart-4'
                      : log.level === 'success' ?'bg-primary/20 text-primary' :'bg-chart-2/20 text-chart-2'
                  }`}>
                    {log.level}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {formatTimestamp(log.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-text-primary font-mono text-responsive">
                  {log.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Log Statistics */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-destructive">
              {logs?.filter(l => l.level === 'error').length || 0}
            </div>
            <div className="text-xs text-text-secondary">Errors</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-chart-4">
              {logs?.filter(l => l.level === 'warning').length || 0}
            </div>
            <div className="text-xs text-text-secondary">Warnings</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">
              {logs?.filter(l => l.level === 'success').length || 0}
            </div>
            <div className="text-xs text-text-secondary">Success</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-chart-2">
              {logs?.filter(l => l.level === 'info').length || 0}
            </div>
            <div className="text-xs text-text-secondary">Info</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemLogs;