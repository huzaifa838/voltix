// ================================
// GLOBAL STYLES & TAILWIND CONFIG
// ================================
// Cybersecurity/SOC dashboard inspired design system

// This file contains the design system tokens.
// Import it into globals.css

export const DESIGN_SYSTEM = {
  colors: {
    background: {
      primary: '#020607',      // Deep black
      secondary: '#05090B',    // Slightly lighter
      tertiary: '#071116',     // Panel background
    },
    primary: {
      light: '#00F5B8',        // Cyan accent
      main: '#00C8FF',         // Primary blue
      dark: '#0099CC',         // Darker blue
    },
    secondary: {
      main: '#00C8FF',
      light: '#33D9FF',
    },
    danger: '#FF4D67',
    success: '#00F5B8',
    warning: '#FFB800',
    text: {
      primary: '#E8F3F5',      // Light text
      secondary: '#8DAAB7',    // Muted text
      muted: '#6B7C85',        // Very muted
    },
    border: 'rgba(255,255,255,0.08)',
    card: 'rgba(255,255,255,0.035)',
    hover: 'rgba(0,248,184,0.1)',
  },
  fonts: {
    mono: ['JetBrains Mono', 'monospace'],
    sans: ['Inter', 'sans-serif'],
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
    glow: '0 0 20px rgba(0, 245, 184, 0.3)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
  },
}

// Grid lines / scanline effect
export const SCANLINE_CSS = `
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 245, 184, 0.03),
      rgba(0, 245, 184, 0.03) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
  }
`
