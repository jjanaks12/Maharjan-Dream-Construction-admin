import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

// import Profile from '@/components/settings/Profile'
// import Personal from '@/components/settings/Personal'
// import Notification from '@/components/settings/Notification'
import Delivery from '@/components/settings/Delivery'

@Component
export default class Settings extends Vue {
    /**
     * Template pf the component
     * 
     * @returns VNode
     */
    render(): VNode {
        return (<div class="py-8">
            <div class="container mx-auto px-2">
                <header class="mb-8">
                    <h2 class="text-3xl font-bold text-gray-500 capitalize sm:truncate">Settings</h2>
                </header>
                {/*<Profile />
                <div class="hidden sm:block" aria-hidden="true">
                    <div class="py-5">
                        <div class="border-t border-gray-900"></div>
                    </div>
                </div>
                <Personal />
                <div class="hidden sm:block" aria-hidden="true">
                    <div class="py-5">
                        <div class="border-t border-gray-900"></div>
                    </div>
                </div>
                <Notification />
                <div class="hidden sm:block" aria-hidden="true">
                    <div class="py-5">
                        <div class="border-t border-gray-900"></div>
                    </div>
                </div>*/}
                <Delivery />
            </div>
        </div>)
    }
}
