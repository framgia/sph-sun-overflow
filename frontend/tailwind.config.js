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
                'logo-bgcyanlight': '#eef8fc',
                'logo-bgcyan': '#C1D5DB',
                'logo-bgred': '#EDDCDC',
                neutral: {
                    white: '#FFFFFF',
                    disabled: '#33333380',
                    900: '#333333',
                    700: '#716666',
                    500: '#9F9191',
                    300: '#B8ABAB',
                    200: '#E9E2E2',
                    100: '#FDFBFB',
                },
                primary: {
                    success: '#59BC7F',
                    base: '#FF2200',
                    blue: '#3B8CD7',
                    900: '#D84028',
                    700: '#EA614C',
                    500: '#F49181',
                    300: '#EEB4AC',
                    200: '#F5D3CF',
                    150: '#F4EDED',
                    100: '#FFF4F2',
                    50: '#FFF9F9',
                },
            },
            dropShadow: {
                xsm: '2px 2px 4px rgba(0, 0, 0, 0.05)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
            borderRadius: {
                smd: '5px',
            },
            height: {
                13: '52px',
            },
        },
    },
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
})
