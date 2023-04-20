/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './App.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
        './screens/**/*.{js,jsx,ts,tsx}',
        './styles/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#FF2461',
            },
            animation: {
                fadeInRight:
                    'fadeInRight 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
            },
            keyframes: {
                fadeInRight: {
                    '0%': { opacity: 0, transform: 'translateX(100%)' },
                    '100%': { opacity: 1, transform: 'translateX(0)' },
                },
            },
        },
    },
    plugins: [],
};
