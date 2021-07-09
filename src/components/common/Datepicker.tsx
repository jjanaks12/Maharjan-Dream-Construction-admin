import { VNode } from 'vue/types/umd'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

const currentYear = (new Date()).getFullYear()
const currentMonth = (new Date()).getMonth()
const currentDay = (new Date()).getDay()

const months: Array<string> = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
const daysInMonths: { [propName: string]: number } = {
    january: 31,
    february: 28,
    march: 31,
    april: 30,
    may: 31,
    june: 30,
    july: 31,
    august: 31,
    september: 30,
    october: 31,
    november: 30,
    december: 31,
}

@Component
export default class DatePicker extends Vue {
    private year: number | null = (new Date()).getFullYear()
    private month: number | null = (new Date()).getMonth()
    private day: number | null = (new Date()).getDay()
    private hour: number | null = (new Date()).getHours()
    private minute: number | null = (new Date()).getMinutes()

    @Prop({ default: false }) isValid!: boolean

    get date(): string {
        if (this.year && this.month && this.day) {
            const d = new Date()
            d.setFullYear(this.year, this.month, this.day)
            return d.toDateString()
        } else {
            return ''
        }
    }

    @Watch('year')
    watchHandler(newValue: number) {
        if (newValue >= currentYear)
            this.$emit('input', this.date)
    }

    render(): VNode {
        return (<div class="">
            <div>{this.date}</div>
            <div class="flex gap-2 items-center">
                <input type="number" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.isValid }} v-model={this.year} placeholder="YYYY" />
                <input type="number" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.isValid }} v-model={this.month} placeholder="MM" />
                <input type="number" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.isValid }} v-model={this.day} placeholder="DD" />
                <span>At</span>
                <input type="number" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.isValid }} v-model={this.hour} placeholder="HH" />
                <span>:</span>
                <input type="number" class={{ 'bg-gray-700 appearance-none relative block w-full px-3 py-2 placeholder-gray-500 outline-none text-gray-400 border border-transparent rounded-md sm:text-sm': true, 'border-red-700 placeholder-red-700 text-red-700': this.isValid }} v-model={this.minute} placeholder="MM" />
                <a href="#" onClick={this.resetPicker}>reset</a>
            </div>
        </div>)
    }

    resetPicker(event: MouseEvent): void {
        event.preventDefault()

        this.year = null
        this.month = null
        this.day = null
        this.hour = null
        this.minute = null
    }
}