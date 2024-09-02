/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            sans: ['Montserrat', 'ui-sans-serif', 'sans-serif'],
            serif: ['Open Sans', 'ui-serif', 'serif'],
            mono: ['Roboto Mono', 'ui-monospace', 'monospace'],
            hand: ['Kalam', 'cursive'],
        },
        extend: {
            colors: {},
        },
    },
    plugins: [],
};
