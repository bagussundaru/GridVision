import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  RefreshCw, 
  Settings, 
  Activity, 
  Shield, 
  Brain,
  ChevronDown,
  Play,
  Pause,
  Sun,
  Battery,
  Zap
} from 'lucide-react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import PLNLogo from '../../components/ui/PLNLogo';
import SystemMetrics from './components/SystemMetrics';
import NetworkTopology from './components/NetworkTopology';
import AlertPanel from './components/AlertPanel';
import PerformanceCharts from './components/PerformanceCharts';
import SystemLogs from './components/SystemLogs';
import StatusIndicators from './components/StatusIndicators';
import ConfigurationPanel from './components/ConfigurationPanel';
import SolarPanelMetrics from './components/SolarPanelMetrics';
import SolarPanelCharts from './components/SolarPanelCharts';
import SolarDeviceTopology from './components/SolarDeviceTopology';
import SolarAlerts from './components/SolarAlerts';

const SystemMonitoringHub = () => {
  const navigate = useNavigate();
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5000);
  const [systemData, setSystemData] = useState({
    timestamp: new Date().toISOString(),
    metrics: {},
    alerts: [],
    logs: [],
    networkStatus: 'operational'
  });
  
  const [solarData, setSolarData] = useState({
    timestamp: new Date().toISOString(),
    solarPower: '0',
    batteryLevel: '0',
    chargingCurrent: '0',
    systemVoltage: '0',
    inverterTemp: '0',
    efficiency: '0',
    dailyProduction: '0',
    monthlyProduction: '0',
    savings: '0',
    co2Reduction: '0'
  });

  // Mock data for solar panel monitoring
  useEffect(() => {
    const generateSolarMockData = () => {
      const timestamp = new Date().toISOString();
      const hour = new Date().getHours();
      
      // Simulate solar power based on time of day (peak at noon)
      const solarMultiplier = Math.max(0, Math.sin((hour - 6) * Math.PI / 12));
      const maxPower = 25; // kW peak capacity
      const currentPower = (maxPower * solarMultiplier * (0.8 + Math.random() * 0.4));
      
      // Battery simulation
      const batteryLevel = Math.max(20, Math.min(100, 75 + Math.random() * 20 - 10));
      
      // Other solar metrics
      const chargingCurrent = solarMultiplier * 45 * (0.9 + Math.random() * 0.2);
      const systemVoltage = 48.0 + Math.random() * 1.0 - 0.5;
      const inverterTemp = 25 + solarMultiplier * 25 + Math.random() * 10;
      const efficiency = 18 + Math.random() * 4 - 2;
      
      return {
        timestamp,
        solarPower: currentPower.toFixed(1),
        batteryLevel: batteryLevel.toFixed(1),
        chargingCurrent: chargingCurrent.toFixed(1),
        systemVoltage: systemVoltage.toFixed(1),
        inverterTemp: inverterTemp.toFixed(1),
        efficiency: efficiency.toFixed(1),
        dailyProduction: (currentPower * 8 + Math.random() * 50).toFixed(1),
        monthlyProduction: (currentPower * 240 + Math.random() * 500).toFixed(0),
        savings: (currentPower * 240 * 1500).toFixed(0), // Rp per kWh
        co2Reduction: (currentPower * 240 * 0.85).toFixed(1) // kg CO2
      };
    };
    
    const generateSystemMockData = () => {
      const timestamp = new Date().toISOString();
      const cpuUsage = Math.random() * 80 + 10;
      const memoryUsage = Math.random() * 70 + 15;
      const networkBandwidth = Math.random() * 900 + 100;
      const processingQueue = Math.floor(Math.random() * 50);
      const activeConnections = Math.floor(Math.random() * 200) + 50;

      return {
        timestamp,
        metrics: {
          cpuUsage: cpuUsage.toFixed(1),
          memoryUsage: memoryUsage.toFixed(1),
          networkBandwidth: networkBandwidth.toFixed(0),
          processingQueue,
          activeConnections,
          systemLoad: (Math.random() * 3 + 0.5).toFixed(2),
          diskUsage: (Math.random() * 60 + 20).toFixed(1),
          uptime: '15d 8h 42m',
          temperature: (Math.random() * 15 + 35).toFixed(1)
        },
        alerts: generateAlerts(),
        logs: generateLogs(),
        networkStatus: cpuUsage > 80 || memoryUsage > 85 ? 'warning' : 'operational'
      };
    };

    const generateAlerts = () => {
      const alerts = [];
      const alertTypes = [
        { type: 'warning', message: 'High CPU usage detected on Server-03', severity: 'medium' },
        { type: 'info', message: 'Network maintenance scheduled for 02:00 UTC', severity: 'low' },
        { type: 'critical', message: 'Camera-07 offline - no response', severity: 'high' },
        { type: 'warning', message: 'Memory usage approaching threshold', severity: 'medium' },
        { type: 'info', message: 'System backup completed successfully', severity: 'low' }
      ];

      // Generate random alerts
      for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
        const alert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        alerts.push({
          id: Date.now() + i,
          ...alert,
          timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString()
        });
      }

      return alerts;
    };

    const generateLogs = () => {
      const logEntries = [
        '[INFO] AI Analysis completed for sector-A: 47 objects detected',
        '[WARNING] Network latency increased to 120ms on Node-04',
        '[SUCCESS] Database backup completed successfully',
        '[ERROR] Failed to connect to Camera-12: Connection timeout',
        '[INFO] System health check passed: All services operational',
        '[WARNING] Disk space usage at 78% on storage-server-01',
        '[INFO] User authentication successful: admin@grid-vision.ai',
        '[SUCCESS] Configuration update applied to all nodes'
      ];

      return Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        message: logEntries[Math.floor(Math.random() * logEntries.length)],
        timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
        level: ['info', 'warning', 'success', 'error'][Math.floor(Math.random() * 4)]
      }));
    };

    // Initial data load
    setSystemData(generateSystemMockData());
    setSolarData(generateSolarMockData());

    // Auto-refresh functionality
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        setSystemData(generateSystemMockData());
        setSolarData(generateSolarMockData());
      }, refreshInterval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, refreshInterval]);

  const handleTimeRangeChange = (range) => {
    setSelectedTimeRange(range);
    // In a real application, this would trigger data fetching for the selected time range
  };

  const handleRefreshToggle = () => {
    setAutoRefresh(!autoRefresh);
  };

  const handleNavigateToAnalysis = () => {
    navigate('/infrastructure-analysis-dashboard');
  };

  const handleNavigateToTopology = () => {
    navigate('/topology-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-secondary-100">
      <Header />
      
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F59E0B' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <main className="pt-18 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Mission Control Header */}
          <div className="mb-10">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <div className="w-2 h-8 bg-gradient-to-b from-pln-yellow to-pln-yellow-dark rounded-full mr-4"></div>
                    <h1 className="text-4xl font-bold text-text-primary">
                      <span className="text-transparent bg-gradient-to-r from-pln-yellow-dark via-pln-yellow to-pln-yellow-dark bg-clip-text">PLN Grid-Vision AI</span>
                      <span className="text-text-primary ml-2">Solar Monitoring Hub</span>
                    </h1>
                  </div>
                  <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">
                    Aplikasi pemantauan real-time dan analisis cerdas untuk sistem panel surya dan perangkat pendukung, didukung oleh teknologi AI terkini.
Saat ini, aplikasi masih dalam tahap prototype dan menggunakan data dummy untuk keperluan pengujian dan demonstrasi fungsi
                  </p>
                </div>
                <div className="flex flex-col items-end gap-4">
                  <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                    <span className="text-sm font-medium text-text-secondary">Auto-refresh:</span>
                    <Button
                      variant={autoRefresh ? "primary" : "outline"}
                      size="sm"
                      onClick={handleRefreshToggle}
                      iconName={autoRefresh ? "pause" : "play"}
                      className="shadow-sm"
                    >
                      {autoRefresh ? "ON" : "OFF"}
                    </Button>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNavigateToAnalysis}
                      iconName="camera"
                      className="bg-white/60 backdrop-blur-sm border-white/30 hover:bg-white/80 shadow-sm"
                    >
                      Analysis Center
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNavigateToTopology}
                      iconName="network"
                      className="bg-white/60 backdrop-blur-sm border-white/30 hover:bg-white/80 shadow-sm"
                    >
                      Topology View
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Solar System Status Overview */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl mb-10">
            <div className="flex items-center mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-pln-blue to-pln-blue-dark rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-gray-900">Status Sistem Panel Surya</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Solar Panel Status */}
              <div className="bg-gradient-to-br from-pln-yellow/10 to-pln-yellow/5 rounded-xl p-6 border border-pln-yellow/20 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                     <div className="w-16 h-16 bg-gradient-to-br from-pln-yellow to-pln-yellow-dark rounded-xl border border-pln-yellow/30 flex items-center justify-center shadow-lg">
                       <Sun className="h-8 w-8 text-white" />
                     </div>
                   </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Panel Surya</h3>
                    <p className="text-lg font-semibold text-pln-yellow-dark">{solarData.solarPower} kW</p>
                    <p className="text-sm text-gray-600 mb-2">sedang diproduksi</p>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-sm font-medium text-green-600">Operasional</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Battery Status */}
              <div className="bg-gradient-to-br from-pln-blue/10 to-pln-blue/5 rounded-xl p-6 border border-pln-blue/20 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                     <div className="w-16 h-16 bg-gradient-to-br from-pln-blue to-pln-blue-dark rounded-xl border border-pln-blue/30 flex items-center justify-center shadow-lg">
                       <Battery className="h-8 w-8 text-white" />
                     </div>
                   </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Baterai</h3>
                    <p className="text-lg font-semibold text-pln-blue-dark">{solarData.batteryLevel}%</p>
                    <p className="text-sm text-gray-600 mb-2">kapasitas tersisa</p>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 animate-pulse ${
                        parseFloat(solarData.batteryLevel) > 50 ? 'bg-green-500' : 
                        parseFloat(solarData.batteryLevel) > 20 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className={`text-sm font-medium ${
                        parseFloat(solarData.batteryLevel) > 50 ? 'text-green-600' : 
                        parseFloat(solarData.batteryLevel) > 20 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {parseFloat(solarData.batteryLevel) > 50 ? 'Baik' : 
                         parseFloat(solarData.batteryLevel) > 20 ? 'Sedang' : 'Rendah'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inverter Status */}
              <div className="bg-gradient-to-br from-pln-red/10 to-pln-red/5 rounded-xl p-6 border border-pln-red/20 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                     <div className="w-16 h-16 bg-gradient-to-br from-pln-red to-pln-red-dark rounded-xl border border-pln-red/30 flex items-center justify-center shadow-lg">
                       <Zap className="h-8 w-8 text-white" />
                     </div>
                   </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Inverter</h3>
                    <p className="text-lg font-semibold text-pln-red-dark">{solarData.inverterTemp}°C</p>
                    <p className="text-sm text-gray-600 mb-2">suhu operasional</p>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 animate-pulse ${
                        parseFloat(solarData.inverterTemp) < 60 ? 'bg-green-500' : 
                        parseFloat(solarData.inverterTemp) < 80 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className={`text-sm font-medium ${
                        parseFloat(solarData.inverterTemp) < 60 ? 'text-green-600' : 
                        parseFloat(solarData.inverterTemp) < 80 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {parseFloat(solarData.inverterTemp) < 60 ? 'Normal' : 
                         parseFloat(solarData.inverterTemp) < 80 ? 'Hangat' : 'Panas'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-1 h-6 bg-gradient-to-b from-accent to-accent-600 rounded-full mr-3"></div>
                  <h2 className="text-2xl font-bold text-text-primary">
                    System Performance Dashboard
                  </h2>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-text-secondary">Time Range:</span>
                  <div className="flex bg-white/60 backdrop-blur-sm border border-white/40 rounded-xl p-1 shadow-sm">
                    {['15m', '1h', '6h', '24h', '7d'].map((range) => (
                      <button
                        key={range}
                        onClick={() => handleTimeRangeChange(range)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedTimeRange === range
                            ? 'bg-gradient-to-r from-primary to-primary-600 text-white shadow-md transform scale-105'
                            : 'text-text-secondary hover:text-text-primary hover:bg-white/80'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Solar Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {/* Solar Panel Metrics */}
            <div className="xl:col-span-1">
              <SolarPanelMetrics 
                solarData={solarData}
                timestamp={solarData.timestamp}
              />
            </div>

            {/* Solar Performance Charts */}
            <div className="xl:col-span-2">
              <SolarPanelCharts 
                timeRange={selectedTimeRange}
                solarData={solarData}
              />
            </div>

            {/* Solar Device Topology */}
            <div className="xl:col-span-2">
              <SolarDeviceTopology 
                solarData={solarData}
              />
            </div>

            {/* Solar Alert Panel */}
            <div className="xl:col-span-1">
              <SolarAlerts 
                solarData={solarData}
              />
            </div>

            {/* System Metrics (for monitoring system) */}
            <div className="xl:col-span-1">
              <SystemMetrics 
                metrics={systemData.metrics}
                timeRange={selectedTimeRange}
              />
            </div>

            {/* System Logs */}
            <div className="xl:col-span-2">
              <SystemLogs 
                logs={systemData.logs}
                maxEntries={8}
              />
            </div>
          </div>

          {/* Solar System Information Footer */}
          <div className="mt-16 bg-gradient-to-br from-white/80 via-white/70 to-white/60 backdrop-blur-sm border border-white/30 rounded-3xl p-10 shadow-2xl">
            {/* PLN Branding Header */}
            <div className="flex items-center justify-center mb-10 pb-6 border-b border-white/40">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pln-yellow/30 to-pln-blue/30 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-3 border border-white/30">
                  <PLNLogo className="w-16 h-16" />
                </div>
              </div>
              <div className="text-center ml-6">
                <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-pln-blue-dark via-pln-yellow-dark to-pln-blue-dark bg-clip-text mb-1">
                  PLN Grid-Vision AI
                </h3>
                <p className="text-lg font-semibold text-pln-yellow-dark">Solar Monitoring System</p>
                <div className="w-20 h-1 bg-gradient-to-r from-pln-yellow to-pln-blue rounded-full mx-auto mt-2"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <span className="text-sm font-bold text-pln-blue-dark block mb-1">Sistem</span>
                <span className="text-lg font-semibold text-gray-800">PLN Solar Monitor</span>
                <span className="text-sm text-gray-600 block">v1.0.0</span>
              </div>
              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <span className="text-sm font-bold text-pln-blue-dark block mb-1">Update Terakhir</span>
                <span className="text-sm font-semibold text-gray-800">{new Date(solarData.timestamp).toLocaleString()}</span>
              </div>
              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <span className="text-sm font-bold text-pln-blue-dark block mb-1">Efisiensi</span>
                <span className="text-2xl font-bold text-pln-yellow-dark">{solarData.efficiency}%</span>
              </div>
              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <span className="text-sm font-bold text-pln-blue-dark block mb-1">Status Sistem</span>
                <span className={`text-lg font-bold ${
                  parseFloat(solarData.batteryLevel) > 50 && parseFloat(solarData.inverterTemp) < 60 ? 'text-green-600' :
                  parseFloat(solarData.batteryLevel) > 20 && parseFloat(solarData.inverterTemp) < 80 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {parseFloat(solarData.batteryLevel) > 50 && parseFloat(solarData.inverterTemp) < 60 ? 'Optimal' :
                   parseFloat(solarData.batteryLevel) > 20 && parseFloat(solarData.inverterTemp) < 80 ? 'Perhatian' :
                   'Kritis'}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-pln-yellow/20 to-pln-yellow/10 rounded-2xl p-6 border border-pln-yellow/30 text-center hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pln-yellow to-pln-yellow-dark rounded-2xl mb-4 shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">AI Processing</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  ShiftwiseConv neural networks running 24/7 untuk analisis prediktif
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-pln-blue/20 to-pln-blue/10 rounded-2xl p-6 border border-pln-blue/30 text-center hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pln-blue to-pln-blue-dark rounded-2xl mb-4 shadow-lg">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">Real-time Analytics</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Live data processing dan visualisasi performa sistem
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-pln-red/20 to-pln-red/10 rounded-2xl p-6 border border-pln-red/30 text-center hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pln-red to-pln-red-dark rounded-2xl mb-4 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">Automated Alerts</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Intelligent threshold monitoring dengan notifikasi otomatis
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-200/50 to-gray-100/30 rounded-2xl p-6 border border-gray-300/30 text-center hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl mb-4 shadow-lg">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">Remote Access</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Secure cloud-based monitoring dengan akses dari mana saja
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SystemMonitoringHub;