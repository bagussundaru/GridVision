import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const InteractiveMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const locations = [
    {
      id: 1,
      name: 'Transmission Tower Alpha',
      lat: 40.7128,
      lng: -74.0060,
      status: 'operational',
      alerts: 0,
      type: 'transmission'
    },
    {
      id: 2,
      name: 'Substation Beta',
      lat: 40.7589,
      lng: -73.9851,
      status: 'warning',
      alerts: 2,
      type: 'substation'
    },
    {
      id: 3,
      name: 'Distribution Hub Gamma',
      lat: 40.7282,
      lng: -73.7949,
      status: 'critical',
      alerts: 5,
      type: 'distribution'
    },
    {
      id: 4,
      name: 'Power Line Delta',
      lat: 40.8176,
      lng: -73.9782,
      status: 'operational',
      alerts: 0,
      type: 'powerline'
    },
    {
      id: 5,
      name: 'Transformer Station Epsilon',
      lat: 40.6892,
      lng: -74.0445,
      status: 'maintenance',
      alerts: 1,
      type: 'transformer'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-emerald-500';
      case 'warning': return 'bg-amber-500';
      case 'critical': return 'bg-red-500';
      case 'maintenance': return 'bg-blue-500';
      default: return 'bg-slate-500';
    }
  };

  const getStatusIcon = (type) => {
    switch (type) {
      case 'transmission': return 'Tower';
      case 'substation': return 'Zap';
      case 'distribution': return 'Network';
      case 'powerline': return 'Cable';
      case 'transformer': return 'Battery';
      default: return 'MapPin';
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Infrastructure Map</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 2))}
            className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <Icon name="ZoomIn" size={16} />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.5))}
            className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <Icon name="ZoomOut" size={16} />
          </button>
        </div>
      </div>

      <div className="relative h-96 bg-slate-900/50 rounded-lg border border-slate-700/50 overflow-hidden">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-r from-cyan-600/20 to-blue-600/20"></div>
          </div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          </div>
        </div>

        {/* Location Markers */}
        {locations.map((location) => (
          <div
            key={location.id}
            className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 ${
              selectedLocation?.id === location.id ? 'scale-125 z-10' : ''
            }`}
            style={{
              left: `${20 + (location.id * 15)}%`,
              top: `${30 + (location.id * 10)}%`,
              transform: `scale(${zoomLevel}) translate(-50%, -50%)`
            }}
            onClick={() => setSelectedLocation(location)}
          >
            <div className={`w-4 h-4 rounded-full ${getStatusColor(location.status)} border-2 border-white shadow-lg animate-pulse`}>
              {location.alerts > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {location.alerts}
                </div>
              )}
            </div>
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-slate-800/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded border border-slate-600/50 whitespace-nowrap">
              <Icon name={getStatusIcon(location.type)} size={12} className="inline mr-1" />
              {location.name}
            </div>
          </div>
        ))}

        {/* Selected Location Details */}
        {selectedLocation && (
          <div className="absolute bottom-4 left-4 right-4 bg-slate-800/90 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-white">{selectedLocation.name}</h4>
                <p className="text-slate-300 text-sm capitalize">{selectedLocation.type} • {selectedLocation.status}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedLocation.status)}`}></div>
                <span className="text-sm text-slate-400">{selectedLocation.alerts} alerts</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="text-slate-400">Operational</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span className="text-slate-400">Warning</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-slate-400">Critical</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-slate-400">Maintenance</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;