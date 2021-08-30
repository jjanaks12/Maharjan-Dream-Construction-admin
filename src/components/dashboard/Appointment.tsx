import { VNode } from "vue"
import { Component, Prop, Vue } from "vue-property-decorator"
import { mapActions, mapGetters } from "vuex"
import moment from "moment"

import { AppointmentStatus, availability } from "@/interfaces/availability"
import Dropdown from "../common/Dropdown"

@Component({
    computed: {
        ...mapGetters({
            list: 'appointment/list'
        })
    },
    methods: {
        ...mapActions({
            fetch: 'appointment/fetch',
            updateStatus: 'appointment/updateStatus'
        })
    }
})
export default class Appointment extends Vue {
    private list!: Array<availability>
    private fetch!: (payload: { realstate_id: string | null, rent_id: string | null, type: string }) => Promise<boolean>
    private updateStatus!: (payload: { status: AppointmentStatus, id: string }) => Promise<boolean>

    mounted() {
        this.fetch({
            realstate_id: this.realstateId,
            rent_id: this.rentId,
            type: this.type
        })

        this.$forceUpdate()
    }

    constructor(props: any) {
        super(props)
    }

    @Prop({
        default: 'realstate',
        validator: (val: string) => ['realstate', 'rent'].includes(val)
    }) type!: string
    @Prop({ default: null }) realstateId!: string | null
    @Prop({ default: null }) rentId!: string | null

    render(): VNode {
        return this.list.length > 0
            ? <div>
                {this.list.map((appointment: availability, index: number) => <div class={{
                    "flex": true,
                    "pb-3 mb-4 border-b border-gray-700": index !== this.list.length - 1
                }}>
                    <div class="flex-grow">
                        <em class="not-italic">{moment(appointment.date).format('Do [of] MMM, YYYY [at] hh:mm a')}</em>
                        <strong class="block">{appointment.user?.name}</strong>
                    </div>
                    <div>
                        <Dropdown opener={(): VNode => <span class={{
                            'text-blue-500': appointment.status === AppointmentStatus.REQUESTED,
                            'text-green-500': appointment.status === AppointmentStatus.ACCEPTED,
                            'text-red-500': appointment.status === AppointmentStatus.REJECTED,
                            // 'text-yellow-500': appointment.status === AppointmentStatus.DELAYED,
                            "font-semibold": true
                        }}>&bull; {appointment.status}</span>}>
                            <ul class="text-xs text-right">
                                {Object.values(AppointmentStatus).map(status => <li><a href="#" class={{
                                    'text-blue-500': status === AppointmentStatus.REQUESTED,
                                    'text-green-500': status === AppointmentStatus.ACCEPTED,
                                    'text-red-500': status === AppointmentStatus.REJECTED,
                                    // 'text-yellow-500': status === AppointmentStatus.DELAYED,
                                    "text-white p-1 block": true
                                }} onClick={(event: MouseEvent) => {
                                    event.preventDefault()
                                    this.updateStatus({
                                        id: appointment.id || '',
                                        status
                                    })
                                }}>&bull; {status}</a></li>)}
                            </ul>
                        </Dropdown>
                    </div>
                </div>)}
            </div>
            : <span>No appointments yet</span>
    }
}