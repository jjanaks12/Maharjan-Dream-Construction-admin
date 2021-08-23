import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

import DeskList from '@/components/resturant/DeskList'
import MenuList from '@/components/resturant/MenuList'

@Component
export default class Resturant extends Vue {

    render(): VNode {
        return (<div class="py-8">
            <div class="container mx-auto px-2">
                <header class="text-gray-500 flex justify-between items-center mb-10">
                    <h2 class="text-3xl font-bold capitalize sm:truncate">Resturant</h2>
                </header>
                <div class="flex">
                    <div class="w-2/3 px-2">
                        <MenuList />
                    </div>
                    <div class="w-1/3 px-2">
                        <DeskList class="mb-9" />
                    </div>
                </div>
            </div>
        </div>)
    }
}
