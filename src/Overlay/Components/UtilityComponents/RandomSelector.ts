import { customElement, property, queryAll, queryAssignedElements, state } from "lit/decorators.js";
import { html, LitElement } from "lit";
import { VisibilityNotifyingController, IVisibilityAwareComponent } from "#overlay/Shared/index";

@customElement("random-selector")
export default class RandomSelector extends LitElement implements IVisibilityAwareComponent
{
    @queryAssignedElements()
    private selectionChoices!: NodeListOf<HTMLElement>;

    @property()
    public isVisible: boolean = false;

    public controller = new VisibilityNotifyingController(this);

    protected override render() {
        return html`<slot></slot>`;
    }

    protected updated() {
        console.log("in updated", this.controller.isVisible);
        const choices = this.selectionChoices;

        console.log()
        if (choices.length === 0) {
            return;
        }

        const selectedIndex = Math.floor(Math.random() * choices.length);

        choices.forEach((choiceElement, choiceIndex) => {
            if (choiceIndex === selectedIndex) {
                choiceElement.removeAttribute('hidden');
                return;
            }

            choiceElement.setAttribute('hidden', 'true');
        })

    }
}

declare global {
    interface HTMLElementTagNameMap {
      "random-selector": RandomSelector;
    }
  }
  