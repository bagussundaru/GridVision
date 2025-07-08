import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import InfrastructureAnalysisDashboard from "pages/infrastructure-analysis-dashboard";
import TopologyDashboardPage from "pages/topology-dashboard";
import MissionControlDashboard from "pages/mission-control-dashboard";
import InfrastructureAnalysisCenter from "pages/infrastructure-analysis-center";
import SystemMonitoringHub from "pages/system-monitoring-hub";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<SystemMonitoringHub />} />
        <Route path="/system-monitoring-hub" element={<SystemMonitoringHub />} />
        <Route path="/mission-control-dashboard" element={<MissionControlDashboard />} />
        <Route path="/infrastructure-analysis-center" element={<InfrastructureAnalysisCenter />} />
        <Route path="/infrastructure-analysis-dashboard" element={<InfrastructureAnalysisDashboard />} />
        <Route path="/topology-dashboard" element={<TopologyDashboardPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;