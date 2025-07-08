import React from 'react';
import Icon from '../../../components/AppIcon';

const SolarPanelMetrics = ({ solarData, timeRange }) => {
  const getMetricColor = (value, thresholds) => {
    const numValue = parseFloat(value);
    if (numValue >= thresholds.critical) return 'text-error';
    if (numValue >= thresholds.warning) return 'text-warning';
    return 'text-success';
  };

  const getMetricBgColor = (value, thresholds) => {
    const numValue = parseFloat(value);
    if (numValue >= thresholds.critical) return 'bg-error/10';
    if (numValue >= thresholds.warning) return 'bg-warning/10';
    return 'bg-success/10';
  };

  const getBatteryIcon = (level) => {
    if (level >= 80) return 'battery';
    if (level >= 50) return 'battery';
    if (level >= 20) return 'battery';
    return 'battery';
  };

  const metrics = [
    {
      id: 'solar-power',
      title: 'Daya Panel Surya',
      value: solarData?.solarPower || '0',
      unit: 'kW',
      icon: 'sun',
      thresholds: { warning: 80, critical: 95 },
      description: 'Output daya saat ini dari panel surya'
    },
    {
      id: 'battery-level',
      title: 'Level Baterai',
      value: solarData?.batteryLevel || '0',
      unit: '%',
      icon: getBatteryIcon(parseFloat(solarData?.batteryLevel || 0)),
      thresholds: { warning: 30, critical: 15 },
      description: 'Kapasitas baterai tersisa',
      reverse: true // Lower values are worse
    },
    {
      id: 'charging-current',
      title: 'Arus Pengisian',
      value: solarData?.chargingCurrent || '0',
      unit: 'A',
      icon: 'zap',
      thresholds: { warning: 45, critical: 55 },
      description: 'Arus pengisian baterai saat ini'
    },
    {
      id: 'voltage',
      title: 'Tegangan Sistem',
      value: solarData?.systemVoltage || '0',
      unit: 'V',
      icon: 'activity',
      thresholds: { warning: 13.5, critical: 12.5 },
      description: 'Tegangan sistem DC',
      reverse: true
    },
    {
      id: 'inverter-temp',
      title: 'Suhu Inverter',
      value: solarData?.inverterTemp || '0',
      unit: '°C',
      icon: 'thermometer',
      thresholds: { warning: 60, critical: 75 },
      description: 'Suhu operasi inverter'
    },
    {
      id: 'efficiency',
      title: 'Efisiensi Panel',
      value: solarData?.efficiency || '0',
      unit: '%',
      icon: 'trending-up',
      thresholds: { warning: 15, critical: 10 },
      description: 'Efisiensi konversi energi panel surya',
      reverse: true
    }
  ];

  const getColorForMetric = (metric) => {
    const value = parseFloat(metric.value);
    const { warning, critical } = metric.thresholds;
    
    if (metric.reverse) {
      // For metrics where lower values are worse (battery, voltage, efficiency)
      if (value <= critical) return { text: 'text-error', bg: 'bg-error/10' };
      if (value <= warning) return { text: 'text-warning', bg: 'bg-warning/10' };
      return { text: 'text-success', bg: 'bg-success/10' };
    } else {
      // For metrics where higher values are worse (temperature, current)
      if (value >= critical) return { text: 'text-error', bg: 'bg-error/10' };
      if (value >= warning) return { text: 'text-warning', bg: 'bg-warning/10' };
      return { text: 'text-success', bg: 'bg-success/10' };
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-pln-yellow/20 rounded-lg">
            <Icon name="sun" size={20} color="#F59E0B" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Monitoring Panel Surya
            </h3>
            <p className="text-sm text-text-secondary">
              Data real-time sistem energi surya
            </p>
          </div>
        </div>
        <div className="text-xs text-text-tertiary">
          Update: {new Date().toLocaleTimeString('id-ID')}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const colors = getColorForMetric(metric);
          
          return (
            <div
              key={metric.id}
              className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                colors.bg
              } border-border hover:border-primary/30`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon 
                    name={metric.icon} 
                    size={18} 
                    className={colors.text}
                  />
                  <span className="text-sm font-medium text-text-primary">
                    {metric.title}
                  </span>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex items-baseline gap-1">
                  <span className={`text-2xl font-bold ${colors.text}`}>
                    {metric.value}
                  </span>
                  <span className="text-sm text-text-secondary">
                    {metric.unit}
                  </span>
                </div>
              </div>
              
              <p className="text-xs text-text-tertiary leading-relaxed">
                {metric.description}
              </p>
              
              {/* Status indicator */}
              <div className="mt-3 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  colors.text === 'text-success' ? 'bg-success' :
                  colors.text === 'text-warning' ? 'bg-warning' : 'bg-error'
                }`}></div>
                <span className="text-xs text-text-secondary">
                  {
                    colors.text === 'text-success' ? 'Normal' :
                    colors.text === 'text-warning' ? 'Peringatan' : 'Kritis'
                  }
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-secondary-50 rounded-lg">
            <div className="text-lg font-bold text-text-primary">
              {solarData?.dailyProduction || '0'} kWh
            </div>
            <div className="text-xs text-text-secondary">
              Produksi Hari Ini
            </div>
          </div>
          <div className="p-3 bg-secondary-50 rounded-lg">
            <div className="text-lg font-bold text-text-primary">
              {solarData?.monthlyProduction || '0'} kWh
            </div>
            <div className="text-xs text-text-secondary">
              Produksi Bulan Ini
            </div>
          </div>
          <div className="p-3 bg-secondary-50 rounded-lg">
            <div className="text-lg font-bold text-text-primary">
              Rp {solarData?.savings || '0'}
            </div>
            <div className="text-xs text-text-secondary">
              Penghematan Bulan Ini
            </div>
          </div>
          <div className="p-3 bg-secondary-50 rounded-lg">
            <div className="text-lg font-bold text-text-primary">
              {solarData?.co2Reduction || '0'} kg
            </div>
            <div className="text-xs text-text-secondary">
              Pengurangan CO₂
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarPanelMetrics;