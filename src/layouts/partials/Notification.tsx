import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Channel from 'pusher-js/types/src/core/channels/channel'

import pusher from '@/services/pusher'
import NotificationItem from '@/components/notification/NotificationItem'
import { iNotification } from '@/interfaces/notification'

@Component({
    computed: {
        ...mapGetters({
            notificationList: 'notification/list'
        })
    },
    methods: {
        ...mapActions({
            fetch: 'notification/fetch'
        }),
        ...mapMutations({
            addToList: 'notification/ADD_TO_LIST'
        })
    }
})
export default class Notification extends Vue {
    private isLoading: boolean = false
    private channelName: string = 'notification'
    private eventName: string = 'App\\Events\\Notification'
    private notificationList!: Array<iNotification>
    private fetch!: () => Promise<any>
    private addToList!: (notification: iNotification) => void
    private channel: Channel

    constructor(props: any) {
        super(props)

        this.channel = pusher.subscribe(this.channelName)
    }

    mounted() {
        this.$nextTick(() => {
            this.fetchRecord()

            this.channel.bind(this.eventName, (data: any) => {
                this.addToList(data)
            })
        })
    }

    beforeDestory() {
        this.channel.unbind(this.eventName)
        this.channel.unsubscribe()
    }

    render(): VNode {
        return <div class="p-3">
            <div class="flex justify-between items-center">
                <h3 class="mb-3">Notification</h3>
                <a href="#" class="text-yellow-500 text-sm hover:text-gray-500 transition-colors" onClick={(event: MouseEvent) => {
                    event.preventDefault()
                    this.fetchRecord()
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" class={{ "h-4 w-4 inline-block align-middle mr-1": true, "animate-spin": this.isLoading }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    refresh
                </a>
            </div>
            <transition-group name="fade-in" class="space-y-3" tag="div">
                {this.notificationList.map((notification: iNotification) => <NotificationItem key={notification.id} notification={notification} />)}
            </transition-group>
        </div>
    }

    fetchRecord() {
        this.isLoading = true

        this.fetch()
            .finally(() => {
                this.isLoading = false
            })
    }
}