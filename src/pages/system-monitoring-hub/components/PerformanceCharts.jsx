import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const PerformanceCharts = ({ metrics, timeRange }) => {
  // Generate mock historical data for charts
  const generateHistoricalData = () => {
    const dataPoints = timeRange === '15m' ? 15 : timeRange === '1h' ? 60 : 24;
    const data = [];
    
    for (let i = dataPoints; i >= 0; i--) {
      const timestamp = new Date(Date.now() - i * 60000);
      data.push({
        time: timestamp.toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        cpu: Math.max(0, Math.min(100, parseFloat(metrics?.cpuUsage || 0) + (Math.random() - 0.5) * 20)),
        memory: Math.max(0, Math.min(100, parseFloat(metrics?.memoryUsage || 0) + (Math.random() - 0.5) * 15)),
        network: Math.max(0, Math.min(1000, parseFloat(metrics?.networkBandwidth || 0) + (Math.random() - 0.5) * 200)),
        connections: Math.max(0, Math.min(300, parseFloat(metrics?.activeConnections || 0) + (Math.random() - 0.5) * 40))
      });
    }
    
    return data;
  };

  const data = generateHistoricalData();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-text-primary mb-2">{`Time: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toFixed(1)}${entry.unit || ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Performance Trends</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-text-secondary">CPU</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-2 rounded-full"></div>
            <span className="text-sm text-text-secondary">Memory</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-4 rounded-full"></div>
            <span className="text-sm text-text-secondary">Network</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* CPU and Memory Usage Chart */}
        <div className="h-64">
          <h4 className="text-sm font-medium text-text-secondary mb-3">System Resources (%)</h4>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="cpu"
                name="CPU Usage"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
                strokeWidth={2}
                unit="%"
              />
              <Area
                type="monotone"
                dataKey="memory"
                name="Memory Usage"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.2}
                strokeWidth={2}
                unit="%"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Network Performance Chart */}
        <div className="h-64">
          <h4 className="text-sm font-medium text-text-secondary mb-3">Network Activity</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                yAxisId="left"
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                yAxisId="right"
                orientation="right"
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="network"
                name="Bandwidth"
                stroke="hsl(var(--chart-4))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-4))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                unit=" Mbps"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="connections"
                name="Active Connections"
                stroke="hsl(var(--chart-5))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-5))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                unit=" conn"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {Math.round(data[data.length - 1]?.cpu || 0)}%
            </div>
            <div className="text-sm text-text-secondary">Avg CPU</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-chart-2 mb-1">
              {Math.round(data[data.length - 1]?.memory || 0)}%
            </div>
            <div className="text-sm text-text-secondary">Avg Memory</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-chart-4 mb-1">
              {Math.round(data[data.length - 1]?.network || 0)}
            </div>
            <div className="text-sm text-text-secondary">Mbps</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-chart-5 mb-1">
              {Math.round(data[data.length - 1]?.connections || 0)}
            </div>
            <div className="text-sm text-text-secondary">Connections</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCharts;