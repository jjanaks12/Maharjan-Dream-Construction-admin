import { Component, Prop, Vue } from "vue-property-decorator"
import { VNode } from "vue/types/umd"
import { mapActions, mapGetters } from "vuex"

import { iTraining } from "@/interfaces/app"
import { iUserDetail } from "@/interfaces/auth"
import Dropdown from "../common/Dropdown"

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
        return (<div class="grid grid-cols-2 space-y-5">
            {this.list.length > 0 ? this.list.map((user: iUserDetail) => <div class="flex items-center">
                <div class="w-16 h-16 mr-5 rounded-full overflow-hidden">
                    <img src={user.photo_url} alt={user.name} class="w-full h-full object-cover" />
                </div>
                <div class="flex-grow">
                    <strong class="text-lg">{user.name}</strong>
                </div>
                <Dropdown>
                    <ul>
                        <li><a href="#as" class="text-gray-900 cursor-default block select-none relative py-2 pl-3 pr-9 hover:bg-blue-900">Update status</a></li>
                        <li><a href="#aaaa" class="text-gray-900 cursor-default block select-none relative py-2 pl-3 pr-9">Order status</a></li>
                    </ul>
                </Dropdown>
            </div>) : <div>
                <p>No one has enrolled yet</p>
            </div>}
        </div>)
    }
}