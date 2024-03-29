/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  // paths to the files that'll use Tailwind CSS class names
  content: ["./app/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      padding: {
        body: "2rem",
      },
      fontFamily: {
        poppins: "var(--font-poppins)",
      },
      colors: {
        whiteLight: "#FbFbFb",
        whiteDark: "#F5F5F5",
        whiteDarker: "#F0F0F0",
        silverGrey: "#e6e6e8",
        pistachio: "#c9d9d2",
        grassGreen: "#3b6552",
      },
      fontSize: {
        head1: "2rem",
        head2: "1.75rem",
        head3: "1.25rem",
        "body-lg": "1.12rem",
        "body-sm": "0.9rem",
      },
      gridTemplateColumns: {
        propList: "repeat(auto-fill, minmax(250px, 1fr))",
        optionList: "repeat(auto-fill, minmax(100px, 1fr))",
        resList: "25% 10% 25% 8% 8%",
      },
      screens: {
        xs: "320px",
        sm: "500px",
      },
    },
  },
  plugins: [],
});
