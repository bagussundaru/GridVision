import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SolarAlerts = ({ solarData, onAlertAction }) => {
  const [filter, setFilter] = useState('all');
  const [expandedAlert, setExpandedAlert] = useState(null);

  // Generate solar-specific alerts based on current data
  const generateSolarAlerts = () => {
    const alerts = [];
    const now = new Date();
    
    // Battery level alerts
    const batteryLevel = parseFloat(solarData?.batteryLevel || 85);
    if (batteryLevel < 20) {
      alerts.push({
        id: 'battery-critical',
        type: 'critical',
        title: 'Level Baterai Kritis',
        message: `Level baterai sangat rendah: ${batteryLevel}%. Sistem akan beralih ke mode hemat energi.`,
        timestamp: new Date(now.getTime() - 5 * 60000).toISOString(),
        severity: 'high',
        device: 'Bank Baterai',
        action: 'Periksa sistem charging dan beban konsumsi',
        category: 'battery'
      });
    } else if (batteryLevel < 30) {
      alerts.push({
        id: 'battery-low',
        type: 'warning',
        title: 'Level Baterai Rendah',
        message: `Level baterai: ${batteryLevel}%. Pertimbangkan untuk mengurangi beban.`,
        timestamp: new Date(now.getTime() - 15 * 60000).toISOString(),
        severity: 'medium',
        device: 'Bank Baterai',
        action: 'Monitor konsumsi energi',
        category: 'battery'
      });
    }

    // Temperature alerts
    const inverterTemp = parseFloat(solarData?.inverterTemp || 45);
    if (inverterTemp > 70) {
      alerts.push({
        id: 'inverter-overheat',
        type: 'critical',
        title: 'Inverter Overheating',
        message: `Suhu inverter mencapai ${inverterTemp}°C. Risiko kerusakan komponen.`,
        timestamp: new Date(now.getTime() - 8 * 60000).toISOString(),
        severity: 'high',
        device: 'Inverter',
        action: 'Periksa ventilasi dan sistem pendingin',
        category: 'temperature'
      });
    } else if (inverterTemp > 60) {
      alerts.push({
        id: 'inverter-temp-high',
        type: 'warning',
        title: 'Suhu Inverter Tinggi',
        message: `Suhu inverter: ${inverterTemp}°C. Monitor terus kondisi operasi.`,
        timestamp: new Date(now.getTime() - 12 * 60000).toISOString(),
        severity: 'medium',
        device: 'Inverter',
        action: 'Periksa beban dan ventilasi',
        category: 'temperature'
      });
    }

    // Production efficiency alerts
    const efficiency = parseFloat(solarData?.efficiency || 19);
    if (efficiency < 15) {
      alerts.push({
        id: 'efficiency-low',
        type: 'warning',
        title: 'Efisiensi Panel Rendah',
        message: `Efisiensi panel surya: ${efficiency}%. Kemungkinan ada kotoran atau bayangan.`,
        timestamp: new Date(now.getTime() - 25 * 60000).toISOString(),
        severity: 'medium',
        device: 'Panel Surya',
        action: 'Periksa kebersihan panel dan area sekitar',
        category: 'production'
      });
    }

    // Voltage alerts
    const voltage = parseFloat(solarData?.systemVoltage || 48.2);
    if (voltage < 46) {
      alerts.push({
        id: 'voltage-low',
        type: 'warning',
        title: 'Tegangan Sistem Rendah',
        message: `Tegangan sistem: ${voltage}V. Periksa koneksi dan kondisi baterai.`,
        timestamp: new Date(now.getTime() - 18 * 60000).toISOString(),
        severity: 'medium',
        device: 'Sistem DC',
        action: 'Periksa koneksi kabel dan terminal baterai',
        category: 'electrical'
      });
    }

    // Add some general system alerts
    alerts.push(
      {
        id: 'maintenance-due',
        type: 'info',
        title: 'Jadwal Maintenance',
        message: 'Maintenance rutin sistem solar dijadwalkan dalam 3 hari.',
        timestamp: new Date(now.getTime() - 2 * 60 * 60000).toISOString(),
        severity: 'low',
        device: 'Sistem',
        action: 'Siapkan jadwal maintenance preventif',
        category: 'maintenance'
      },
      {
        id: 'grid-export-success',
        type: 'success',
        title: 'Ekspor Energi Berhasil',
        message: 'Berhasil mengekspor 45.2 kWh ke grid hari ini.',
        timestamp: new Date(now.getTime() - 30 * 60000).toISOString(),
        severity: 'low',
        device: 'Grid Tie',
        action: 'Monitor pendapatan dari ekspor energi',
        category: 'grid'
      }
    );

    return alerts;
  };

  const alerts = generateSolarAlerts();

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-primary bg-primary/10 border-primary/20';
      default:
        return 'text-text-secondary bg-secondary-100 border-border';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'critical':
        return 'alert-triangle';
      case 'warning':
        return 'alert-circle';
      case 'success':
        return 'check-circle';
      case 'info':
        return 'info';
      default:
        return 'bell';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'battery':
        return 'battery';
      case 'temperature':
        return 'thermometer';
      case 'production':
        return 'sun';
      case 'electrical':
        return 'zap';
      case 'maintenance':
        return 'wrench';
      case 'grid':
        return 'grid-3x3';
      default:
        return 'alert-circle';
    }
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.severity === filter || alert.type === filter);

  const alertCounts = {
    all: alerts.length,
    high: alerts.filter(a => a.severity === 'high').length,
    medium: alerts.filter(a => a.severity === 'medium').length,
    low: alerts.filter(a => a.severity === 'low').length
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-warning/20 rounded-lg">
            <Icon name="bell" size={20} color="#F59E0B" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Alert Sistem Solar
            </h3>
            <p className="text-sm text-text-secondary">
              Notifikasi dan peringatan sistem energi surya
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary">Total:</span>
          <span className="text-lg font-bold text-text-primary">{alerts.length}</span>
        </div>
      </div>

      {/* Alert Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: 'all', label: 'Semua', count: alertCounts.all },
          { key: 'high', label: 'Kritis', count: alertCounts.high },
          { key: 'medium', label: 'Peringatan', count: alertCounts.medium },
          { key: 'low', label: 'Info', count: alertCounts.low }
        ].map(filterOption => (
          <button
            key={filterOption.key}
            onClick={() => setFilter(filterOption.key)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              filter === filterOption.key
                ? 'bg-primary text-white'
                : 'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
            }`}
          >
            {filterOption.label} ({filterOption.count})
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="check-circle" size={48} className="mx-auto mb-3 text-success" />
            <p className="text-text-secondary">Tidak ada alert untuk filter ini</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`border rounded-lg p-4 transition-all hover:shadow-md ${
                getSeverityColor(alert.severity)
              } ${expandedAlert === alert.id ? 'ring-2 ring-primary/30' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex-shrink-0 mt-0.5">
                    <Icon 
                      name={getTypeIcon(alert.type)} 
                      size={18} 
                      className={alert.severity === 'high' ? 'text-error' : 
                                alert.severity === 'medium' ? 'text-warning' : 'text-primary'}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-text-primary truncate">
                        {alert.title}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-text-tertiary">
                        <Icon name={getCategoryIcon(alert.category)} size={12} />
                        <span>{alert.device}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-text-secondary mb-2">
                      {alert.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-tertiary">
                        {new Date(alert.timestamp).toLocaleString('id-ID')}
                      </span>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedAlert(
                          expandedAlert === alert.id ? null : alert.id
                        )}
                        iconName={expandedAlert === alert.id ? 'chevron-up' : 'chevron-down'}
                      >
                        {expandedAlert === alert.id ? 'Tutup' : 'Detail'}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAlertAction?.(alert.id, 'acknowledge')}
                    iconName="check"
                  >
                    OK
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onAlertAction?.(alert.id, 'dismiss')}
                    iconName="x"
                  />
                </div>
              </div>
              
              {/* Expanded Details */}
              {expandedAlert === alert.id && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-semibold text-text-primary mb-2">
                        Tindakan yang Disarankan
                      </h5>
                      <p className="text-sm text-text-secondary">
                        {alert.action}
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-semibold text-text-primary mb-2">
                        Informasi Tambahan
                      </h5>
                      <div className="space-y-1 text-sm text-text-secondary">
                        <div>Kategori: {alert.category}</div>
                        <div>Tingkat: {alert.severity}</div>
                        <div>Perangkat: {alert.device}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onAlertAction?.(alert.id, 'resolve')}
                      iconName="wrench"
                    >
                      Perbaiki
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onAlertAction?.(alert.id, 'schedule')}
                      iconName="calendar"
                    >
                      Jadwalkan
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAlertAction?.(alert.id, 'export')}
                      iconName="download"
                    >
                      Export
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Alert Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-error/10 rounded-lg">
            <div className="text-lg font-bold text-error">
              {alertCounts.high}
            </div>
            <div className="text-xs text-text-secondary">Alert Kritis</div>
          </div>
          <div className="text-center p-3 bg-warning/10 rounded-lg">
            <div className="text-lg font-bold text-warning">
              {alertCounts.medium}
            </div>
            <div className="text-xs text-text-secondary">Peringatan</div>
          </div>
          <div className="text-center p-3 bg-primary/10 rounded-lg">
            <div className="text-lg font-bold text-primary">
              {alertCounts.low}
            </div>
            <div className="text-xs text-text-secondary">Informasi</div>
          </div>
          <div className="text-center p-3 bg-success/10 rounded-lg">
            <div className="text-lg font-bold text-success">
              99.2%
            </div>
            <div className="text-xs text-text-secondary">Uptime Sistem</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarAlerts;