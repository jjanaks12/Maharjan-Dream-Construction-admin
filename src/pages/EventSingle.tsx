import { VNode } from "vue"
import { Component, Vue } from "vue-property-decorator"

import { eventInit, iEvent } from "@/interfaces/event"
import { mapActions } from "vuex"
import EventRegistrationForm from "@/components/event/RegistrationForm"
import moment from "moment"

@Component({
    methods: {
        ...mapActions({
            getEvent: 'event/get'
        })
    }
})
export default class EventSingle extends Vue {
    private getEvent!: (slug: string) => iEvent
    private event: iEvent = eventInit

    async mounted() {
        this.event = await this.getEvent(this.$route.params.slug)
    }

    get canRegister(): boolean {
        return moment(this.event.end).isAfter(moment())
    }

    render(): VNode {
        return <div class="content-body">
            <div class="page-header">
                <div class="container">
                    <h1>Registration Form</h1>
                    <h2>PUBG Game Tournament</h2>
                    <strong>Maharajan Dream's Game Register to play </strong>
                    <em class="text-event">Event Start On: <time datetime="2022-02-14">02/14/2022</time></em>
                    {!this.canRegister ? <span class="text-3xl text-white mt-10">Event Has Ended</span> : null}
                </div>
                <div class="absolute inset-0 -z-1">
                    <img src="/img/banner01.jpg" alt={this.event.name} class="w-full h-full object-cover" />
                    <span class="bg-black absolute inset-0 z-10 opacity-50"></span>
                </div>
            </div>
            {this.canRegister ? [
                <EventRegistrationForm />,
                <div class="container">
                    <article id="content" domPropsInnerHTML={this.event.description} />
                </div>,
                <div class="content-bg">
                    <img src="/img/pubg.png" alt="image description" />
                </div>
            ] : null}
        </div>
    }
}