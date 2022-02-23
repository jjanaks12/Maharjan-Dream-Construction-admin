module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      transitionProperty: {
        inset: 'left'
      },
      backgroundColor : {
        'regal-blue': '#093154',
        'regal-blue-dark': '#071D31'
      },
      textColor: {
        'regal-blue': '#093154',
        'regal-blue-dark': '#071D31'
      },
      zIndex: {
        '-1': '-1'
      }
    },
  },
  variants: {
    transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
    extend: {
      display: ['hover', 'focus', 'group-focus'],
    },
  },
  plugins: [],
}
