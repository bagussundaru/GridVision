import React from 'react';
import Icon from '../../../components/AppIcon';

const KPIMetrics = () => {
  const kpiData = [
    {
      id: 1,
      title: 'Active Cameras',
      value: '247',
      change: '+12',
      changeType: 'positive',
      icon: 'Camera',
      color: 'accent'
    },
    {
      id: 2,
      title: 'Alerts Processed',
      value: '1,834',
      change: '+156',
      changeType: 'positive',
      icon: 'AlertTriangle',
      color: 'warning'
    },
    {
      id: 3,
      title: 'System Uptime',
      value: '99.7%',
      change: '+0.2%',
      changeType: 'positive',
      icon: 'Activity',
      color: 'success'
    },
    {
      id: 4,
      title: 'Analysis Completion',
      value: '94.2%',
      change: '-2.1%',
      changeType: 'negative',
      icon: 'BarChart3',
      color: 'primary'
    },
    {
      id: 5,
      title: 'Critical Issues',
      value: '23',
      change: '+5',
      changeType: 'negative',
      icon: 'Zap',
      color: 'error'
    },
    {
      id: 6,
      title: 'Data Processed',
      value: '2.4TB',
      change: '+340MB',
      changeType: 'positive',
      icon: 'Database',
      color: 'accent'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      {kpiData.map((kpi) => (
        <div
          key={kpi.id}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:bg-slate-800/70 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-${kpi.color}-500/20 border border-${kpi.color}-500/30`}>
              <Icon
                name={kpi.icon}
                size={20}
                className={`text-${kpi.color}-400`}
              />
            </div>
            <div className={`text-sm font-medium ${
              kpi.changeType === 'positive' ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {kpi.change}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {kpi.value}
            </div>
            <div className="text-sm text-slate-400">
              {kpi.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPIMetrics;