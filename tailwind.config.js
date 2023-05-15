/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        banner1: "url('https://i.ibb.co/Hr4kRNT/banner4.jpg')",
        banner2: "url('https://i.ibb.co/sQs1XDL/banner4.jpg')",
        banner3: "url('https://i.ibb.co/LnNkFqP/banner4.jpg')",
        banner4: "url('https://i.ibb.co/fSdXGn1/banner4.jpg')",
        category1: "url('https://i.ibb.co/qCSrDFP/category1.jpg')",
        category2: "url('https://i.ibb.co/41zRqvG/category2.jpg')",
        category3: "url('https://i.ibb.co/ZKfx1V5/category3.jpg')",
        category4: "url('https://i.ibb.co/jh8W8k8/category4.jpg')",
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
