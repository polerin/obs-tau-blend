import { html } from "lit";
import { map } from "lit/directives/map.js";
import { DebugContainer } from "./DebugContainer";

export default (subject : DebugContainer) => html`
<div class="overlay-persistant overlay-persistant__debug">
    <ul>
    ${map(subject.messages, (message) => html `<li>${message}</li>`)}
    </ul>
</div>
`;