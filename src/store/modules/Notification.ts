import { iNotification } from '@/interfaces/app';
import { Module, VuexModule } from "vuex-module-decorators";
import moment from 'moment'


@Module
export default class Notification extends VuexModule {
    private notificationList: Array<iNotification> = [{
        id: 1,
        detail: 'Massa vitae tortor condimentum lacinia quis vel eros donec',
        created: moment().subtract(3, 'days').fromNow()
    }, {
        id: 2,
        detail: 'Lorem ipsum dolor sit amet',
        created: moment().subtract(3, 'minutes').fromNow()
    }, {
        id: 3,
        detail: 'Lorem dolor sed viverra ipsum',
        created: moment().subtract(1, 'hours').fromNow()
    }, {
        id: 4,
        detail: 'Egestas sed tempus urna',
        created: moment().fromNow()
    }]

    get getNotificationList(): Array<iNotification> {
        return this.notificationList
    }
}