import { LitElement, html} from "lit";
import {customElement, property, state} from 'lit/decorators.js';
import { subscribe, unsubscribe } from "Infrastructure/Shared/TypedPubsub";

import { SystemMessageNames, AppMessageSet, TwitchEventMessages } from "Shared/MessageHandling";

import singleFollowTemplate from './SingleFollow.template';
import multiFollowTemplate from "./MultiFollow.template";

@customElement('follow-notification')
export class FollowNotification extends LitElement {

    @state()
    public canDisplay : boolean = false;

    @property({'attribute' : "display-time", type: Number})
    public displayTime = 5;

    @property({'attribute' : "multi-follow-threshold", type: Number })
    public multiFollowThreshold = 5;


    private followers : string[] = [];

    private subscriptionToken? : PubSubJS.Token;

    public constructor() 
    {
        super();
        this.handleFollowEvent = this.handleFollowEvent.bind(this);
    }

    public render() {
        if (!this.canDisplay || this.followers.length === 0) {
            return "";
        } else if (this.followers.length > this.multiFollowThreshold) {
            return multiFollowTemplate(this.followers);
        }

        const nextFollow = this.followers.shift();

        if (!nextFollow) {
            return "";
        }

        return singleFollowTemplate(nextFollow);
    }

    public connectedCallback(): void {
        super.connectedCallback();
        
        this.subscriptionToken = subscribe(TwitchEventMessages.ChannelFollow, this.handleFollowEvent);
    }

    public disconnectedCallback(): void {
        if (this.subscriptionToken) {
            unsubscribe(this.subscriptionToken);
            this.subscriptionToken = undefined;
        }

        super.disconnectedCallback();
    }

    public handleFollowEvent<MessageName extends SystemMessageNames>(messageName : MessageName, incomingEvent : AppMessageSet[MessageName]) : void 
    {
        const followEvent = incomingEvent as AppMessageSet[typeof TwitchEventMessages.ChannelFollow];

        if (followEvent.name !== TwitchEventMessages.ChannelFollow) {
            // just being careful
            return;
        }

        this.followers.push(followEvent.user_name);
        this.canDisplay = true;
        this.requestUpdate();
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "follow-notification" : FollowNotification;
    }
}