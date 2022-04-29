import SnackBar from '@/components/common/SnackBar'
import { iLogin, iUserDetail } from '@/interfaces/auth'
import FormComponent from '@/core/FormComponent'
import { validate } from 'vee-validate'
import { VNode } from 'vue'
import { Component } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

@Component({
  computed: {
    ...mapGetters({
      loggedinUser: 'root/getLoggedinUser'
    })
  },
  methods: {
    ...mapActions({
      login: 'root/login'
    })
  }
})
export default class Login extends FormComponent {
  private login!: (formData: iLogin) => Promise<boolean>
  private loading: boolean = false
  private formData: iLogin = {
    email: '',
    password: '',
  }

  private loggedinUser!: iUserDetail

  constructor() {
    super()

    this.errors = {
      email: [],
      password: []
    }
  }

  mounted() {
    if (this.loggedinUser && Object.keys(this.loggedinUser).length > 0)
      this.$router.push({ name: 'dashboard' })
  }

  /**
   * 
   * @returns VNode
   */
  render(): VNode {
    return (<div class="min-h-screen flex items-center justify-center bg-gray-800">
      <div class="bg-gray-900 p-5 pb-8 max-w-md w-full space-y-8 rounded-lg">
        <h1 class="mt-6 text-center text-3xl font-extrabold text-gray-500">Sign in to your account</h1>
        <form class="mt-8 space-y-6" action="#" method="POST" onSubmit={this.formSubmitted} novalidate>
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autocomplete="email" required class={{ 'appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm': true, 'border-gray-300': this.errors.email.length == 0, 'border-red-300 placeholder-red-700 text-red-700': this.errors.email.length > 0 }} placeholder="Email address" v-model={this.formData.email} />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input id="password" name="password" type="password" autocomplete="current-password" required class={{ 'appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm': true, 'border-gray-300': this.errors.password.length == 0, 'border-red-300 placeholder-red-700 text-red-700': this.errors.password.length > 0 }} placeholder="Password" v-model={this.formData.password} />
            </div>
          </div>

          {/* <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" v-model={this.formData.rememberMe} />
              <label for="remember_me" class="ml-2 block text-sm text-gray-400">Remember me</label>
            </div>
            <div class="text-sm">
              <router-link to="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</router-link>
            </div>
          </div> */}

          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            {this.loading ? (<svg class="h-5 w-5 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>) : null}
            <span>Sign in</span>
          </button>
        </form>
        <router-link to={{ name: 'home' }}>Home</router-link>
      </div>
      {this.hasError ? (<SnackBar message={this.errorMessage} />) : null}
    </div>)
  }

  /**
   * 
   * @param event 
   * HTML Form submit event
   * 
   * @returns void
   */
  async formSubmitted(event: HTMLFormElement): Promise<void> {
    event.preventDefault()
    this.resetErrorMessage()

    await validate(this.formData.email, 'required|email|min:4', { name: 'email' })
      .then(result => {
        this.errors['email'] = result.errors
      })

    await validate(this.formData.password, 'required', { name: 'password' })
      .then(result => {
        this.errors['password'] = result.errors
      })

    this.$nextTick(() => {
      if (!this.hasError) {
        this.loading = true

        this.login(this.formData)
          .then(() => {
            this.$router.push({ name: 'dashboard' })
          })
          .finally(() => {
            this.loading = false
          })
      }
    })
  }
}
