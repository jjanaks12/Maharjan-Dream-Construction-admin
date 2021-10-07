import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'

@Component
export default class Personal extends Vue {
    render(): VNode {
        return <div class="mt-10 sm:mt-0">
            <div class="md:grid md:grid-cols-3 md:gap-6">
                <div class="md:col-span-1">
                    <div class="px-4 sm:px-0">
                        <h3 class="text-lg font-medium leading-6">Personal Information</h3>
                        <p class="mt-1 text-sm text-gray-600">
                            Use a permanent address where you can receive mail.
                        </p>
                    </div>
                </div>
                <div class="mt-5 md:mt-0 md:col-span-2">
                    <form action="#" method="POST">
                        <div class="shadow overflow-hidden sm:rounded-md">
                            <div class="px-4 py-5 bg-gray-600 sm:p-6">
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="first_name" class="block text-sm font-medium text-gray-700">First name</label>
                                        <input type="text" name="first_name" id="first_name" autocomplete="given-name" class="bg-gray-700 h-10 p-2 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="last_name" class="block text-sm font-medium text-gray-700">Last name</label>
                                        <input type="text" name="last_name" id="last_name" autocomplete="family-name" class="bg-gray-700 h-10 p-2 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>

                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="email_address" class="block text-sm font-medium text-gray-700">Email address</label>
                                        <input type="text" name="email_address" id="email_address" autocomplete="email" class="bg-gray-700 h-10 p-2 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="country" class="block text-sm font-medium text-gray-700">Country / Region</label>
                                        <select id="country" name="country" autocomplete="country" class="bg-gray-700 h-10 p-2 mt-1 block w-full py-2 px-3 rounded-md shadow-sm focus:outline-none sm:text-sm">
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>Mexico</option>
                                        </select>
                                    </div>

                                    <div class="col-span-6">
                                        <label for="street_address" class="block text-sm font-medium text-gray-700">Street address</label>
                                        <input type="text" name="street_address" id="street_address" autocomplete="street-address" class="bg-gray-700 h-10 p-2 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>

                                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                        <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                                        <input type="text" name="city" id="city" class="bg-gray-700 h-10 p-2 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>

                                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label for="state" class="block text-sm font-medium text-gray-700">State / Province</label>
                                        <input type="text" name="state" id="state" class="bg-gray-700 h-10 p-2 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>

                                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label for="postal_code" class="block text-sm font-medium text-gray-700">ZIP / Postal</label>
                                        <input type="text" name="postal_code" id="postal_code" autocomplete="postal-code" class="bg-gray-700 h-10 p-2 mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 py-3 bg-gray-700 text-right sm:px-6">
                                <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    }
}