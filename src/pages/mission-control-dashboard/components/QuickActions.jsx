import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const navigate = useNavigate();
  const [selectedFeed, setSelectedFeed] = useState(null);

  const recentAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Power Line Damage',
      location: 'Sector 7-Alpha',
      time: '2 min ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Vegetation Overgrowth',
      location: 'Transmission Tower B-12',
      time: '15 min ago',
      status: 'investigating'
    },
    {
      id: 3,
      type: 'info',
      title: 'Routine Inspection',
      location: 'Substation C-4',
      time: '1 hour ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Temperature Anomaly',
      location: 'Transformer Station D-2',
      time: '2 hours ago',
      status: 'monitoring'
    }
  ];

  const cameraFeeds = [
    { id: 1, name: 'Tower Alpha-7', status: 'online', quality: 'HD' },
    { id: 2, name: 'Substation Beta-3', status: 'online', quality: '4K' },
    { id: 3, name: 'Line Gamma-12', status: 'offline', quality: 'SD' },
    { id: 4, name: 'Hub Delta-9', status: 'online', quality: 'HD' },
    { id: 5, name: 'Station Epsilon-5', status: 'maintenance', quality: 'HD' }
  ];

  const quickActions = [
    {
      id: 1,
      title: 'Start Analysis',
      description: 'Launch infrastructure analysis',
      icon: 'Camera',
      action: () => navigate('/infrastructure-analysis-center'),
      color: 'cyan'
    },
    {
      id: 2,
      title: 'Emergency Protocol',
      description: 'Activate emergency response',
      icon: 'AlertTriangle',
      action: () => console.log('Emergency activated'),
      color: 'red'
    },
    {
      id: 3,
      title: 'System Diagnostics',
      description: 'Run comprehensive system check',
      icon: 'Settings',
      action: () => console.log('Diagnostics started'),
      color: 'blue'
    },
    {
      id: 4,
      title: 'Generate Report',
      description: 'Create detailed analysis report',
      icon: 'FileText',
      action: () => console.log('Report generated'),
      color: 'emerald'
    }
  ];

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'warning': return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
      case 'info': return 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-emerald-500';
      case 'offline': return 'bg-red-500';
      case 'maintenance': return 'bg-amber-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="space-y-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className={`w-full flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 hover:border-${action.color}-500/50 transition-all duration-200 group`}
            >
              <div className={`p-2 rounded-lg bg-${action.color}-500/20 border border-${action.color}-500/30 group-hover:bg-${action.color}-500/30`}>
                <Icon name={action.icon} size={16} className={`text-${action.color}-400`} />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-white">{action.title}</div>
                <div className="text-xs text-slate-400">{action.description}</div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-slate-400 group-hover:text-slate-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Camera Feeds */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Camera Feeds</h3>
        <div className="space-y-3">
          {cameraFeeds.map((feed) => (
            <div
              key={feed.id}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                selectedFeed === feed.id
                  ? 'bg-cyan-500/20 border-cyan-500/30' :'bg-slate-700/50 border-slate-600/50 hover:bg-slate-700'
              }`}
              onClick={() => setSelectedFeed(feed.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(feed.status)}`}></div>
                <div>
                  <div className="text-sm font-medium text-white">{feed.name}</div>
                  <div className="text-xs text-slate-400">{feed.quality} • {feed.status}</div>
                </div>
              </div>
              <Icon name="Video" size={16} className="text-slate-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Alerts</h3>
        <div className="space-y-3">
          {recentAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{alert.title}</div>
                  <div className="text-xs text-slate-400 mt-1">{alert.location}</div>
                  <div className="text-xs text-slate-500 mt-1">{alert.time}</div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  alert.status === 'active' ? 'bg-red-500/20 text-red-400' :
                  alert.status === 'investigating' ? 'bg-amber-500/20 text-amber-400' :
                  alert.status === 'completed'? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {alert.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;