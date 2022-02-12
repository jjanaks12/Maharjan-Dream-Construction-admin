import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

import { iMenu } from '@/interfaces/app'
import menuList from './menuList'

@Component
export default class Sidebar extends Vue {

	/**
	 * @returns VNode
	 */
	render(): VNode {
		return (<aside id="sidebar" class="pt-10">
			<ul class="main__menu navbar-nav">
				{menuList.map((menu: iMenu, index: number) => (<li>
					<router-link class={{
						'text-white font-medium block px-7 py-3 transition-colors': true,
						'border-gray-600 border-b': index != (menuList.length - 1),
						'bg-yellow-400': this.$route.name === menu.path,
						'hover:text-yellow-400': this.$route.name != menu.path
					}} to={{ name: menu.path }}>{menu.name}</router-link>
				</li>))}
			</ul>
		</aside>)
	}
}
