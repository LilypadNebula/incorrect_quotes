module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        speaker: ['Montserrat', 'sans-serif'],
        line: ['Raleway', 'sans-serif']
      },
      maxWidth: {
        '1/2': '50%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
