import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

import Tab from '@/components/common/tab/Index'
import TabItem from '@/components/common/tab/Item'
import CategoryList from '@/components/material/CategoryList'
import MaterialList from '@/components/material/List'

import VendorList from '@/components/vendor/List'

@Component
export default class Material extends Vue {
    render(): VNode {
        return (<div class="py-8">
            <div class="container mx-auto px-2">
                <Tab>
                    <TabItem title="Materials">
                        <MaterialList />
                    </TabItem>
                    <TabItem title="Categories">
                        <CategoryList />
                    </TabItem>
                    <TabItem title="Vendors">
                        <VendorList />
                    </TabItem>
                </Tab>
            </div>
        </div>)
    }
}
