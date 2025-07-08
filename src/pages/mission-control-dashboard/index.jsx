import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import KPIMetrics from './components/KPIMetrics';
import InteractiveMap from './components/InteractiveMap';
import DataVisualization from './components/DataVisualization';
import QuickActions from './components/QuickActions';

const MissionControlDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState('operational');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      case 'warning': return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                    <Icon name="Zap" size={24} className="text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-800"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Grid-Vision AI</h1>
                  <p className="text-sm text-slate-400">Mission Control Center</p>
                </div>
              </div>
              
              {/* System Status */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusColor(systemStatus)}`}>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-sm font-medium">System {systemStatus.toUpperCase()}</span>
              </div>
            </div>

            {/* Time and Actions */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-mono text-white">{formatTime(currentTime)}</div>
                <div className="text-sm text-slate-400">{formatDate(currentTime)}</div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Camera"
                  onClick={() => navigate('/infrastructure-analysis-center')}
                  className="border-slate-600/50 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  Analysis Center
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Settings"
                  className="border-slate-600/50 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* KPI Metrics */}
        <KPIMetrics />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Interactive Map */}
          <div className="xl:col-span-3">
            <InteractiveMap />
          </div>

          {/* Data Visualization */}
          <div className="xl:col-span-2">
            <DataVisualization />
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="mt-6">
          <QuickActions />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800/50 backdrop-blur-sm border-t border-slate-700/50 p-6 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-sm text-slate-400">
                © 2024 Grid-Vision AI. All rights reserved.
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span>ShiftwiseConv Neural Network v2.1</span>
                <span>•</span>
                <span>Build 2024.12.20</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Icon name="Wifi" size={16} />
                <span>Connected</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Icon name="Shield" size={16} />
                <span>Secure</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MissionControlDashboard;