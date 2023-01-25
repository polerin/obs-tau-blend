import {customElement, state, property} from 'lit/decorators.js';
import { TypedPubSubBus } from "#infra";
import { IOverlayComponent, isSystemMessage } from "#shared";
import { OverlayComponentType } from "#overlay/Shared/Types";
import AbstractOverlayComponent from "#overlay/Components/AbstractOverlayComponent";
import elementTemplate from '#overlay/Components/DebugContainer/DebugContainer.template';


@customElement('debug-container')
export default class DebugContainer extends AbstractOverlayComponent
{
    public readonly componentType: OverlayComponentType = 'persistant';

    @state()
    protected messages : Array<string> = [];

    @property({attribute: "max-messages", type : Number})
    public maxMessages = 10;

    public registerCallbacks(eventBus: TypedPubSubBus): void {
        super.registerCallbacks(eventBus);
        this.registerCallback('*', this.handleMessageReceived);
    }
 
    protected render ()
    { 
        return elementTemplate({messages: this.messages});
    }

    protected handleMessageReceived = (messageName: string, message: unknown) => {
        if (!isSystemMessage(message)) {
            this.addMessage(`Non-system message: ${messageName}: ${JSON.stringify(message)}`);
            return;
        }

        this.addMessage(JSON.stringify(message));
    }

    protected addMessage(message : string) : void
    {
        this.messages.unshift(message);

        // setter to the state triggers refresh
        this.messages = this.messages.slice(0, this.maxMessages);
    }
}
