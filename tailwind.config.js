/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blueColor: "#000F60",
        lightblueColor: "#6b70bd",
        roseColor: "#b75c76",
        wineColor: "#954a4a",
        whiteColor: "#ffffff",
        lightGrey: "#d9d9d9",
        fontColor: "#3d3939",
        // Add more color variables as needed
      },
    },
  },
  plugins: [],
};
