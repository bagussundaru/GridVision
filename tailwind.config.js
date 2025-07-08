/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Biru Soft (Soft Blue dari logo PLN)
        'primary': '#3B82F6', // blue-500 - biru soft untuk header dan navigasi
        'primary-50': '#EFF6FF', // blue-50
        'primary-100': '#DBEAFE', // blue-100
        'primary-200': '#BFDBFE', // blue-200
        'primary-300': '#93C5FD', // blue-300
        'primary-400': '#60A5FA', // blue-400
        'primary-500': '#3B82F6', // blue-500 - biru utama soft
        'primary-600': '#2563EB', // blue-600
        'primary-700': '#1D4ED8', // blue-700
        'primary-800': '#1E40AF', // blue-800
        'primary-900': '#1E3A8A', // blue-900
        'primary-foreground': '#FFFFFF', // white

        // Secondary Colors - Kuning Soft (Soft Yellow dari logo PLN)
        'secondary': '#FEF3C7', // amber-100 - kuning soft untuk background sections
        'secondary-50': '#FFFBEB', // amber-50
        'secondary-100': '#FEF3C7', // amber-100 - kuning soft utama
        'secondary-200': '#FDE68A', // amber-200
        'secondary-300': '#FCD34D', // amber-300
        'secondary-400': '#FBBF24', // amber-400
        'secondary-500': '#F59E0B', // amber-500
        'secondary-600': '#D97706', // amber-600
        'secondary-700': '#B45309', // amber-700
        'secondary-800': '#92400E', // amber-800
        'secondary-900': '#78350F', // amber-900
        'secondary-foreground': '#92400E', // dark amber text

        // Accent Colors - Merah Soft (Soft Red dari petir logo PLN)
        'accent': '#F87171', // red-400 - merah soft untuk elemen accent
        'accent-50': '#FEF2F2', // red-50
        'accent-100': '#FEE2E2', // red-100
        'accent-200': '#FECACA', // red-200
        'accent-300': '#FCA5A5', // red-300
        'accent-400': '#F87171', // red-400 - merah soft utama
        'accent-500': '#EF4444', // red-500
        'accent-600': '#DC2626', // red-600
        'accent-700': '#B91C1C', // red-700
        'accent-800': '#991B1B', // red-800
        'accent-900': '#7F1D1D', // red-900
        'accent-foreground': '#FFFFFF', // white

        // Background Colors - Kuning Soft yang harmonis
        'background': '#FFFBEB', // amber-50 - background utama dengan nuansa kuning soft
        'background-secondary': '#FEF3C7', // amber-100
        'background-tertiary': '#FDE68A', // amber-200

        // Surface Colors - Warna permukaan yang harmonis
        'surface': '#FFFFFF', // white - untuk card dan panel
        'surface-secondary': '#FFFBEB', // amber-50 - surface dengan nuansa kuning soft
        'surface-tertiary': '#FEF3C7', // amber-100

        // Text Colors - Teks dengan kontras yang baik
        'text-primary': '#1E40AF', // blue-800 - teks utama biru soft
        'text-secondary': '#3B82F6', // blue-500 - teks sekunder
        'text-tertiary': '#92400E', // amber-800 - teks dengan nuansa kuning
        'text-quaternary': '#B45309', // amber-700
        'text-inverse': '#FFFFFF', // white

        // Status Colors
        'success': '#059669', // emerald-600
        'success-50': '#ECFDF5', // emerald-50
        'success-100': '#D1FAE5', // emerald-100
        'success-200': '#A7F3D0', // emerald-200
        'success-500': '#10B981', // emerald-500
        'success-700': '#047857', // emerald-700
        'success-foreground': '#FFFFFF', // white

        'warning': '#D97706', // amber-600
        'warning-50': '#FFFBEB', // amber-50
        'warning-100': '#FEF3C7', // amber-100
        'warning-200': '#FDE68A', // amber-200
        'warning-500': '#F59E0B', // amber-500
        'warning-700': '#B45309', // amber-700
        'warning-foreground': '#FFFFFF', // white

        'error': '#DC2626', // red-600
        'error-50': '#FEF2F2', // red-50
        'error-100': '#FEE2E2', // red-100
        'error-200': '#FECACA', // red-200
        'error-500': '#EF4444', // red-500
        'error-700': '#B91C1C', // red-700
        'error-foreground': '#FFFFFF', // white

        // PLN Brand Colors - Warna logo PLN (Soft Version)
        'pln-yellow': '#FBBF24', // kuning PLN soft
        'pln-yellow-light': '#FEF3C7', // kuning muda soft
        'pln-yellow-dark': '#D97706', // kuning gelap soft
        'pln-red': '#F87171', // merah petir soft
        'pln-red-light': '#FEE2E2', // merah muda soft
        'pln-red-dark': '#DC2626', // merah gelap soft
        'pln-blue': '#60A5FA', // biru gelombang soft
        'pln-blue-light': '#DBEAFE', // biru muda soft
        'pln-blue-dark': '#2563EB', // biru gelap soft
        'pln-gray': '#9CA3AF', // abu-abu PLN soft
        'pln-gray-light': '#F9FAFB', // abu-abu muda soft
        'pln-gray-dark': '#4B5563', // abu-abu gelap soft

        // Border Colors - Border dengan nuansa tema
        'border': '#FDE68A', // amber-200 - border dengan nuansa kuning soft
        'border-secondary': '#FCD34D', // amber-300
        'border-tertiary': '#FBBF24', // amber-400
      },
      fontFamily: {
        'heading': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'body': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'caption': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'data': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'floating': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'modal': '0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '110': '110',
        '120': '120',
      },
      animation: {
        'fade-in': 'fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-down': 'slideDown 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}