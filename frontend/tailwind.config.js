/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'primary-red': '#ff2200',
                'secondary-red': '#ff5500',
                'light-red': '#ffe9e6',
                'primary-black': '#333333',
                'secondary-black': '#555555',
                'border-black': '#7f7f7f',
                'primary-gray': '#c7c7c7',
                'secondary-gray': '#e0e0e0',
                'light-gray': '#f5f5f5',
                'secondary-text': '#808080',
            },
        },
    },
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
})
