/** @type {import('tailwindcss').Config}*/
export default {
    darkMode: 'selector',
    content: [
        './src/**/*.{html,js,svelte,ts}',
        '../../packages/ui/**/*.svelte'
    ],
    theme: {
        extend: {}
    },
    plugins: []
}
