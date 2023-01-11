import { LitElement } from "lit";
import {customElement, state, property} from 'lit/decorators.js';
import elementTemplate from './DebugContainer.template';


@customElement('debug-container')
export class DebugContainer extends LitElement
{
    @state()
    protected messages : Array<string> = [];

    @property({attribute: "max-messages", type : Number})
    public maxMessages = 10;

    public addMessage(message : string) : void
    {
        this.messages.unshift(message);

        // setter to the state triggers refresh
        this.messages = this.messages.slice(0, this.maxMessages);
    }

    public render ()
    { 
        return elementTemplate({messages: this.messages});
    }
}
