import { VNode } from 'vue'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Toggle extends Vue {
    private checked: boolean = false

    @Prop({ required: true }) value!: boolean

    constructor(prop: any) {
        super(prop)
    }

    mounted() {
        this.checked = this.value
    }

    @Watch('value')
    valueChanged() {
        this.checked = this.value
    }

    render(): VNode {
        return (<label class="toggle">
            <input type="checkbox" v-model={this.checked} onChange={this.changed} />
            <span class="toggle-knob"></span>
            <span class="ml-3">{this.$slots.default}</span>
        </label>)
    }

    changed(event: InputEvent): void {
        this.$emit('input', this.checked)
    }
}
