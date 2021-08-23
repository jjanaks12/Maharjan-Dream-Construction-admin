import { VNode } from "vue"
import { Component, Prop, Vue } from "vue-property-decorator"

import { iUserDetail } from "@/interfaces/auth"
import { formatDate } from "@/plugin/filter"

@Component
export default class UserDetail extends Vue {
    constructor(props: any) {
        super(props)
    }

    @Prop({ required: true }) user!: iUserDetail

    get hasDocument(): boolean {
        return Boolean(this.user.citizenship_back || this.user.citizenship_front)
    }

    render(): VNode {
        return <div class="container bg-gray-700 text-gray-200 flex items-start p-5 rounded-md mx-auto">
            {this.user.photo
                ? <div class="w-96 mr-5 flex-shrink-0 flex-grow-0 rounded-lg overflow-hidden">
                    <img src={this.user.photo_url} alt={this.user.name} class="w-full h-auto" />
                </div>
                : <div class="bg-gray-400 text-white w-96 h-96 text-9xl flex justify-center items-center font-bold mr-4 rounded-full overflow-hidden">
                    {this.getNameInitials(this.user.name)}
                </div>}
            <div class="flex-grow">
                <h2 class="text-xl mb-5">{this.user.name}</h2>
                <dl class="text-sm">
                    <dt class="text-gray-500 text-xs">Email:</dt>
                    <dd class="mb-2">{this.user.email}</dd>
                    <dt class="text-gray-500 text-xs">Phone:</dt>
                    <dd class="mb-2">{this.user.phone}</dd>
                    <dt class="text-gray-500 text-xs">Address:</dt>
                    <dd class="mb-2">{this.user.address}</dd>
                    <dt class="text-gray-500 text-xs">Date of Join</dt>
                    <dd class="mb-2">{formatDate(this.user.created_at)}</dd>
                    <dt class="text-gray-500 text-xs">Email Verified</dt>
                    <dd class="mb-2">{this.user.email_verified_at ? <span class="text-green-400">verified</span> : <span class="text-red-500">Not Verified</span>}</dd>
                    {this.hasDocument ? [
                        <dt class="text-gray-500 text-xs font-normal">Documents</dt>,
                        <dd class="flex space-x-2">
                            {this.user.citizenship_front ? <div class="w-1/2">
                                <img src={this.user.citizenship_front_url} alt={`${this.user.name}_citizenship_front`} class="w-full h-auto" />
                            </div> : null}
                            {this.user.citizenship_back ? <div class="w-1/2">
                                <img src={this.user.citizenship_back_url} alt={`${this.user.name}_citizenship_back`} class="w-full h-auto" />
                            </div> : null}
                        </dd>
                    ] : null}
                </dl>
            </div>
        </div>
    }

    getNameInitials(name: string): string {
        return name.split(' ').map((word: string) => word.charAt(0)).slice(0, 2).join('')
    }
}