import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Paginate extends Vue {
    @Prop({ required: true }) current!: number
    @Prop({ required: true }) total!: number
    @Prop({ default: 3 }) max!: number

    constructor(props: any) {
        super(props)
    }

    get pages(): Array<number> {
        let length = this.max

        if (length > this.total)
            length = this.total;

        let start = this.current - Math.floor(length / 2)
        start = Math.max(start, 1)
        start = Math.min(start, 1 + this.total - length)

        return Array.from({ length: length }, (_, i) => start + i)
    }

    /** 
     * 
     * @returns VNode
     */
    render(): VNode {
        return (<nav class="pagination flex justify-between items-center space-x-2 pt-5">
            {this.total > 1
                ? [<ul class="flex items-center space-x-2">
                    {this.current > 1 ? <li><a href="#" onClick={this.prev}>prev</a></li> : null}
                    {this.pages.map((pageno: number) => <li>
                        {pageno === this.current
                            ? <strong class="w-8 h-8 bg-yellow-600 text-white flex items-center justify-center rounded-full">{pageno}</strong>
                            : <a href="#" class="w-8 h-8 bg-gray-700 text-white flex items-center justify-center rounded-full" onClick={(event: MouseEvent) => { event.preventDefault(); this.goto(pageno) }}>{pageno}</a>}
                    </li>)}
                    {this.current < this.total ? <li><a href="#" onClick={this.next}>next</a></li> : null}
                </ul>,
                <span>{this.current}/{this.total}</span>]
                : null}
        </nav>)
    }

    next(event: MouseEvent): void {
        event.preventDefault()
        this.$emit('next')
    }

    prev(event: MouseEvent): void {
        event.preventDefault()
        this.$emit('prev')
    }

    goto(pageNo: number): void {
        this.$emit('goto', pageNo)
    }
}
