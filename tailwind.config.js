module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      transitionProperty: {
        inset: 'left'
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
