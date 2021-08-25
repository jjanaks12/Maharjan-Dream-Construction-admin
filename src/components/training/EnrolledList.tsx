import { Component, Prop, Vue } from "vue-property-decorator"
import { VNode } from "vue/types/umd"
import { mapActions, mapGetters } from "vuex"

import { iTraining } from "@/interfaces/training"
import { iUserDetail } from "@/interfaces/auth"

import EnrolledItem from "@/components/training/EnrolledItem"

@Component({
    computed: {
        ...mapGetters({
            list: 'training/getEnrolledUsers'
        })
    },
    methods: {
        ...mapActions({
            enrolled: 'training/enrolled'
        })
    }
})
export default class EnrolledList extends Vue {
    private enrolled!: (training: iTraining) => void
    private list!: Array<iUserDetail>

    constructor(props: any) {
        super(props)
    }

    @Prop({ required: true }) training!: iTraining

    mounted() {
        this.enrolled(this.training)
    }

    render(): VNode {
        return (<div class="grid grid-cols-2 gap-3 space-y-5">
            {this.list.length > 0
                ? this.list.map((user: iUserDetail) => <EnrolledItem training={this.training} user={user} />)
                : <div>
                    <p>No one has enrolled yet</p>
                </div>}
        </div>)
    }
}