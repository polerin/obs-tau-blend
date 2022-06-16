import { html } from "lit";
import { map } from "lit/directives/map.js";
import { DebugContainer } from "./DebugContainer";

export default (subject : any) => html`
<div class="overlay-persistant overlay-persistant__debug">
    <h3>Debug log</h3>
    <ul>
    ${map(subject.messages.slice(0).reverse() || [], (message) => html `<li>${message}</li>`)}
    </ul>
</div>
`;