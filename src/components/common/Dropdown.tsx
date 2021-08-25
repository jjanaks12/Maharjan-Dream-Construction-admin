import { VNode } from 'vue/types/umd'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Dropdown extends Vue {
    private isActive: boolean = false

    render(): VNode {
        return (<div class="relative" v-click-outside={() => {
            console.log('a');
            
            this.isActive = false
        }}>
            <a href="#" onClick={(event: MouseEvent) => {
                event.preventDefault()
                this.isActive = !this.isActive
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
            </a>
            <div class={{ "w-36 absolute top-full right-0 z-10 mt-1 bg-white shadow-lg rounded-md py-1 text-base overflow-auto sm:text-sm": true, "hidden": !this.isActive }}>
                {this.$slots.default}
            </div>
        </div>)
    }
}