const { colors } = require("../baatcheet/constants/theme");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: colors.background,
        card: colors.card,
        text: colors.text,
        primary: colors.primary,
        secondary: colors.secondary,
        border: colors.border,
        muted: colors.muted,
        error: colors.error,
      },
    },
  },
  plugins: [],
};
