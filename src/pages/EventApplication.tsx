import { Component } from "vue-property-decorator"
import FormComponent from "@/core/FormComponent"
import { VNode } from "vue"

@Component
export default class EventApplication extends FormComponent {
    render(): VNode {
        return <form action="#" class="register__form" method="POST" autocomplete="off" novalidate>
            <strong class="title">Name</strong>
            <div class="row">
                <div class="col-4">
                    <div class="form-group has-error">
                        <label for="firstName" class="sr-only">First name</label>
                        <input id="firstName" type="text" name="first_name" placeholder="First Name" required />
                        <span class="error-message">First name is required</span>
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label for="middleName" class="sr-only">Middle Name</label>
                        <input id="middleName" type="text" name="middle_name" placeholder="Middle Name" />
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group has-error">
                        <label for="lastName" class="sr-only">Last Name</label>
                        <input id="lastName" type="text" name="last_name" placeholder="Last Name" required />
                        <span class="error-message">last name is required</span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <div class="form-group has-error">
                        <label for="DateBirth">Date of Birth</label>
                        <input id="dateBirth" type="date" min="2022-01-31" max="2022-02-28" required />
                        <span class="error-message">Date of Birth is required</span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="form-group has-error">
                        <label for="guildName">Guild Name</label>
                        <input id="guildName" type="text" name="guild_name" placeholder="Guild" required />
                        <span class="error-message">guild name is required</span>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group has-error">
                        <label for="gameName">Game Name</label>
                        <input id="gameName" type="text" name="game_name" placeholder="Game" required />
                        <span class="error-message">game name is required</span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="form-group dropdown has-error">
                        <label for="phoneType">Type Of Phone</label>
                        <a href="#" id="phoneType" class="dropdown-opener">Select Your Phone Type<span class="icon-down-arrow"></span></a>
                        <ul class="dropdown-menu">
                            <li class="selected"><a href="#">Select Your Phone Type</a></li>
                            <li><a href="#">android</a></li>
                            <li><a href="#">iphone</a></li>
                        </ul>
                        <span class="error-message">phone type is required</span>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group has-error">
                        <label for="phoneNumber">Phone Number</label>
                        <input id="phoneNumber" type="number" name="phone_number" minlength="10" maxlength="10" placeholder="+977" required />
                        <span class="error-message">phone number is required</span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-1">
                    <div class="form-group form__checkbox">
                        <input type="checkbox" name="terms_and_conditions" id="asf-terms" />
                        <label for="asf-terms" class="text__link">I agree to the <a href="terms.html" target="_blank">Terms and Conditions</a></label>
                    </div>
                    <div class="form-group form__checkbox">
                        <input type="checkbox" name="rules_and_regulation" id="asf-rules" />
                        <label for="asf-rules" class="text__link">I agree to the <a href="rules.html" target="_blank">Rules and Regulations</a></label>
                    </div>
                    <div class="form-group form__checkbox text__rules" >
                        <span>Rules and Regulations 1: Torquent lectus malesuada molestie. Scelerisque Malesuada vestibulum magna senectus habitant primis, sollicitudin per mi platea cursus malesuada et ornare facilisi habitant, sem, cras conubia. Hendrerit enim elementum nunc imperdiet sagittis eros ac est. Dignissim mauris curae;. Arcu a sagittis sit, dolor eros dis fusce.</span>
                        <span>Rules and Regulations 2: those players who found out playing game on PC will be immediatly disqualify.</span>
                        <span>Rules and Regulations 3: those players who found out hacking will be immedidatly disqualify.</span>
                        <span>Rules and Regulations 4:</span>
                    </div>
                </div>
            </div>
            <div class="button__register">
                <button type="button" class="btn">Register</button>
            </div>
        </form>
    }
}