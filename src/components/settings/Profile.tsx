import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'

@Component
export default class Profile extends Vue {
    render(): VNode {
        return <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                    <h3 class="text-lg font-medium leading-6">Profile</h3>
                    <p class="mt-1 text-sm text-gray-600">
                        This information will be displayed publicly so be careful what you share.
                    </p>
                </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST">
                    <div class="shadow sm:rounded-md sm:overflow-hidden">
                        <div class="px-4 py-5 bg-gray-600 space-y-6 sm:p-6">
                            <div class="grid grid-cols-3 gap-6">
                                <div class="col-span-3 sm:col-span-2">
                                    <label for="company_website" class="block text-sm font-medium text-gray-700">
                                        Website
                                    </label>
                                    <div class="mt-1 flex rounded-md shadow-sm">
                                        <span class="inline-flex items-center px-3 rounded-l-md bg-gray-700 text-gray-500 text-sm">
                                            http://
                                        </span>
                                        <input type="text" name="company_website" id="company_website" class="bg-gray-700 h-10 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label for="about" class="block text-sm font-medium text-gray-700">
                                    About
                                </label>
                                <div class="mt-1">
                                    <textarea id="about" name="about" rows="3" class="bg-gray-700 p-2 shadow-sm mt-1 block w-full sm:text-sm rounded-md resize-none" placeholder="you@example.com"></textarea>
                                </div>
                                <p class="mt-2 text-sm text-gray-500">
                                    Brief description for your profile. URLs are hyperlinked.
                                </p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">
                                    Photo
                                </label>
                                <div class="mt-1 flex items-center">
                                    <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-900">
                                        <svg class="h-full w-full text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </span>
                                    <button type="button" class="ml-5 bg-gray-900 py-2 px-3 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-800">
                                        Change
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">
                                    Cover photo
                                </label>
                                <div class="mt-1 flex flex-col justify-center items-center px-6 pt-5 pb-6 border border-gray-700 border-dashed rounded-md space-y-1 text-center">
                                    <svg class="mx-auto h-12 w-12 text-gray-700" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <div class="flex text-sm text-gray-500">
                                        <label for="file-upload" class="relative cursor-pointer bg-gray-600 rounded-md font-medium text-yellow-600 hover:text-yellow-500 focus-within:outline-none">
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                                        </label>
                                        <p class="pl-1">or drag and drop</p>
                                    </div>
                                    <p class="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
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
    }
}