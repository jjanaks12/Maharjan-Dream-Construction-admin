import { iNotification } from '@/interfaces/app'
import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class NotificationItem extends Vue {
    readonly name: string = 'NotificationItem'

    @Prop({ required: true }) notification!: iNotification

    constructor(prop: any) {
        super(prop)
    }

    render(): VNode {
        return (<a href="#" class="bg-gray-900 rounded-lg block p-3 text-gray-200">
            <strong>{this.notification.detail}</strong>
            <em class="block not-italic text-gray-500">{this.notification.created}</em>
        </a>)
    }
}
