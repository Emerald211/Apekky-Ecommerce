/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        banner1: "url('./src/assets/banner/banner3.jpg')",
        banner2: "url('./src/assets/banner/banner2.jpg')",
        banner3: "url('./src/assets/banner/banner1.jpg')",
        banner4: "url('./src/assets/banner/banner4.jpg')",
        category1: "url('./src/assets/category/category1.jpg')",
        category2: "url('./src/assets/category/category2.jpg')",
        category3: "url('./src/assets/category/category3.jpg')",
        category4: "url('./src/assets/category/category4.jpg')",
      },
      fontFamily: {
        serif: ["Source Serif Pro"],
        serrat: ["Montserrat"],
      },
      colors: {
        main: '#FF01FD'
      }
    },
  },
  plugins: [],
};
