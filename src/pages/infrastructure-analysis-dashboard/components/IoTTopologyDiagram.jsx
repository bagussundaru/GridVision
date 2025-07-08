import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

const IoTTopologyDiagram = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [viewMode, setViewMode] = useState('overview'); // overview, detailed

  const devices = [
    {
      id: 'cloud',
      name: 'Cloud Infrastructure',
      type: 'cloud',
      description: 'AI Processing & Data Storage',
      status: 'online',
      connections: ['gateway', 'mobile-app', 'web-app'],
      specs: {
        'Processing Power': '100+ GPU Cores',
        'Storage': '10TB+',
        'AI Models': 'ShiftwiseConv Neural Networks',
        'Uptime': '99.9%'
      }
    },
    {
      id: 'gateway',
      name: 'Network Gateway',
      type: 'gateway',
      description: 'Central Communication Hub',
      status: 'online',
      connections: ['cloud', 'cctv-1', 'cctv-2', 'cctv-3', 'sensor-hub'],
      specs: {
        'Bandwidth': '1Gbps',
        'Protocols': 'HTTP/HTTPS, RTSP, MQTT',
        'Security': 'WPA3, VPN',
        'Ports': '24 Ethernet + 4 SFP+'
      }
    },
    {
      id: 'cctv-1',
      name: 'CCTV Camera #1',
      type: 'camera',
      description: 'Infrastructure Monitoring',
      status: 'online',
      connections: ['gateway'],
      specs: {
        'Resolution': '4K (3840x2160)',
        'Frame Rate': '30fps',
        'Night Vision': 'IR 50m',
        'Analytics': 'Damage Detection AI'
      }
    },
    {
      id: 'cctv-2',
      name: 'CCTV Camera #2',
      type: 'camera',
      description: 'Vegetation Analysis',
      status: 'online',
      connections: ['gateway'],
      specs: {
        'Resolution': '4K (3840x2160)',
        'Frame Rate': '30fps',
        'PTZ': 'Pan/Tilt/Zoom',
        'Analytics': 'Vegetation Detection AI'
      }
    },
    {
      id: 'cctv-3',
      name: 'CCTV Camera #3',
      type: 'camera',
      description: 'Thermal Monitoring',
      status: 'online',
      connections: ['gateway'],
      specs: {
        'Resolution': '640x480 Thermal',
        'Temperature Range': '-20°C to 150°C',
        'Accuracy': '±2°C',
        'Analytics': 'Thermal Anomaly Detection'
      }
    },
    {
      id: 'sensor-hub',
      name: 'Sensor Hub',
      type: 'sensor',
      description: 'Environmental Monitoring',
      status: 'online',
      connections: ['gateway'],
      specs: {
        'Sensors': 'Temperature, Humidity, Vibration',
        'Wireless': 'LoRaWAN, Zigbee',
        'Battery': '5 Year Life',
        'Range': '2km'
      }
    },
    {
      id: 'mobile-app',
      name: 'Mobile App',
      type: 'mobile',
      description: 'Field Technician Interface',
      status: 'online',
      connections: ['cloud'],
      specs: {
        'Platform': 'iOS/Android',
        'Features': 'Real-time Alerts, AR Overlay',
        'Offline Mode': 'Limited Functionality',
        'Security': 'Biometric Auth'
      }
    },
    {
      id: 'web-app',
      name: 'Web Dashboard',
      type: 'desktop',
      description: 'Management Interface',
      status: 'online',
      connections: ['cloud'],
      specs: {
        'Browser': 'Chrome, Firefox, Safari',
        'Features': 'Analytics, Reporting, Config',
        'Real-time': 'Live Video Streams',
        'Export': 'PDF, CSV, API'
      }
    }
  ];

  const getDeviceIcon = (type, status) => {
    const statusColor = status === 'online' ? '#10B981' : '#EF4444';
    
    switch (type) {
      case 'cloud':
        return (
          <g>
            <path d="M12 3c-1.2 0-2.4.3-3.4.9C7.6 4.5 6.8 5.3 6.3 6.3 5.3 6.1 4.2 6.3 3.4 6.9 2.6 7.5 2 8.4 2 9.4c0 1.4.9 2.6 2.3 3.1h15.4c1.4-.5 2.3-1.7 2.3-3.1 0-1-0.6-1.9-1.4-2.5-0.8-0.6-1.9-0.8-2.9-0.6-0.5-1-1.3-1.8-2.3-2.4C14.4 3.3 13.2 3 12 3z" fill={statusColor} opacity="0.8"/>
            <circle cx="12" cy="9" r="2" fill="white"/>
          </g>
        );
      case 'gateway':
        return (
          <g>
            <rect x="4" y="8" width="16" height="8" rx="2" fill={statusColor} opacity="0.8"/>
            <rect x="6" y="10" width="2" height="4" fill="white"/>
            <rect x="9" y="10" width="2" height="4" fill="white"/>
            <rect x="12" y="10" width="2" height="4" fill="white"/>
            <rect x="15" y="10" width="2" height="4" fill="white"/>
          </g>
        );
      case 'camera':
        return (
          <g>
            <rect x="6" y="8" width="12" height="8" rx="2" fill={statusColor} opacity="0.8"/>
            <circle cx="12" cy="12" r="3" fill="white"/>
            <circle cx="12" cy="12" r="1.5" fill={statusColor}/>
            <rect x="4" y="11" width="2" height="2" fill={statusColor}/>
          </g>
        );
      case 'sensor':
        return (
          <g>
            <circle cx="12" cy="12" r="6" fill={statusColor} opacity="0.8"/>
            <circle cx="12" cy="12" r="2" fill="white"/>
            <path d="M12 6v2M12 16v2M18 12h-2M6 12h2" stroke="white" strokeWidth="2"/>
          </g>
        );
      case 'mobile':
        return (
          <g>
            <rect x="8" y="4" width="8" height="16" rx="2" fill={statusColor} opacity="0.8"/>
            <rect x="9" y="6" width="6" height="10" fill="white"/>
            <circle cx="12" cy="18" r="1" fill="white"/>
          </g>
        );
      case 'desktop':
        return (
          <g>
            <rect x="4" y="6" width="16" height="10" rx="2" fill={statusColor} opacity="0.8"/>
            <rect x="5" y="7" width="14" height="8" fill="white"/>
            <rect x="10" y="16" width="4" height="1" fill={statusColor}/>
            <rect x="8" y="17" width="8" height="1" fill={statusColor}/>
          </g>
        );
      default:
        return <circle cx="12" cy="12" r="6" fill={statusColor} opacity="0.8"/>;
    }
  };

  const getDevicePosition = (deviceId) => {
    const positions = {
      'cloud': { x: 400, y: 50 },
      'gateway': { x: 400, y: 200 },
      'cctv-1': { x: 150, y: 350 },
      'cctv-2': { x: 400, y: 350 },
      'cctv-3': { x: 650, y: 350 },
      'sensor-hub': { x: 250, y: 200 },
      'mobile-app': { x: 550, y: 150 },
      'web-app': { x: 650, y: 200 }
    };
    return positions[deviceId] || { x: 400, y: 300 };
  };

  const renderConnections = () => {
    return devices.flatMap(device => 
      device.connections.map(targetId => {
        const source = getDevicePosition(device.id);
        const target = getDevicePosition(targetId);
        
        return (
          <line
            key={`${device.id}-${targetId}`}
            x1={source.x}
            y1={source.y}
            x2={target.x}
            y2={target.y}
            stroke="#6B7280"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.6"
          />
        );
      })
    );
  };

  const renderDevices = () => {
    return devices.map(device => {
      const position = getDevicePosition(device.id);
      const isSelected = selectedDevice?.id === device.id;
      
      return (
        <g key={device.id}>
          <circle
            cx={position.x}
            cy={position.y}
            r="30"
            fill={isSelected ? "#3B82F6" : "#F3F4F6"}
            stroke={isSelected ? "#1D4ED8" : "#D1D5DB"}
            strokeWidth="2"
            className="cursor-pointer"
            onClick={() => setSelectedDevice(device)}
          />
          <g transform={`translate(${position.x - 12}, ${position.y - 12})`}>
            {getDeviceIcon(device.type, device.status)}
          </g>
          <text
            x={position.x}
            y={position.y + 45}
            textAnchor="middle"
            className="text-sm font-medium fill-gray-700"
          >
            {device.name}
          </text>
          <text
            x={position.x}
            y={position.y + 60}
            textAnchor="middle"
            className="text-xs fill-gray-500"
          >
            {device.description}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">IoT Topology Diagram</h2>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'overview' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('overview')}
          >
            Overview
          </Button>
          <Button
            variant={viewMode === 'detailed' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('detailed')}
          >
            Detailed
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Topology Diagram */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-lg p-4">
            <svg 
              viewBox="0 0 800 450" 
              className="w-full h-auto"
              style={{ minHeight: '400px' }}
            >
              {/* Render connections first (behind devices) */}
              {renderConnections()}
              
              {/* Render devices */}
              {renderDevices()}
              
              {/* Legend */}
              <g transform="translate(20, 20)">
                <rect x="0" y="0" width="160" height="120" fill="white" stroke="#D1D5DB" strokeWidth="1" rx="4"/>
                <text x="10" y="20" className="text-sm font-medium fill-gray-700">Legend</text>
                <circle cx="20" cy="40" r="8" fill="#10B981"/>
                <text x="35" y="45" className="text-xs fill-gray-600">Online</text>
                <circle cx="20" cy="60" r="8" fill="#EF4444"/>
                <text x="35" y="65" className="text-xs fill-gray-600">Offline</text>
                <line x1="20" y1="80" x2="40" y2="80" stroke="#6B7280" strokeWidth="2" strokeDasharray="5,5"/>
                <text x="45" y="85" className="text-xs fill-gray-600">Data Flow</text>
                <text x="10" y="105" className="text-xs fill-gray-500">Click device for details</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Device Details Panel */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Device Details</h3>
            {selectedDevice ? (
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-700">{selectedDevice.name}</h4>
                  <p className="text-sm text-gray-600">{selectedDevice.description}</p>
                </div>
                
                <div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedDevice.status === 'online' ?'bg-green-100 text-green-800' :'bg-red-100 text-red-800'
                  }`}>
                    {selectedDevice.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium text-gray-700">Specifications</h5>
                  {Object.entries(selectedDevice.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-600">{key}:</span>
                      <span className="text-gray-900 font-medium">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium text-gray-700">Connected To</h5>
                  <div className="flex flex-wrap gap-1">
                    {selectedDevice.connections.map(connId => {
                      const connDevice = devices.find(d => d.id === connId);
                      return connDevice ? (
                        <span 
                          key={connId}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded cursor-pointer hover:bg-blue-200"
                          onClick={() => setSelectedDevice(connDevice)}
                        >
                          {connDevice.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Select a device to view details</p>
            )}
          </div>

          {/* Network Statistics */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Network Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Devices:</span>
                <span className="text-gray-900 font-medium">{devices.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Online Devices:</span>
                <span className="text-green-600 font-medium">
                  {devices.filter(d => d.status === 'online').length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Data Throughput:</span>
                <span className="text-gray-900 font-medium">245 Mbps</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Uptime:</span>
                <span className="text-gray-900 font-medium">99.8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTTopologyDiagram;