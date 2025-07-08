import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const NetworkTopology = ({ networkStatus, activeConnections }) => {
  const [selectedNode, setSelectedNode] = useState(null);

  const networkNodes = [
    {
      id: 'core-switch',
      type: 'switch',
      name: 'Core Switch',
      status: networkStatus === 'operational' ? 'online' : 'warning',
      position: { x: 50, y: 30 },
      connections: ['edge-switch-1', 'edge-switch-2', 'ai-processor']
    },
    {
      id: 'edge-switch-1',
      type: 'switch',
      name: 'Edge Switch 1',
      status: 'online',
      position: { x: 25, y: 60 },
      connections: ['camera-1', 'camera-2', 'sensor-1']
    },
    {
      id: 'edge-switch-2',
      type: 'switch',
      name: 'Edge Switch 2',
      status: 'online',
      position: { x: 75, y: 60 },
      connections: ['camera-3', 'camera-4', 'sensor-2']
    },
    {
      id: 'ai-processor',
      type: 'server',
      name: 'AI Processing Unit',
      status: 'online',
      position: { x: 50, y: 70 },
      connections: []
    },
    {
      id: 'camera-1',
      type: 'camera',
      name: 'Camera 01',
      status: 'online',
      position: { x: 10, y: 85 },
      connections: []
    },
    {
      id: 'camera-2',
      type: 'camera',
      name: 'Camera 02',
      status: 'online',
      position: { x: 40, y: 85 },
      connections: []
    },
    {
      id: 'camera-3',
      type: 'camera',
      name: 'Camera 03',
      status: 'offline',
      position: { x: 60, y: 85 },
      connections: []
    },
    {
      id: 'camera-4',
      type: 'camera',
      name: 'Camera 04',
      status: 'online',
      position: { x: 90, y: 85 },
      connections: []
    },
    {
      id: 'sensor-1',
      type: 'sensor',
      name: 'IoT Sensor 1',
      status: 'online',
      position: { x: 15, y: 95 },
      connections: []
    },
    {
      id: 'sensor-2',
      type: 'sensor',
      name: 'IoT Sensor 2',
      status: 'online',
      position: { x: 85, y: 95 },
      connections: []
    }
  ];

  const getNodeIcon = (type) => {
    switch (type) {
      case 'switch':
        return 'router';
      case 'server':
        return 'server';
      case 'camera':
        return 'camera';
      case 'sensor':
        return 'radio';
      default:
        return 'circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'warning':
        return 'text-chart-4 bg-chart-4/10 border-chart-4/20';
      case 'offline':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const getConnectionPath = (from, to) => {
    const fromNode = networkNodes.find(n => n.id === from);
    const toNode = networkNodes.find(n => n.id === to);
    
    if (!fromNode || !toNode) return '';
    
    return `M ${fromNode.position.x} ${fromNode.position.y} L ${toNode.position.x} ${toNode.position.y}`;
  };

  const connections = networkNodes.flatMap(node => 
    node.connections.map(connId => ({
      from: node.id,
      to: connId,
      status: networkNodes.find(n => n.id === connId)?.status === 'offline' ? 'offline' : 'online'
    }))
  );

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Network Topology</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm text-text-secondary">
              {activeConnections} Active
            </span>
          </div>
          <div className="text-sm text-text-secondary">
            Status: {networkStatus === 'operational' ? 'Operational' : 'Warning'}
          </div>
        </div>
      </div>

      {/* Interactive Network Map */}
      <div className="relative bg-background rounded-lg border border-border p-4 mb-6">
        <div className="relative h-96 w-full bg-grid bg-opacity-50">
          {/* SVG for connections */}
          <svg className="absolute inset-0 w-full h-full">
            {connections.map((conn, index) => (
              <path
                key={index}
                d={getConnectionPath(conn.from, conn.to)}
                stroke={conn.status === 'offline' ? 'hsl(var(--destructive))' : 'hsl(var(--primary))'}
                strokeWidth="2"
                strokeDasharray={conn.status === 'offline' ? '5,5' : 'none'}
                fill="none"
                className="animate-pulse"
              />
            ))}
          </svg>

          {/* Network nodes */}
          {networkNodes.map((node) => (
            <div
              key={node.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                selectedNode === node.id ? 'scale-110 z-10' : 'hover:scale-105'
              }`}
              style={{
                left: `${node.position.x}%`,
                top: `${node.position.y}%`
              }}
              onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
            >
              <div className={`
                flex items-center justify-center w-12 h-12 rounded-lg border-2 transition-all duration-200
                ${getStatusColor(node.status)}
                ${selectedNode === node.id ? 'shadow-lg' : ''}
              `}>
                <Icon 
                  name={getNodeIcon(node.type)} 
                  size={20} 
                  className="text-current"
                />
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs text-text-secondary whitespace-nowrap">
                {node.name}
              </div>
              {node.status === 'online' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Node Details Panel */}
      {selectedNode && (
        <div className="bg-accent/10 border border-border rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-text-primary">Node Details</h4>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-text-secondary hover:text-text-primary"
            >
              <Icon name="x" size={16} />
            </button>
          </div>
          {(() => {
            const node = networkNodes.find(n => n.id === selectedNode);
            return node ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-text-secondary">Name:</span>
                  <span className="ml-2 font-medium text-text-primary">{node.name}</span>
                </div>
                <div>
                  <span className="text-sm text-text-secondary">Type:</span>
                  <span className="ml-2 font-medium text-text-primary capitalize">{node.type}</span>
                </div>
                <div>
                  <span className="text-sm text-text-secondary">Status:</span>
                  <span className={`ml-2 font-medium capitalize ${
                    node.status === 'online' ? 'text-primary' : 
                    node.status === 'warning' ? 'text-chart-4' : 'text-destructive'
                  }`}>
                    {node.status}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-text-secondary">Connections:</span>
                  <span className="ml-2 font-medium text-text-primary">{node.connections.length}</span>
                </div>
              </div>
            ) : null;
          })()}
        </div>
      )}

      {/* Network Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-primary/10 rounded-lg">
          <div className="text-lg font-bold text-primary">
            {networkNodes.filter(n => n.status === 'online').length}
          </div>
          <div className="text-sm text-text-secondary">Online</div>
        </div>
        <div className="text-center p-3 bg-chart-4/10 rounded-lg">
          <div className="text-lg font-bold text-chart-4">
            {networkNodes.filter(n => n.status === 'warning').length}
          </div>
          <div className="text-sm text-text-secondary">Warning</div>
        </div>
        <div className="text-center p-3 bg-destructive/10 rounded-lg">
          <div className="text-lg font-bold text-destructive">
            {networkNodes.filter(n => n.status === 'offline').length}
          </div>
          <div className="text-sm text-text-secondary">Offline</div>
        </div>
        <div className="text-center p-3 bg-accent/10 rounded-lg">
          <div className="text-lg font-bold text-text-primary">
            {networkNodes.length}
          </div>
          <div className="text-sm text-text-secondary">Total Nodes</div>
        </div>
      </div>
    </div>
  );
};

export default NetworkTopology;