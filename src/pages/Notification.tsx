import NotificationItem from '@/components/notification/NotificationItem'
import { iNotification } from '@/interfaces/app'
import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

@Component({
    computed: {
        ...mapGetters({
            notificationList: 'notification/getNotificationList'
        })
    }
})
export default class User extends Vue {
    private notificationList!: Array<iNotification>

    /**
     * 
     * @returns VNode
     */
    render(): VNode {
        return (<div class="py-8">
            <div class="container mx-auto px-2">
                <header class="mb-10">
                    <h2 class="text-3xl font-bold text-gray-500 capitalize sm:truncate">Notification List</h2>
                </header>
                <transition-group tag="div" name="fade-in" class="md:space-y-1">
                    {this.notificationList.map((notification: iNotification, index: number) => (<NotificationItem notification={notification} key={notification.id} style={{ '--transition-delay': index * 0.3 + 's' }} />))}
                </transition-group>
            </div>
        </div>)
    }
}
