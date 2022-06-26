import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'

interface iStats {
	orders: number
	users: number,
	[propname: string]: number
}

const colors = ['text-green-400', 'text-purple-400']

@Component({
	methods: {
		...mapActions({
			getStats: 'root/getStats'
		})
	}
})
export default class Dashboard extends Vue {
	private getStats!: () => Promise<iStats>
	private stats: iStats = {
		orders: 0,
		users: 0
	}

	async mounted() {
		this.stats = await this.getStats()
	}

	/**
	 * Template pf the component
	 * 
	 * @returns VNode
	 */
	render(): VNode {
		return <div class="py-8">
			<div class="container mx-auto px-2">
				<header class="mb-10">
					<h1 class="text-3xl font-bold text-gray-500 capitalize sm:truncate">Dashboard</h1>
				</header>
				<h2 class="text-2xl mb-4">Updates on this months</h2>
				<div class="grid grid-cols-4 gap-4 text-center">
					{Object.keys(this.stats).map((key: string, index: number) => <router-link to={{ name: key }} class={{ "p-3 border border-dashed border-gray-600 rounded-md": true, [colors[index]]: true }}>
						<strong class="block capitalize">{key}</strong>
						<em class="not-italic text-3xl">{this.stats[key]}</em>
					</router-link>)}
				</div>
			</div>
		</div>
	}
}
