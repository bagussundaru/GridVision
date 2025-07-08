import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SolarDeviceTopology = ({ solarData }) => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [viewMode, setViewMode] = useState('overview'); // overview, detailed

  const devices = [
    {
      id: 'solar-panels',
      name: 'Panel Surya',
      type: 'solar-panel',
      status: 'online',
      position: { x: 100, y: 50 },
      connections: ['charge-controller'],
      specs: {
        'Kapasitas': '25 kW',
        'Jumlah Panel': '100 unit',
        'Efisiensi': '20.1%',
        'Orientasi': 'Selatan, 30°'
      },
      metrics: {
        power: solarData?.solarPower || '18.5',
        voltage: '380V',
        current: '48.7A',
        temperature: '45°C'
      }
    },
    {
      id: 'charge-controller',
      name: 'Charge Controller',
      type: 'controller',
      status: 'online',
      position: { x: 300, y: 150 },
      connections: ['solar-panels', 'battery-bank', 'monitoring'],
      specs: {
        'Tipe': 'MPPT',
        'Kapasitas': '60A',
        'Tegangan Max': '150V',
        'Efisiensi': '98.5%'
      },
      metrics: {
        chargingCurrent: solarData?.chargingCurrent || '42.3',
        batteryVoltage: '48.2V',
        temperature: '38°C',
        efficiency: '97.8%'
      }
    },
    {
      id: 'battery-bank',
      name: 'Bank Baterai',
      type: 'battery',
      status: solarData?.batteryLevel > 20 ? 'online' : 'warning',
      position: { x: 500, y: 150 },
      connections: ['charge-controller', 'inverter'],
      specs: {
        'Kapasitas': '200 kWh',
        'Tipe': 'Lithium-ion',
        'Jumlah': '16 unit',
        'Tegangan Nominal': '48V'
      },
      metrics: {
        level: solarData?.batteryLevel || '85',
        voltage: solarData?.systemVoltage || '48.2',
        current: '25.4A',
        temperature: '28°C'
      }
    },
    {
      id: 'inverter',
      name: 'Inverter',
      type: 'inverter',
      status: 'online',
      position: { x: 700, y: 50 },
      connections: ['battery-bank', 'load-panel', 'grid-tie'],
      specs: {
        'Kapasitas': '30 kW',
        'Tipe': 'Pure Sine Wave',
        'Efisiensi': '96%',
        'Input': '48V DC'
      },
      metrics: {
        outputPower: '22.1kW',
        efficiency: '95.8%',
        temperature: solarData?.inverterTemp || '52',
        frequency: '50Hz'
      }
    },
    {
      id: 'load-panel',
      name: 'Panel Beban',
      type: 'load',
      status: 'online',
      position: { x: 900, y: 150 },
      connections: ['inverter'],
      specs: {
        'Kapasitas': '50 kW',
        'Tegangan': '220V AC',
        'Frekuensi': '50 Hz',
        'Fase': '3 Fase'
      },
      metrics: {
        consumption: '18.7kW',
        voltage: '220V',
        current: '28.5A',
        powerFactor: '0.95'
      }
    },
    {
      id: 'grid-tie',
      name: 'Grid Tie',
      type: 'grid',
      status: 'online',
      position: { x: 700, y: 250 },
      connections: ['inverter'],
      specs: {
        'Tipe': 'Bi-directional',
        'Kapasitas': '25 kW',
        'Tegangan': '220V AC',
        'Sinkronisasi': 'Otomatis'
      },
      metrics: {
        export: '3.4kW',
        import: '0kW',
        frequency: '50Hz',
        voltage: '220V'
      }
    },
    {
      id: 'monitoring',
      name: 'Sistem Monitoring',
      type: 'monitor',
      status: 'online',
      position: { x: 300, y: 300 },
      connections: ['charge-controller'],
      specs: {
        'Tipe': 'IoT Gateway',
        'Koneksi': 'WiFi/4G',
        'Protokol': 'Modbus RTU',
        'Update Rate': '1 detik'
      },
      metrics: {
        dataPoints: '1,247',
        uptime: '99.8%',
        latency: '45ms',
        storage: '78%'
      }
    }
  ];

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'solar-panel': return 'sun';
      case 'controller': return 'cpu';
      case 'battery': return 'battery';
      case 'inverter': return 'zap';
      case 'load': return 'home';
      case 'grid': return 'grid-3x3';
      case 'monitor': return 'monitor';
      default: return 'box';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-success bg-success/10 border-success/30';
      case 'warning': return 'text-warning bg-warning/10 border-warning/30';
      case 'offline': return 'text-error bg-error/10 border-error/30';
      default: return 'text-text-secondary bg-secondary-100 border-border';
    }
  };

  const getConnectionPath = (from, to) => {
    const fromDevice = devices.find(d => d.id === from);
    const toDevice = devices.find(d => d.id === to);
    
    if (!fromDevice || !toDevice) return '';
    
    return `M ${fromDevice.position.x + 50} ${fromDevice.position.y + 25} L ${toDevice.position.x + 50} ${toDevice.position.y + 25}`;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-secondary-100 rounded-lg">
            <Icon name="network" size={20} color="#22C55E" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Topologi Sistem Solar
            </h3>
            <p className="text-sm text-text-secondary">
              Diagram koneksi perangkat sistem energi surya
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'overview' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('overview')}
            iconName="eye"
          >
            Overview
          </Button>
          <Button
            variant={viewMode === 'detailed' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('detailed')}
            iconName="settings"
          >
            Detail
          </Button>
        </div>
      </div>

      {/* Topology Diagram */}
      <div className="relative bg-secondary-50 rounded-lg p-4 mb-6" style={{ height: '400px' }}>
        <svg className="absolute inset-0 w-full h-full">
          {/* Connection Lines */}
          {devices.map(device => 
            device.connections.map(connectionId => {
              const targetDevice = devices.find(d => d.id === connectionId);
              if (!targetDevice) return null;
              
              return (
                <line
                  key={`${device.id}-${connectionId}`}
                  x1={device.position.x + 50}
                  y1={device.position.y + 25}
                  x2={targetDevice.position.x + 50}
                  y2={targetDevice.position.y + 25}
                  stroke="#22C55E"
                  strokeWidth="2"
                  strokeDasharray={device.status === 'online' && targetDevice.status === 'online' ? '0' : '5,5'}
                />
              );
            })
          )}
          
          {/* Power Flow Animation */}
          {devices.map(device => 
            device.connections.map(connectionId => {
              const targetDevice = devices.find(d => d.id === connectionId);
              if (!targetDevice || device.status !== 'online') return null;
              
              return (
                <circle
                  key={`flow-${device.id}-${connectionId}`}
                  r="3"
                  fill="#F59E0B"
                  opacity="0.8"
                >
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    path={getConnectionPath(device.id, connectionId)}
                  />
                </circle>
              );
            })
          )}
        </svg>
        
        {/* Device Nodes */}
        {devices.map(device => (
          <div
            key={device.id}
            className={`absolute cursor-pointer transition-all hover:scale-105 ${
              selectedDevice?.id === device.id ? 'ring-2 ring-primary' : ''
            }`}
            style={{
              left: device.position.x,
              top: device.position.y,
              width: '100px',
              height: '50px'
            }}
            onClick={() => setSelectedDevice(device)}
          >
            <div className={`w-full h-full rounded-lg border-2 p-2 bg-surface shadow-sm ${
              getStatusColor(device.status)
            }`}>
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Icon 
                    name={getDeviceIcon(device.type)} 
                    size={16} 
                    className="mx-auto mb-1"
                  />
                  <div className="text-xs font-medium truncate">
                    {device.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Device Details Panel */}
      {selectedDevice && (
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${getStatusColor(selectedDevice.status)}`}>
                <Icon name={getDeviceIcon(selectedDevice.type)} size={20} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-text-primary">
                  {selectedDevice.name}
                </h4>
                <p className="text-sm text-text-secondary capitalize">
                  Status: {selectedDevice.status}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedDevice(null)}
              iconName="x"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Specifications */}
            <div>
              <h5 className="text-md font-semibold text-text-primary mb-3">
                Spesifikasi
              </h5>
              <div className="space-y-2">
                {Object.entries(selectedDevice.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-sm text-text-secondary">{key}:</span>
                    <span className="text-sm font-medium text-text-primary">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Real-time Metrics */}
            <div>
              <h5 className="text-md font-semibold text-text-primary mb-3">
                Metrik Real-time
              </h5>
              <div className="space-y-2">
                {Object.entries(selectedDevice.metrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-sm text-text-secondary capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                    </span>
                    <span className="text-sm font-medium text-text-primary">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-success/10 rounded-lg">
            <div className="text-lg font-bold text-success">
              {devices.filter(d => d.status === 'online').length}
            </div>
            <div className="text-xs text-text-secondary">Perangkat Online</div>
          </div>
          <div className="text-center p-3 bg-warning/10 rounded-lg">
            <div className="text-lg font-bold text-warning">
              {devices.filter(d => d.status === 'warning').length}
            </div>
            <div className="text-xs text-text-secondary">Peringatan</div>
          </div>
          <div className="text-center p-3 bg-primary/10 rounded-lg">
            <div className="text-lg font-bold text-primary">
              {solarData?.solarPower || '18.5'} kW
            </div>
            <div className="text-xs text-text-secondary">Total Produksi</div>
          </div>
          <div className="text-center p-3 bg-accent/10 rounded-lg">
            <div className="text-lg font-bold text-accent">
              {solarData?.efficiency || '19.2'}%
            </div>
            <div className="text-xs text-text-secondary">Efisiensi Sistem</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarDeviceTopology;