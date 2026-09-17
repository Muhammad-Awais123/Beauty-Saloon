/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Muted Sage & Deep Forest primary
        clinic: {
          50: '#F4F7F4',
          100: '#E6ECE7',
          200: '#CFDDD1',
          300: '#AFC5B3',
          400: '#8FA895',
          500: '#5C7E67',
          600: '#3D5E4A',
          700: '#2A4636', // Primary brand deep sage
          800: '#1D3327',
          900: '#122018',
        },
        // Warm Sand / Neutral Stone secondary
        sand: {
          50: '#FAF8F5',
          100: '#F4EFEA',
          200: '#E8DFD5',
          300: '#D5C4B4',
          400: '#BFA690',
          500: '#9E8268',
          600: '#7E644D',
          700: '#5C4837',
        },
        // Editorial neutrals & charcoal
        charcoal: {
          50: '#F7F7F8',
          100: '#EFEFEF',
          200: '#DCDCDC',
          300: '#B5B6B8',
          400: '#86888C',
          500: '#5B5D61',
          600: '#3D3E42',
          700: '#27282B',
          800: '#191A1C',
          900: '#0F1011',
        },
        // Surface whites & subtle tinted layers
        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#FBFBF9',
          muted: '#F5F6F2',
          subtle: '#EDF0EB',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
        'card': '0 4px 20px -2px rgba(27, 44, 34, 0.05)',
        'card-hover': '0 12px 32px -4px rgba(27, 44, 34, 0.09)',
        'elevated': '0 20px 40px -8px rgba(27, 44, 34, 0.12)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        scalePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.4s ease-out forwards',
        'float-slow': 'floatSlow 4s ease-in-out infinite',
        'scale-pulse': 'scalePulse 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
