import { VNode } from "vue"
import { Component, Prop, Vue, Watch } from "vue-property-decorator"

@Component
export default class CopyLink extends Vue {
    private isCopied: boolean = false

    constructor(props: any) {
        super(props)
    }

    @Prop({ default: '' }) link!: string

    @Watch('isCopied')
    onIsCopiedChanged() {
        if (this.isCopied == true)
            setTimeout(() => {
                this.isCopied = false
            }, 3000);
    }

    render(): VNode {
        return <div class="relative inline-block">
            <a href={this.link} class="text-green-400 hover:text-gray-400 transition" onClick={this.copyLink}>copy link</a>
            {this.isCopied
                ? <span class="bg-white text-green-600 text-xs py-1 px-3 border border-green-600 border-dashed rounded-md absolute top-0 right-0">copied</span>
                : null}
        </div>
    }

    copyLink(event: MouseEvent): void {
        event.preventDefault()
        navigator.clipboard.writeText(location.origin + this.link)
        this.isCopied = true
    }
}