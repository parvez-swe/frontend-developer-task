/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pwhite: "rgba(255, 255, 255, 1)",
        swhite: "rgba(254, 254, 254, 1)",
        porrange: "#ffa402",
        sorrange: "#f15a40",
        pgreen: "#fae501",
        sgreen: "#b7ee48",
        dark: "#090d1f",
        darklin: "#0F1327",
        darkbg: "#0f1327",
      },
    },
  },
  plugins: [],
};
