import { VNode } from "vue"
import { Component, Prop, Vue } from "vue-property-decorator"

import { iUserDetail } from "@/interfaces/auth"
import { iTraining, iTrainingUser, trainingUserInit } from "@/interfaces/training"

import Dropdown from "../common/Dropdown"

@Component
export default class EnrolledItem extends Vue {
    constructor(props: any) {
        super(props)
    }

    @Prop({ required: true }) user!: iUserDetail
    @Prop({ required: true }) training!: iTraining

    get userTrainingDetail(): iTrainingUser {
        return this.user.pivot || trainingUserInit
    }

    render(): VNode {
        return <div class="flex items-center">
            <div class="w-16 h-16 mr-5 rounded-full overflow-hidden">
                <img src={this.user.photo_url} alt={this.user.name} class="w-full h-full object-cover" />
            </div>
            <div class="flex-grow">
                <strong class="text-lg leading-none block mb-1">{this.user.name}</strong>
                <em class="text-gray-700 text-sm not-italic leading-none">{this.userTrainingDetail.queried_at}</em>
            </div>
            <Dropdown>
                <ul class="text-right">
                    <li><a href="#" class="text-gray-900 block select-none relative p-2 hover:bg-blue-900 hover:text-white" onClick={(event: MouseEvent) => {
                        event.preventDefault()
                    }}>Accept</a></li>
                    <li><a href="#" class="text-gray-900 block select-none relative p-2 hover:bg-blue-900 hover:text-white" onClick={(event: MouseEvent) => {
                        event.preventDefault()
                    }}>Reject</a></li>
                </ul>
            </Dropdown>
        </div>
    }
}