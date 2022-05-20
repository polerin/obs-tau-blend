import { LitElement } from "lit";
import {customElement, property} from 'lit/decorators.js';
import followNotificationTemplate from './FollowNotification.template';

@customElement('follow-notification')
export class FollowNotification extends LitElement {
    render () { 
        return followNotificationTemplate;
    }
}