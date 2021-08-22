import Pusher from 'pusher-js'

const pusher = new Pusher('abcdefghij', {
    cluster: 'mt1',
    wsHost: 'localhost',
    forceTLS: false,
    wsPort: 6001,
    enableStats: true
})

export default pusher