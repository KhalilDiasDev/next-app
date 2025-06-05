/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@qriar-labs/qore/dist/**/*.{js,ts,jsx,tsx,cjs}",
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: "#DE2270",
        secondary: "#6C1C51",
      },
      keyframes: {
        upDown: {
          "0%, 100%": { transform: "translateY(0%)" },
          "50%": { transform: "translateY(-5%)" },
        },
        disappear: {
          "0%": { opacity: 0 },
          "1%": { opacity: 1 },
          "100%": { opacity: 1 },
        },
        circularMove: {
          "0%": { transform: "translate(0%, 0%)" },
          "10%": { transform: "translate(5%, -10%)" },
          "20%": { transform: "translate(10%, -5%)" },
          "30%": { transform: "translate(0%, -20%)" },
          "40%": { transform: "translate(-10%, -10%)" },
          "50%": { transform: "translate(-15%, 0%)" },
          "60%": { transform: "translate(-10%, 10%)" },
          "70%": { transform: "translate(0%, 20%)" },
          "80%": { transform: "translate(10%, 15%)" },
          "90%": { transform: "translate(15%, 5%)" },
          "100%": { transform: "translate(0%, 0%)" },
        },
        slide: {
          "0%, 100%": { right: "-10%" },
          "50%": { right: "-7%" },
        },
      },
      animation: {
        "up-down": "upDown 20s ease-in-out infinite",
        slide: "slide 8s ease-in-out infinite",
        "circular-bg": "circularMove 10s linear infinite",
        "circular-bg-2": "circularMove 15s ease-in-out reverse infinite",
        "hide-text": "disappear 2s linear reverse ",
      },
    },
  },
};
