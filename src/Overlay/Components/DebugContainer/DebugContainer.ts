import { ControlMessage } from "Infrastructure/Shared/Types";
import { LitElement } from "lit";
import {customElement, state} from 'lit/decorators.js';
import elementTemplate from './DebugContainer.template';


@customElement('debug-container')
export class DebugContainer extends LitElement
{
    @state()
    public messages : Array<string> = [];

    public addMessage(message : string | ControlMessage) : void {
        let messageString: string;

        if ((message as ControlMessage).type) {
            let cast : ControlMessage = <ControlMessage>message;
            messageString = `${cast.type} : ${cast.label} : ${JSON.stringify(cast.data)}`;
        } else {
            messageString = <string>message;
        }

        this.messages.unshift(messageString);
        this.requestUpdate();
    }

    public render () { 

        return elementTemplate(this);
    }
}