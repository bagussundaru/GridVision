import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SolarPanelCharts = ({ solarData, timeRange }) => {
  const [activeChart, setActiveChart] = useState('power');

  // Generate mock historical data for solar panels
  const generateSolarData = () => {
    const dataPoints = timeRange === '15m' ? 15 : timeRange === '1h' ? 24 : timeRange === '6h' ? 24 : 24;
    const data = [];
    
    for (let i = dataPoints; i >= 0; i--) {
      const hour = new Date(Date.now() - i * 60000 * (timeRange === '24h' ? 60 : 1)).getHours();
      const timestamp = new Date(Date.now() - i * 60000 * (timeRange === '24h' ? 60 : 1));
      
      // Simulate solar power based on time of day (peak at noon)
      const solarMultiplier = Math.max(0, Math.sin((hour - 6) * Math.PI / 12));
      const baseProduction = 25; // kW peak capacity
      
      data.push({
        time: timestamp.toLocaleTimeString('id-ID', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        fullTime: timestamp,
        solarPower: (baseProduction * solarMultiplier * (0.8 + Math.random() * 0.4)).toFixed(1),
        batteryLevel: Math.max(20, Math.min(100, 85 + Math.random() * 15 - 7.5)).toFixed(1),
        chargingCurrent: (solarMultiplier * 40 * (0.9 + Math.random() * 0.2)).toFixed(1),
        systemVoltage: (13.8 + Math.random() * 0.6 - 0.3).toFixed(1),
        inverterTemp: (25 + solarMultiplier * 20 + Math.random() * 10).toFixed(1),
        efficiency: (18 + Math.random() * 4 - 2).toFixed(1),
        consumption: (15 + Math.random() * 10).toFixed(1),
        gridExport: Math.max(0, (baseProduction * solarMultiplier - 15 - Math.random() * 10)).toFixed(1)
      });
    }
    
    return data;
  };

  const chartData = generateSolarData();

  const chartConfigs = {
    power: {
      title: 'Produksi & Konsumsi Daya',
      icon: 'zap',
      color: '#F59E0B',
      lines: [
        { key: 'solarPower', name: 'Produksi Solar', color: '#F59E0B', unit: 'kW' },
        { key: 'consumption', name: 'Konsumsi', color: '#EF4444', unit: 'kW' },
        { key: 'gridExport', name: 'Ekspor ke Grid', color: '#22C55E', unit: 'kW' }
      ]
    },
    battery: {
      title: 'Status Baterai & Pengisian',
      icon: 'battery',
      color: '#22C55E',
      lines: [
        { key: 'batteryLevel', name: 'Level Baterai', color: '#22C55E', unit: '%' },
        { key: 'chargingCurrent', name: 'Arus Pengisian', color: '#3B82F6', unit: 'A' }
      ]
    },
    system: {
      title: 'Parameter Sistem',
      icon: 'activity',
      color: '#8B5CF6',
      lines: [
        { key: 'systemVoltage', name: 'Tegangan Sistem', color: '#8B5CF6', unit: 'V' },
        { key: 'inverterTemp', name: 'Suhu Inverter', color: '#F97316', unit: '°C' },
        { key: 'efficiency', name: 'Efisiensi', color: '#06B6D4', unit: '%' }
      ]
    }
  };

  const currentConfig = chartConfigs[activeChart];

  // Daily production chart data
  const dailyProductionData = [
    { hour: '06:00', production: 2.1, consumption: 8.5 },
    { hour: '07:00', production: 5.8, consumption: 12.3 },
    { hour: '08:00', production: 12.4, consumption: 15.2 },
    { hour: '09:00', production: 18.7, consumption: 18.9 },
    { hour: '10:00', production: 22.3, consumption: 22.1 },
    { hour: '11:00', production: 24.8, consumption: 25.4 },
    { hour: '12:00', production: 25.2, consumption: 28.7 },
    { hour: '13:00', production: 24.9, consumption: 31.2 },
    { hour: '14:00', production: 23.1, consumption: 29.8 },
    { hour: '15:00', production: 19.8, consumption: 26.5 },
    { hour: '16:00', production: 15.2, consumption: 23.1 },
    { hour: '17:00', production: 9.7, consumption: 19.8 },
    { hour: '18:00', production: 4.2, consumption: 22.4 },
    { hour: '19:00', production: 0.8, consumption: 18.9 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value} {currentConfig.lines.find(l => l.key === entry.dataKey)?.unit}
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
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/20 rounded-lg">
            <Icon name={currentConfig.icon} size={20} color={currentConfig.color} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              {currentConfig.title}
            </h3>
            <p className="text-sm text-text-secondary">
              Grafik performa sistem solar dalam {timeRange}
            </p>
          </div>
        </div>
        
        {/* Chart Type Selector */}
        <div className="flex gap-2">
          {Object.entries(chartConfigs).map(([key, config]) => (
            <Button
              key={key}
              variant={activeChart === key ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveChart(key)}
              iconName={config.icon}
            >
              {key === 'power' ? 'Daya' : key === 'battery' ? 'Baterai' : 'Sistem'}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="time" 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            {currentConfig.lines.map((line, index) => (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.key}
                stroke={line.color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: line.color, strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Overview Chart */}
      <div className="border-t border-border pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="bar-chart-3" size={18} color="#6B7280" />
          <h4 className="text-md font-semibold text-text-primary">
            Produksi vs Konsumsi Harian
          </h4>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyProductionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="hour" 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-surface border border-border rounded-lg p-3 shadow-lg">
                        <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
                        {payload.map((entry, index) => (
                          <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {entry.value} kW
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="production"
                stackId="1"
                stroke="#F59E0B"
                fill="#F59E0B"
                fillOpacity={0.3}
                name="Produksi Solar"
              />
              <Area
                type="monotone"
                dataKey="consumption"
                stackId="2"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.3}
                name="Konsumsi"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart Legend */}
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        {currentConfig.lines.map((line) => (
          <div key={line.key} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: line.color }}
            ></div>
            <span className="text-sm text-text-secondary">{line.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolarPanelCharts;