import { LitElement } from "lit";
import {customElement, property} from 'lit/decorators.js';
import followNotificationTemplate from './FollowNotification.template';


@customElement('follow-event')
export class FollowNotification extends LitElement {
    render () { 
        return followNotificationTemplate;
    }
}