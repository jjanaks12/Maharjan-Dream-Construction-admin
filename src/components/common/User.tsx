import { iUserDetail } from '@/interfaces/auth'
import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class User extends Vue {
    constructor(props: any) {
        super(props)
    }

    @Prop({ required: true }) user!: iUserDetail

    get getInitial(): any {
        return this.user.name
            .split(' ')
            .reduce((acc, word: string) => acc + word.charAt(0), '')
            .toUpperCase()
    }

    render(): VNode {
        return <div class="flex">
            <figure class="bg-gray-400 text-gray-900 w-16 h-16 flex flex-grow-0 flex-shrink-0 justify-center items-center mr-2 rounded-full">
                {this.user.photo
                    ? <img src={this.user.photo_url} alt={this.user.name} class="w-full h-full object-cover" />
                    : <span class="font-bold">{this.getInitial}</span>
                }

            </figure>
            <div class="flex-grow">
                <strong class="d-block">{this.user.name}</strong>
                <address>{this.user.address}</address>
            </div>
        </div>
    }
}