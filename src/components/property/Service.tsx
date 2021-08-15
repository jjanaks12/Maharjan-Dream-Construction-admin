import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { iService } from '@/interfaces/app'

@Component
export default class PropertyService extends Vue {

    @Prop({ required: true }) service!: iService

    constructor(prop: any) {
        super(prop)
    }

    /**
     * Page rendering
     * @returns VNode
     */
    render(): VNode {
        return (<div class="text-gray-500 text-sm pt-3">
            {Object.keys(this.service).map((key: string) => <span class="mr-3">{key}<sup>{this.service[key]}</sup></span>)}
        </div>)
    }
}
