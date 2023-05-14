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
        silverGrey: '#e6e6e8',
        pistachio: '#c9d9d2',
        grassGreen: '#3b6552',
      },
      // Q&A: isnt the px unit a problem?
      fontSize: {
        head1: '34px',
        head2: '28px',
        head3: '20px',
        'body-sm': '16px',
        'body-lg': '18px',
      },
    },
  },
  plugins: [],
};
