import { VNode } from "vue"
import { Component } from "vue-property-decorator"
import moment from "moment"

import FormComponent from "@/core/FormComponent"
import { eventParticipantInit, iEventParticipant, PhoneType } from "@/interfaces/event"
import { validate } from "vee-validate"

const today = moment().format('YYYY-MM-DD')

@Component
export default class EventRegistrationForm extends FormComponent {
    private isSaving: boolean = false
    private isAgreedTermsAndCondition: boolean = false
    private isAgreedRulesAndRegulation: boolean = false
    private formData: iEventParticipant = eventParticipantInit

    constructor(props: any) {
        super(props)

        this.errors = {
            first_name: [],
            last_name: [],
            date_of_birth: [],
            guild_name: [],
            game_name: [],
            phone_type: [],
            phone_number: [],
        }
    }

    render(): VNode {
        return <form class="register-form" onSubmit={this.formSubmitted} method="POST" novalidate>
            <div class="container">
                <div class="flex flex-wrap -mx-5">
                    <strong class="title w-full px-5">Title</strong>
                    <div class="form-group w-1/3 px-5">
                        <label class="sr-only" for="first_name">First name</label>
                        <input type="text" id="first_name" name="first_name" class="form-control" placeholder="First name" v-model={this.formData.first_name} />
                        {this.errors.first_name.length > 0 ? <span class="error-message">{this.errors.first_name[0]}</span> : null}
                    </div>
                    <div class="form-group w-1/3 px-5">
                        <label class="sr-only" for="middle_name">Middle name</label>
                        <input type="text" id="middle_name" name="middle_name" class="form-control" placeholder="Middle name" v-model={this.formData.middle_name} />
                    </div>
                    <div class="form-group w-1/3 px-5">
                        <label class="sr-only" for="last_name">Last name</label>
                        <input type="text" id="last_name" name="last_name" class="form-control" placeholder="Last name" v-model={this.formData.last_name} />
                        {this.errors.last_name.length > 0 ? <span class="error-message">{this.errors.last_name[0]}</span> : null}
                    </div>
                </div>
                <div class="flex flex-wrap -mx-5">
                    <div class="form-group w-1/3 px-5">
                        <label for="date_of_birth">Date of Birth</label>
                        <input type="date" id="date_of_birth" name="date_of_birth" class="form-control" max={today} v-model={this.formData.date_of_birth} />
                        {this.errors.date_of_birth.length > 0 ? <span class="error-message">{this.errors.date_of_birth[0]}</span> : null}
                    </div>
                </div>
                <div class="flex flex-wrap -mx-5">
                    <div class="form-group w-1/2 px-5">
                        <label for="guild_name">Guild name</label>
                        <input type="text" id="guild_name" name="guild_name" class="form-control" v-model={this.formData.guild_name} />
                        {this.errors.guild_name.length > 0 ? <span class="error-message">{this.errors.guild_name[0]}</span> : null}
                    </div>
                    <div class="form-group w-1/2 px-5">
                        <label for="game_name">Game name</label>
                        <input type="text" id="game_name" name="game_name" class="form-control" v-model={this.formData.game_name} />
                        {this.errors.game_name.length > 0 ? <span class="error-message">{this.errors.game_name[0]}</span> : null}
                    </div>
                </div>
                <div class="flex flex-wrap -mx-5">
                    <div class="form-group w-1/2 px-5">
                        <label for="type_of_phone">Type of Phone</label>
                        <select type="text" id="type_of_phone" name="type_of_phone" class="form-control" v-model={this.formData.phone_type}>
                            <option value="">Select One</option>
                            {Object.values(PhoneType).map((type) => <option value={type}>{type}</option>)}
                        </select>
                    </div>
                    <div class="form-group w-1/2 px-5">
                        <label for="phone_number">Phone number</label>
                        <input type="text" id="phone_number" name="phone_number" class="form-control" v-model={this.formData.phone_number} />
                        {this.errors.phone_number.length > 0 ? <span class="error-message">{this.errors.phone_number[0]}</span> : null}
                    </div>
                </div>
                <div class="form-group form-checkbox">
                    <input type="checkbox" class="w-5 h-5 mr-2" name="terms_and_conditions" id="terms_and_conditions" v-model={this.isAgreedTermsAndCondition} />
                    <label for="terms_and_conditions" class="text-link">I agree to the <router-link class="link" to={{ name: 'single_page', params: { slug: 'terms_and_conditions' } }} target="_blank">Terms and Conditions</router-link></label>
                </div>
                <div class="form-group form-checkbox">
                    <input type="checkbox" class="w-5 h-5 mr-2" name="rules_and_regulation" id="rules_and_regulation" v-model={this.isAgreedRulesAndRegulation} />
                    <label for="rules_and_regulation" class="text-link">I agree to the <router-link class="link" to={{ name: 'single_page', params: { slug: 'rules_and_regulation' } }} target="_blank">Rules and Regulations</router-link></label>
                </div>
                <div class="button-register">
                    <button type="submit" class="btn" disabled={!(this.isAgreedRulesAndRegulation && this.isAgreedTermsAndCondition)}>Register</button>
                </div>
            </div>
        </form>
    }

    async formSubmitted(event: HTMLFormElement): Promise<void> {
        event.preventDefault()
        this.resetErrorMessage()

        await validate(this.formData.first_name, 'required', { name: 'first_name' })
            .then(result => {
                this.errors['first_name'] = result.errors
            })

        await validate(this.formData.last_name, 'required', { name: 'last_name' })
            .then(result => {
                this.errors['last_name'] = result.errors
            })

        await validate(this.formData.date_of_birth, 'required', { name: 'date_of_birth' })
            .then(result => {
                this.errors['date_of_birth'] = result.errors
            })

        await validate(this.formData.guild_name, 'required', { name: 'guild_name' })
            .then(result => {
                this.errors['guild_name'] = result.errors
            })

        await validate(this.formData.game_name, 'required', { name: 'game_name' })
            .then(result => {
                this.errors['game_name'] = result.errors
            })

        await validate(this.formData.phone_number, 'required', { name: 'phone_number' })
            .then(result => {
                this.errors['phone_number'] = result.errors
            })

        this.$nextTick(() => {
            if (!this.hasError) {
                console.log(this.formData)
            }
        })
    }
}