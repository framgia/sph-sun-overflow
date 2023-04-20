/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Arial', 'sans-serif'],
            },
            colors: {
                'primary-red': '#ff2200',
                'secondary-red': '#ff5500',
                'dark-red': '#dd0000',
                'light-red': '#ffe9e6',
                'primary-black': '#333333',
                'secondary-black': '#555555',
                'border-black': '#7f7f7f',
                'primary-gray': '#c7c7c7',
                'secondary-gray': '#e0e0e0',
                'light-gray': '#f5f5f5',
                'secondary-text': '#808080',
                primary: {
                    200: '#f5d3cf',
                    base: '#ff2200',
                    blue: '#3b8cd7',
                },
                neutral: {
                    100: '#f5f5f5',
                    200: '#e9e2e2',
                    300: '#d4d4d4',
                    500: '#737373',
                    700: '#404040',
                    900: '#333333',
                    disabled: '#33333380',
                },
                red: {
                    50: '#fef2f2',
                    100: '#fee2e2',
                    200: '#fecaca',
                    300: '#fca5a5',
                    500: '#ef4444',
                    700: '#b91c1c',
                    900: '#7f1d1d',
                },
            },
            dropShadow: {
                xsm: '0 2px 2px rgba(0, 0, 0, 0.05)',
            },
        },
    },
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
})
