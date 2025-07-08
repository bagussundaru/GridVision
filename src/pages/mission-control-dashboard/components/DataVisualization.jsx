import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const DataVisualization = () => {
  const [activeChart, setActiveChart] = useState('performance');
  const [isRealTime, setIsRealTime] = useState(true);

  const performanceData = [
    { time: '00:00', cpu: 65, memory: 78, network: 45 },
    { time: '04:00', cpu: 72, memory: 82, network: 52 },
    { time: '08:00', cpu: 85, memory: 88, network: 67 },
    { time: '12:00', cpu: 78, memory: 85, network: 73 },
    { time: '16:00', cpu: 82, memory: 90, network: 68 },
    { time: '20:00', cpu: 69, memory: 75, network: 55 },
    { time: '24:00', cpu: 63, memory: 72, network: 48 }
  ];

  const alertData = [
    { category: 'Critical', count: 23, color: '#ef4444' },
    { category: 'Warning', count: 67, color: '#f59e0b' },
    { category: 'Info', count: 124, color: '#06b6d4' },
    { category: 'Resolved', count: 856, color: '#10b981' }
  ];

  const analysisData = [
    { hour: '00', damage: 12, vegetation: 8, thermal: 5 },
    { hour: '04', damage: 15, vegetation: 12, thermal: 7 },
    { hour: '08', damage: 28, vegetation: 18, thermal: 15 },
    { hour: '12', damage: 35, vegetation: 25, thermal: 22 },
    { hour: '16', damage: 42, vegetation: 30, thermal: 28 },
    { hour: '20', damage: 32, vegetation: 22, thermal: 18 },
    { hour: '24', damage: 18, vegetation: 14, thermal: 10 }
  ];

  const chartOptions = [
    { id: 'performance', label: 'System Performance', icon: 'Activity' },
    { id: 'alerts', label: 'Alert Distribution', icon: 'AlertTriangle' },
    { id: 'analysis', label: 'Analysis Activity', icon: 'BarChart3' }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'performance':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="cpu" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4' }} />
              <Line type="monotone" dataKey="memory" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
              <Line type="monotone" dataKey="network" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'alerts':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={alertData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="count"
              >
                {alertData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'analysis':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analysisData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="damage" fill="#ef4444" />
              <Bar dataKey="vegetation" fill="#10b981" />
              <Bar dataKey="thermal" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Data Analytics</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRealTime(!isRealTime)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              isRealTime
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :'bg-slate-700/50 text-slate-400 border border-slate-600/50'
            }`}
          >
            <Icon name="Radio" size={14} className="inline mr-1" />
            Real-time
          </button>
        </div>
      </div>

      {/* Chart Type Selector */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {chartOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setActiveChart(option.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeChart === option.id
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :'bg-slate-700/50 text-slate-400 border border-slate-600/50 hover:bg-slate-700 hover:text-slate-300'
            }`}
          >
            <Icon name={option.icon} size={16} />
            {option.label}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="bg-slate-900/50 rounded-lg border border-slate-700/50 p-4">
        {renderChart()}
      </div>

      {/* Chart Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        {activeChart === 'performance' && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
              <span className="text-slate-400">CPU Usage</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-slate-400">Memory Usage</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-slate-400">Network Usage</span>
            </div>
          </>
        )}
        {activeChart === 'alerts' && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-slate-400">Critical ({alertData[0].count})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-slate-400">Warning ({alertData[1].count})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
              <span className="text-slate-400">Info ({alertData[2].count})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-slate-400">Resolved ({alertData[3].count})</span>
            </div>
          </>
        )}
        {activeChart === 'analysis' && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-slate-400">Damage Detection</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-slate-400">Vegetation Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-slate-400">Thermal Monitoring</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DataVisualization;