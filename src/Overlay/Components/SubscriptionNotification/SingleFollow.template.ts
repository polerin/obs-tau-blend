import { html } from "lit";

export default (followName : string, followMessage : string) => html`
<div class="overlay-event overlay-event__follow">
    <h1>${followMessage}</h1>
    ${followName}
</div>
`;