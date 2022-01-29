import Pusher from 'pusher-js'

const pusher = new Pusher('abcdefghij', {
    cluster: 'mt1',
    // wsHost: 'dev.mdreamcp.com',
    wsHost: 'api.mdreamcp.com',
    // wsHost: 'localhost',
    forceTLS: false,
    wsPort: 6001,
    enableStats: true
})

export default pusher