/** @type {import('tailwindcss').Config} */
module.exports = {
  // paths to the files that'll use Tailwind CSS class names
  content: ['./app/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      fontFamily: {
        poppins: 'var(--font-poppins)',
      },
      colors: {
        whiteLight: '#FbFbFb',
        whiteDark: '#F5F5F5',
        whiteDarker: '#F0F0F0',
        silverGrey: '#e6e6e8',
        pistachio: '#c9d9d2',
        grassGreen: '#3b6552',
      },
      fontSize: {
        head1: '2.37rem',
        head2: '1.75rem',
        head3: '1.25rem',
        'body-lg': '1.12rem',
        'body-sm': '1rem',
      },
    },
  },
  plugins: [],
};
