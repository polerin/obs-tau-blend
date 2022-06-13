import { html } from "lit";

export default (followName : String) => html`
<div class="overlay-event overlay-event__follow">
    ${followName}
</div>
`;