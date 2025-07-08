import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

const WiringTopologyDiagram = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [viewMode, setViewMode] = useState('physical'); // physical, logical

  const components = [
    {
      id: 'main-switch',
      name: 'Main Network Switch',
      type: 'switch',
      description: '48-Port Gigabit Switch',
      status: 'online',
      position: { x: 500, y: 250 },
      connections: ['router', 'poe-switch-1', 'poe-switch-2', 'server-rack'],
      specs: {
        'Model': 'Cisco Catalyst 9300',
        'Ports': '48x 1GbE + 4x 10GbE',
        'Power': '350W',
        'Stacking': 'Yes'
      },
      cables: [
        { to: 'router', type: 'fiber', length: '2m' },
        { to: 'poe-switch-1', type: 'ethernet', length: '5m' },
        { to: 'poe-switch-2', type: 'ethernet', length: '5m' },
        { to: 'server-rack', type: 'ethernet', length: '3m' }
      ]
    },
    {
      id: 'router',
      name: 'Core Router',
      type: 'router',
      description: 'Internet Gateway',
      status: 'online',
      position: { x: 500, y: 120 },
      connections: ['main-switch', 'firewall'],
      specs: {
        'Model': 'Juniper MX Series',
        'Throughput': '10 Gbps',
        'Interfaces': '4x 10GbE SFP+',
        'Redundancy': 'Dual PSU'
      },
      cables: [
        { to: 'main-switch', type: 'fiber', length: '2m' },
        { to: 'firewall', type: 'ethernet', length: '1m' }
      ]
    },
    {
      id: 'firewall',
      name: 'Network Firewall',
      type: 'firewall',
      description: 'Security Gateway',
      status: 'online',
      position: { x: 300, y: 120 },
      connections: ['router', 'internet'],
      specs: {
        'Model': 'Fortinet FortiGate',
        'Throughput': '5 Gbps',
        'VPN': '1000 Tunnels',
        'Security': 'Next-Gen Firewall'
      },
      cables: [
        { to: 'router', type: 'ethernet', length: '1m' },
        { to: 'internet', type: 'fiber', length: '50m' }
      ]
    },
    {
      id: 'poe-switch-1',
      name: 'PoE Switch #1',
      type: 'poe-switch',
      description: 'CCTV Zone A',
      status: 'online',
      position: { x: 250, y: 380 },
      connections: ['main-switch', 'cctv-1', 'cctv-2'],
      specs: {
        'Model': 'Netgear GS752TP',
        'PoE Power': '380W',
        'Ports': '48x PoE+ 1GbE',
        'Standard': 'IEEE 802.3at'
      },
      cables: [
        { to: 'main-switch', type: 'ethernet', length: '5m' },
        { to: 'cctv-1', type: 'ethernet-poe', length: '100m' },
        { to: 'cctv-2', type: 'ethernet-poe', length: '150m' }
      ]
    },
    {
      id: 'poe-switch-2',
      name: 'PoE Switch #2',
      type: 'poe-switch',
      description: 'CCTV Zone B',
      status: 'online',
      position: { x: 750, y: 380 },
      connections: ['main-switch', 'cctv-3', 'cctv-4'],
      specs: {
        'Model': 'Netgear GS752TP',
        'PoE Power': '380W',
        'Ports': '48x PoE+ 1GbE',
        'Standard': 'IEEE 802.3at'
      },
      cables: [
        { to: 'main-switch', type: 'ethernet', length: '5m' },
        { to: 'cctv-3', type: 'ethernet-poe', length: '120m' },
        { to: 'cctv-4', type: 'ethernet-poe', length: '180m' }
      ]
    },
    {
      id: 'server-rack',
      name: 'Server Rack',
      type: 'server',
      description: 'Local Processing',
      status: 'online',
      position: { x: 500, y: 400 },
      connections: ['main-switch'],
      specs: {
        'Servers': '4x Dell PowerEdge',
        'Storage': '100TB SAN',
        'Redundancy': 'N+1 PSU',
        'Cooling': 'Rack-mounted AC'
      },
      cables: [
        { to: 'main-switch', type: 'ethernet', length: '3m' }
      ]
    },
    {
      id: 'cctv-1',
      name: 'CCTV Camera #1',
      type: 'camera',
      description: 'Main Entrance',
      status: 'online',
      position: { x: 120, y: 520 },
      connections: ['poe-switch-1'],
      specs: {
        'Model': 'Hikvision DS-2CD2685G0',
        'Resolution': '4K',
        'PoE Power': '12W',
        'IR Range': '50m'
      },
      cables: [
        { to: 'poe-switch-1', type: 'ethernet-poe', length: '100m' }
      ]
    },
    {
      id: 'cctv-2',
      name: 'CCTV Camera #2',
      type: 'camera',
      description: 'Parking Area',
      status: 'online',
      position: { x: 380, y: 520 },
      connections: ['poe-switch-1'],
      specs: {
        'Model': 'Hikvision DS-2CD2685G0',
        'Resolution': '4K',
        'PoE Power': '12W',
        'IR Range': '50m'
      },
      cables: [
        { to: 'poe-switch-1', type: 'ethernet-poe', length: '150m' }
      ]
    },
    {
      id: 'cctv-3',
      name: 'CCTV Camera #3',
      type: 'camera',
      description: 'Perimeter #1',
      status: 'online',
      position: { x: 620, y: 520 },
      connections: ['poe-switch-2'],
      specs: {
        'Model': 'Hikvision DS-2CD2685G0',
        'Resolution': '4K',
        'PoE Power': '12W',
        'IR Range': '50m'
      },
      cables: [
        { to: 'poe-switch-2', type: 'ethernet-poe', length: '120m' }
      ]
    },
    {
      id: 'cctv-4',
      name: 'CCTV Camera #4',
      type: 'camera',
      description: 'Perimeter #2',
      status: 'online',
      position: { x: 880, y: 520 },
      connections: ['poe-switch-2'],
      specs: {
        'Model': 'Hikvision DS-2CD2685G0',
        'Resolution': '4K',
        'PoE Power': '12W',
        'IR Range': '50m'
      },
      cables: [
        { to: 'poe-switch-2', type: 'ethernet-poe', length: '180m' }
      ]
    },
    {
      id: 'internet',
      name: 'Internet',
      type: 'internet',
      description: 'ISP Connection',
      status: 'online',
      position: { x: 100, y: 120 },
      connections: ['firewall'],
      specs: {
        'ISP': 'Fiber Internet',
        'Speed': '1 Gbps',
        'Redundancy': 'Dual ISP',
        'SLA': '99.9% Uptime'
      },
      cables: [
        { to: 'firewall', type: 'fiber', length: '50m' }
      ]
    }
  ];

  const getCableColor = (type) => {
    switch (type) {
      case 'fiber': return '#FF6B6B';
      case 'ethernet': return '#4ECDC4';
      case 'ethernet-poe': return '#45B7D1';
      case 'power': return '#F39C12';
      default: return '#6B7280';
    }
  };

  const getComponentIcon = (type, status) => {
    const statusColor = status === 'online' ? '#10B981' : '#EF4444';
    
    switch (type) {
      case 'switch':
        return (
          <g>
            <rect x="4" y="12" width="32" height="16" rx="3" fill={statusColor} opacity="0.9"/>
            <rect x="6" y="15" width="3" height="2" fill="white"/>
            <rect x="10" y="15" width="3" height="2" fill="white"/>
            <rect x="14" y="15" width="3" height="2" fill="white"/>
            <rect x="18" y="15" width="3" height="2" fill="white"/>
            <rect x="22" y="15" width="3" height="2" fill="white"/>
            <rect x="26" y="15" width="3" height="2" fill="white"/>
            <rect x="30" y="15" width="3" height="2" fill="white"/>
            <rect x="6" y="21" width="3" height="2" fill="white"/>
            <rect x="10" y="21" width="3" height="2" fill="white"/>
            <rect x="14" y="21" width="3" height="2" fill="white"/>
            <rect x="18" y="21" width="3" height="2" fill="white"/>
            <rect x="22" y="21" width="3" height="2" fill="white"/>
            <rect x="26" y="21" width="3" height="2" fill="white"/>
            <rect x="30" y="21" width="3" height="2" fill="white"/>
          </g>
        );
      case 'router':
        return (
          <g>
            <rect x="6" y="12" width="28" height="16" rx="3" fill={statusColor} opacity="0.9"/>
            <circle cx="12" cy="20" r="2" fill="white"/>
            <circle cx="20" cy="20" r="2" fill="white"/>
            <circle cx="28" cy="20" r="2" fill="white"/>
            <path d="M8 16 L16 16 M22 16 L32 16" stroke="white" strokeWidth="1"/>
          </g>
        );
      case 'firewall':
        return (
          <g>
            <rect x="6" y="12" width="28" height="16" rx="3" fill={statusColor} opacity="0.9"/>
            <path d="M20 16 L24 20 L20 24 L16 20 Z" fill="white"/>
            <circle cx="12" cy="20" r="1.5" fill="white"/>
            <circle cx="28" cy="20" r="1.5" fill="white"/>
          </g>
        );
      case 'poe-switch':
        return (
          <g>
            <rect x="4" y="12" width="32" height="16" rx="3" fill={statusColor} opacity="0.9"/>
            <text x="20" y="21" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">PoE</text>
            <rect x="6" y="15" width="2" height="2" fill="white"/>
            <rect x="9" y="15" width="2" height="2" fill="white"/>
            <rect x="12" y="15" width="2" height="2" fill="white"/>
            <rect x="28" y="15" width="2" height="2" fill="white"/>
            <rect x="31" y="15" width="2" height="2" fill="white"/>
          </g>
        );
      case 'camera':
        return (
          <g>
            <rect x="8" y="12" width="24" height="16" rx="3" fill={statusColor} opacity="0.9"/>
            <circle cx="20" cy="20" r="6" fill="white"/>
            <circle cx="20" cy="20" r="3" fill={statusColor}/>
            <rect x="6" y="18" width="4" height="4" fill={statusColor}/>
            <circle cx="26" cy="16" r="1" fill="white"/>
          </g>
        );
      case 'server':
        return (
          <g>
            <rect x="6" y="8" width="28" height="24" rx="3" fill={statusColor} opacity="0.9"/>
            <rect x="8" y="12" width="24" height="4" fill="white"/>
            <rect x="8" y="17" width="24" height="4" fill="white"/>
            <rect x="8" y="22" width="24" height="4" fill="white"/>
            <circle cx="28" cy="14" r="1" fill={statusColor}/>
            <circle cx="28" cy="19" r="1" fill={statusColor}/>
            <circle cx="28" cy="24" r="1" fill={statusColor}/>
          </g>
        );
      case 'internet':
        return (
          <g>
            <circle cx="20" cy="20" r="16" fill={statusColor} opacity="0.9"/>
            <path d="M8 20 Q20 8 32 20 Q20 32 8 20" stroke="white" strokeWidth="2.5" fill="none"/>
            <circle cx="20" cy="20" r="4" fill="white"/>
            <text x="20" y="43" textAnchor="middle" fontSize="8" fill={statusColor} fontWeight="bold">WAN</text>
          </g>
        );
      default:
        return <circle cx="20" cy="20" r="16" fill={statusColor} opacity="0.9"/>;
    }
  };

  const renderConnections = () => {
    const connections = [];
    
    components.forEach(component => {
      component.connections.forEach(targetId => {
        const target = components.find(c => c.id === targetId);
        if (target) {
          const cable = component.cables?.find(c => c.to === targetId);
          const cableType = cable?.type || 'ethernet';
          
          // Calculate connection points on the edge of components
          const dx = target.position.x - component.position.x;
          const dy = target.position.y - component.position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const radius = 50;
          
          const startX = component.position.x + (dx / distance) * radius;
          const startY = component.position.y + (dy / distance) * radius;
          const endX = target.position.x - (dx / distance) * radius;
          const endY = target.position.y - (dy / distance) * radius;
          
          connections.push(
            <line
              key={`${component.id}-${targetId}`}
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke={getCableColor(cableType)}
              strokeWidth="4"
              opacity="0.8"
              strokeDasharray={cableType === 'fiber' ? '8,4' : 'none'}
            />
          );

          // Add cable label with better positioning
          const midX = (startX + endX) / 2;
          const midY = (startY + endY) / 2;
          
          // Calculate label angle for better readability
          const angle = Math.atan2(dy, dx) * 180 / Math.PI;
          const labelAngle = angle > 90 || angle < -90 ? angle + 180 : angle;
          
          connections.push(
            <g key={`${component.id}-${targetId}-label`}>
              <rect
                x={midX - 30}
                y={midY - 12}
                width="60"
                height="24"
                fill="white"
                stroke={getCableColor(cableType)}
                strokeWidth="2"
                rx="4"
                opacity="0.95"
              />
              <text
                x={midX}
                y={midY - 2}
                textAnchor="middle"
                className="text-xs font-semibold"
                fill={getCableColor(cableType)}
                dominantBaseline="middle"
                transform={`rotate(${labelAngle}, ${midX}, ${midY})`}
              >
                {cableType.replace('-', ' ').toUpperCase()}
              </text>
              <text
                x={midX}
                y={midY + 8}
                textAnchor="middle"
                className="text-xs font-medium"
                fill="#6B7280"
                dominantBaseline="middle"
                transform={`rotate(${labelAngle}, ${midX}, ${midY})`}
              >
                {cable?.length || 'N/A'}
              </text>
            </g>
          );
        }
      });
    });
    
    return connections;
  };

  const renderComponents = () => {
    return components.map(component => {
      const isSelected = selectedComponent?.id === component.id;
      
      return (
        <g key={component.id}>
          <circle
            cx={component.position.x}
            cy={component.position.y}
            r="50"
            fill={isSelected ? "#3B82F6" : "#F8FAFC"}
            stroke={isSelected ? "#1D4ED8" : "#E2E8F0"}
            strokeWidth="3"
            className="cursor-pointer drop-shadow-lg"
            onClick={() => setSelectedComponent(component)}
          />
          <g transform={`translate(${component.position.x - 20}, ${component.position.y - 20})`}>
            {getComponentIcon(component.type, component.status)}
          </g>
          <text
            x={component.position.x}
            y={component.position.y + 70}
            textAnchor="middle"
            className="text-sm font-bold fill-gray-800"
          >
            {component.name}
          </text>
          <text
            x={component.position.x}
            y={component.position.y + 88}
            textAnchor="middle"
            className="text-xs fill-gray-600"
          >
            {component.description}
          </text>
          
          {/* Status indicator */}
          <circle
            cx={component.position.x + 35}
            cy={component.position.y - 35}
            r="8"
            fill={component.status === 'online' ? '#10B981' : '#EF4444'}
            stroke="white"
            strokeWidth="2"
          />
          <text
            x={component.position.x + 35}
            y={component.position.y - 32}
            textAnchor="middle"
            className="text-xs fill-white font-bold"
            dominantBaseline="middle"
          >
            {component.status === 'online' ? '✓' : '✗'}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Wiring Topology Diagram</h2>
          <p className="text-sm text-gray-600 mt-1">Network infrastructure and cable connections</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'physical' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('physical')}
          >
            Physical
          </Button>
          <Button
            variant={viewMode === 'logical' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('logical')}
          >
            Logical
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Wiring Diagram */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border-2 border-gray-200">
            <svg 
              viewBox="0 0 1000 600" 
              className="w-full h-auto"
              style={{ minHeight: '500px' }}
            >
              {/* Background grid for better reference */}
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#E5E7EB" strokeWidth="1" opacity="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Render connections first (behind components) */}
              {renderConnections()}
              
              {/* Render components */}
              {renderComponents()}
              
              {/* Enhanced Cable Type Legend */}
              <g transform="translate(30, 30)">
                <rect x="0" y="0" width="220" height="180" fill="white" stroke="#D1D5DB" strokeWidth="2" rx="8" opacity="0.98"/>
                <text x="15" y="25" className="text-sm font-bold fill-gray-800">Cable Types Legend</text>
                
                <line x1="20" y1="45" x2="50" y2="45" stroke="#FF6B6B" strokeWidth="4" strokeDasharray="8,4"/>
                <text x="60" y="50" className="text-xs font-medium fill-gray-700">Fiber Optic</text>
                <text x="60" y="62" className="text-xs fill-gray-500">High-speed backbone</text>
                
                <line x1="20" y1="75" x2="50" y2="75" stroke="#4ECDC4" strokeWidth="4"/>
                <text x="60" y="80" className="text-xs font-medium fill-gray-700">Ethernet</text>
                <text x="60" y="92" className="text-xs fill-gray-500">Standard network</text>
                
                <line x1="20" y1="105" x2="50" y2="105" stroke="#45B7D1" strokeWidth="4"/>
                <text x="60" y="110" className="text-xs font-medium fill-gray-700">PoE Ethernet</text>
                <text x="60" y="122" className="text-xs fill-gray-500">Power + Data</text>
                
                <line x1="20" y1="135" x2="50" y2="135" stroke="#F39C12" strokeWidth="4"/>
                <text x="60" y="140" className="text-xs font-medium fill-gray-700">Power Cable</text>
                <text x="60" y="152" className="text-xs fill-gray-500">AC Power only</text>
                
                <circle cx="30" cy="165" r="8" fill="#10B981"/>
                <text x="25" y="169" className="text-xs fill-white font-bold">✓</text>
                <text x="50" y="170" className="text-xs font-medium fill-gray-700">Online Status</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Enhanced Component Details Panel */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Component Details</h3>
            {selectedComponent ? (
              <div className="space-y-4">
                <div className="pb-3 border-b border-gray-200">
                  <h4 className="font-medium text-gray-800 text-lg">{selectedComponent.name}</h4>
                  <p className="text-sm text-gray-600">{selectedComponent.description}</p>
                </div>
                
                <div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    selectedComponent.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedComponent.status === 'online' ? '● Online' : '● Offline'}
                  </span>
                </div>

                <div className="space-y-3">
                  <h5 className="font-medium text-gray-700 text-sm">Technical Specifications</h5>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    {Object.entries(selectedComponent.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-1 text-sm">
                        <span className="text-gray-600 font-medium">{key}:</span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-medium text-gray-700 text-sm">Cable Connections</h5>
                  <div className="space-y-2">
                    {selectedComponent.cables?.map((cable, index) => {
                      const targetComponent = components.find(c => c.id === cable.to);
                      return (
                        <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">→ {targetComponent?.name}</span>
                            <span className="text-xs text-gray-500">{cable.length}</span>
                          </div>
                          <div className="mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              cable.type === 'fiber' ? 'bg-red-100 text-red-800' :
                              cable.type === 'ethernet' ? 'bg-teal-100 text-teal-800' :
                              cable.type === 'ethernet-poe'? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                            }`}>
                              {cable.type.replace('-', ' ').toUpperCase()}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">Click on a component to view details</p>
              </div>
            )}
          </div>

          {/* Enhanced Power Consumption */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Power Consumption</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Main Switch:</span>
                <span className="text-gray-900 font-medium">350W</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">PoE Switches:</span>
                <span className="text-gray-900 font-medium">760W</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">CCTV Cameras:</span>
                <span className="text-gray-900 font-medium">48W</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Server Rack:</span>
                <span className="text-gray-900 font-medium">2,400W</span>
              </div>
              <div className="border-t border-gray-300 pt-2 mt-2">
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-gray-700">Total Power:</span>
                  <span className="text-green-600">3,558W</span>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '71%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">71% of 5kW capacity</p>
              </div>
            </div>
          </div>

          {/* Enhanced Network Statistics */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Network Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Bandwidth:</span>
                <span className="text-gray-900 font-medium">10 Gbps</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Utilization:</span>
                <span className="text-orange-600 font-medium">35%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Latency:</span>
                <span className="text-green-600 font-medium">2.3ms</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Packet Loss:</span>
                <span className="text-green-600 font-medium">0.001%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Uptime:</span>
                <span className="text-green-600 font-medium">99.9%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WiringTopologyDiagram;