import { Component, Vue } from "vue-property-decorator"
import { VNode } from 'vue'

@Component
export default class Loading extends Vue {
    render(): VNode {
        return <div class="container animate-pulse space-y-3">
            <div class="flex mb-12">
                <div class="bg-gray-900 h-56 w-56"></div>
                <div class="flex-grow space-y-3 pl-4">
                    <div class="h-3 bg-gray-900 rounded"></div>
                    <div class="h-3 bg-gray-900 rounded"></div>
                    <div class="h-3 bg-gray-900 rounded"></div>
                    <div class="h-3 bg-gray-900 rounded"></div>
                    <div class="h-3 bg-gray-900 rounded"></div>
                    <div class="h-3 bg-gray-900 rounded"></div>
                    <div class="h-3 bg-gray-900 rounded"></div>
                    <div class="grid grid-cols-3 gap-4">
                        <div class="h-3 bg-gray-900 rounded col-span-2"></div>
                        <div class="h-3 bg-gray-900 rounded col-span-1"></div>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <div class="h-3 bg-gray-900 rounded col-span-2"></div>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <div class="h-3 bg-gray-900 rounded col-span-1"></div>
                    </div>
                </div>
            </div>
            <div class="h-3 bg-gray-900 rounded"></div>
            <div class="h-3 bg-gray-900 rounded"></div>
            <div class="grid grid-cols-3 gap-4">
                <div class="h-3 bg-gray-900 rounded col-span-2"></div>
                <div class="h-3 bg-gray-900 rounded col-span-1"></div>
            </div>
            <div class="flex py-12">
                <div class="flex-grow space-y-3 pr-4">
                    <div class="h-3 bg-gray-900 rounded"></div>
                    <div class="h-3 bg-gray-900 rounded"></div>
                    <div class="h-3 bg-gray-900 rounded"></div>
                    <div class="h-3 bg-gray-900 rounded"></div>
                    <div class="h-3 bg-gray-900 rounded"></div>
                    <div class="h-3 bg-gray-900 rounded"></div>
                    <div class="h-3 bg-gray-900 rounded"></div>
                    <div class="grid grid-cols-3 gap-4">
                        <div class="h-3 bg-gray-900 rounded col-span-2"></div>
                        <div class="h-3 bg-gray-900 rounded col-span-1"></div>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <div class="h-3 bg-gray-900 rounded col-span-2"></div>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <div class="h-3 bg-gray-900 rounded col-span-1"></div>
                    </div>
                </div>
                <div class="bg-gray-900 h-56 w-56"></div>
            </div>
            <div class="h-3 bg-gray-900 rounded"></div>
            <div class="h-3 bg-gray-900 rounded"></div>
            <div class="grid grid-cols-3 gap-4">
                <div class="h-3 bg-gray-900 rounded col-span-2"></div>
                <div class="h-3 bg-gray-900 rounded col-span-1"></div>
            </div>
            <div class="h-3 bg-gray-900 rounded"></div>
            <div class="grid grid-cols-3 gap-4">
                <div class="h-3 bg-gray-900 rounded col-span-2"></div>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <div class="h-3 bg-gray-900 rounded col-span-1"></div>
            </div>
        </div>
    }
}