import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import IoTTopologyDiagram from './IoTTopologyDiagram';
import WiringTopologyDiagram from './WiringTopologyDiagram';

const TopologyDashboard = () => {
  const [activeView, setActiveView] = useState('iot'); // iot, wiring, both

  const renderContent = () => {
    switch (activeView) {
      case 'iot':
        return <IoTTopologyDiagram />;
      case 'wiring':
        return <WiringTopologyDiagram />;
      case 'both':
        return (
          <div className="space-y-8">
            <IoTTopologyDiagram />
            <WiringTopologyDiagram />
          </div>
        );
      default:
        return <IoTTopologyDiagram />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Grid-Vision AI Topology</h1>
            <p className="text-gray-600 mt-1">
              Comprehensive network infrastructure visualization for CCTV and IoT systems
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={activeView === 'iot' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveView('iot')}
            >
              IoT Topology
            </Button>
            <Button
              variant={activeView === 'wiring' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveView('wiring')}
            >
              Wiring Topology
            </Button>
            <Button
              variant={activeView === 'both' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveView('both')}
            >
              Both Views
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      {renderContent()}

      {/* System Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">System Architecture Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 rounded-lg p-4 mb-3">
              <div className="w-12 h-12 bg-blue-500 rounded-lg mx-auto flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900">CCTV Cameras</h3>
            <p className="text-sm text-gray-600">4K resolution with AI analytics</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 rounded-lg p-4 mb-3">
              <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900">Network Infrastructure</h3>
            <p className="text-sm text-gray-600">Gigabit switches and routers</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-lg p-4 mb-3">
              <div className="w-12 h-12 bg-purple-500 rounded-lg mx-auto flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900">AI Processing</h3>
            <p className="text-sm text-gray-600">ShiftwiseConv neural networks</p>
          </div>
          
          <div className="text-center">
            <div className="bg-orange-100 rounded-lg p-4 mb-3">
              <div className="w-12 h-12 bg-orange-500 rounded-lg mx-auto flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900">Mobile Access</h3>
            <p className="text-sm text-gray-600">Real-time monitoring apps</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopologyDashboard;