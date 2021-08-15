module.exports = {
  pwa: {
    name: 'Maharjan Dreams',
    short_name: 'MDreams',
    icons: [{
      "src": "./img/icons/android-icon-36x36.png",
      "sizes": "36x36",
      "type": "image/png"
    }, {
      "src": "./img/icons/android-icon-48x48.png",
      "sizes": "48x48",
      "type": "image/png"
    }, {
      "src": "./img/icons/android-icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    }, {
      "src": "./img/icons/android-icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    }, {
      "src": "./img/icons/android-icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    }, {
      "src": "./img/icons/android-icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "./img/icons/android-icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }],
    iconPaths: {
      favicon32: './img/icons/favicon-32x32.png',
      favicon16: './img/icons/favicon-16x16.png',
      appleTouchIcon: './img/icons/apple-touch-icon-180x180.png',
      maskIcon: './img/icons/safari-pinned-tab.svg',
      msTileImage: './img/icons/mstile-144x144.png',
    },
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    gsm_sender_id: '713957292806',
    background_color: "#FFFFFF",
    theme_color: "#B71C1C",
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/scripts/sw.js',
      swDest: 'service-worker.js'
    }
  }
}