/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: {
          main: "#01579b",
          secondary: "#0277bd",
          light: "#00bcd4",
          content: "#fff",
        },
      },
    },
  },
  plugins: [],
};
