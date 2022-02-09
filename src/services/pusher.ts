import Pusher, { Options } from 'pusher-js'

const option : Options = {
    cluster: 'mt1',
    // wsHost: 'api.mdreamcp.com',
    wsHost: 'localhost',
    forceTLS: false,
    wsPort: 6001,
    enableStats: true,
}

const pusher = new Pusher('abcdefghij', option)

export default pusher