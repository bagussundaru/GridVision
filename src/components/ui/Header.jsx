import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import PLNLogo from './PLNLogo';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Infrastructure Analysis',
      path: '/infrastructure-analysis-dashboard',
      icon: 'Activity',
      tooltip: 'AI-powered infrastructure inspection and analysis'
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const Logo = () => (
    <div className="flex items-center space-x-4">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-pln-yellow/20 to-pln-red/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
        <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
          <PLNLogo className="w-12 h-12" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-heading font-bold text-white tracking-tight">
          <span className="text-transparent bg-gradient-to-r from-pln-yellow via-pln-yellow-light to-pln-yellow bg-clip-text">PLN</span> 
          <span className="text-white">Grid-Vision</span>
        </span>
        <span className="text-sm font-heading font-medium text-pln-yellow/90 tracking-wide uppercase">
          AI Solar Monitor
        </span>
      </div>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-gradient-to-r from-primary-800 via-primary-700 to-primary-600 border-b border-primary-500/30 shadow-lg backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo and Brand */}
          <Link 
            to="/" 
            className="flex-shrink-0 transition-micro hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface rounded-lg p-1 -m-1"
            aria-label="Grid-Vision AI Home"
          >
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-micro
                  focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary
                  ${isActivePath(item.path)
                    ? 'bg-accent text-white border border-accent-600' :'text-white hover:text-pln-yellow hover:bg-primary-800'
                  }
                `}
                title={item.tooltip}
              >
                <Icon 
                  name={item.icon} 
                  size={16} 
                  color="currentColor"
                  strokeWidth={2}
                />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-pln-yellow hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary transition-micro"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <Icon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                size={20} 
                color="currentColor"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-primary-600 bg-primary">
            <nav className="px-2 pt-2 pb-3 space-y-1" role="navigation" aria-label="Mobile navigation">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`
                    flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-micro
                    focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary
                    ${isActivePath(item.path)
                      ? 'bg-accent text-white border border-accent-600' :'text-white hover:text-pln-yellow hover:bg-primary-800'
                    }
                  `}
                  title={item.tooltip}
                >
                  <Icon 
                    name={item.icon} 
                    size={18} 
                    color="currentColor"
                    strokeWidth={2}
                  />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;