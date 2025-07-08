import React from 'react';
import Header from '../../components/ui/Header';
import TopologyDashboard from '../infrastructure-analysis-dashboard/components/TopologyDashboard';

const TopologyDashboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TopologyDashboard />
        </div>
      </main>
    </div>
  );
};

export default TopologyDashboardPage;