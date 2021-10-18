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
            this.fetch()

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
            <h3 class="mb-3">Notification</h3>
            <transition-group name="fade-in" class="space-y-3" tag="div">
                {this.notificationList.map((notification: iNotification) => <NotificationItem key={notification.id} notification={notification} />)}
            </transition-group>
        </div>
    }
}