import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Modal extends Vue {
    constructor(prop: any) {
        super(prop)
    }

    @Prop({ required: true }) value!: boolean

    mounted() {
    }

    render(): VNode | null {
        return (<transition mode="out-in" name="fade">
            {this.value ? (<div class="modal max-h-full overflow-y-auto overflow-x-hidden bg-white bg-opacity-50 fixed inset-0 z-50">
                <a href="#" class="text-black hover:text-yellow-400 transition absolute top-2 right-2" onClick={this.closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </a>
                <div class="modal-body w-full max-w-screen-lg py-7">
                    {this.$slots.default}
                </div>
            </div>) : null}
        </transition>)
    }

    closeModal(event: MouseEvent): void {
        event.preventDefault()

        this.$emit('input', false)
    }
}
