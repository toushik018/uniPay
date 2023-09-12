/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif'],
        LeagueSpartan: ['League Spartan', 'sans-serif'],
        EBGaramond: ['EB Garamond', 'serif'],
        PTSans: ['PT Sans', 'sans-serif'],
        Raleway: ['Raleway', 'sans-serif'],
        JosefinSans: ['Josefin Sans', 'sans-serif'],
        Lexend: ['Lexend', 'sans-serif'],
        TitilliumWeb: ['Titillium Web', 'sans-serif'],
        MontserratAlternates: ['Montserrat Alternates', 'sans-serif'],
        Pacifico: ['Pacifico', 'cursive'],
      }
    },
  },
  plugins: [require("daisyui")],
}

