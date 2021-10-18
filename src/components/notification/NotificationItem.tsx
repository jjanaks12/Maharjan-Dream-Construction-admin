import moment from 'moment'
import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { iNotification } from '@/interfaces/notification'
import Modal from '../common/Modal'
import OrderDetail from '../order/Detail'
import UserDetail from '../user/UserDetail'
import { mapActions } from 'vuex'

@Component({
    methods: {
        ...mapActions({
            markAsRead: 'notification/markAsRead'
        })
    }
})
export default class NotificationItem extends Vue {
    private showUser: boolean = false
    private showOrder: boolean = false
    private markAsRead!: (id: string) => Promise<boolean>

    @Prop({ required: true }) notification!: iNotification

    constructor(prop: any) {
        super(prop)
    }

    get isRead(): boolean {
        return this.notification.is_read === 1
    }

    render(): VNode {
        return <div class="bg-gray-900 text-sm rounded-lg block p-3 text-gray-200" onClick={(event: MouseEvent) => {
            event.preventDefault()

            if (this.notification.id && !this.isRead)
                this.markAsRead(this.notification.id)
        }}>
            {this.userEL()}
            <em class="block not-italic text-gray-500 text-xs">{moment(this.notification.created_at).local().format('MM/DD/YYYY hh:mm a')}</em>
            <span class="w-5 block">
                {this.isRead
                    ? <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                    </svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>}
            </span>
            <Modal v-model={this.showUser}>
                <UserDetail user={this.notification.user} />
            </Modal>
            <Modal v-model={this.showOrder}>
                <OrderDetail order-id={this.notification.model_id} />
            </Modal>
        </div>
    }

    userEL(): VNode {
        return <strong class="font-normal">{this.notification.user
            ? <span>User <a href="#" class="font-semibold text-green-500" onClick={(event: MouseEvent) => {
                event.preventDefault()
                this.showUser = true
            }}>{this.notification.user.name}</a></span>
            : 'Admin'
        } has {this.notification.operation} <a href="#" class="text-yellow-500" onClick={(event: MouseEvent) => {
            event.preventDefault()
            this.showOrder = true
        }}> {this.notification.type}</a></strong>
    }
}
