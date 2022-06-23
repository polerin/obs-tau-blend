import { html } from "lit";
import { ControlElement } from "./ControlElement";

export default (subject : ControlElement) => html`
    <div class="overlay-persistant overlay-persistant__control">
        <h3>Controls</h3>
        <ul>
            <button @click=${subject.sendSceneRequest}>Change Scene</button>
        </ul>
    </div>
`;