import { html } from "lit";

export default (followers : string[], followMessage : string) => html`
<div class="overlay-event overlay-event__follow">
    <h1>${followMessage}</h1>
    <ul class="follower_list">
        ${followers.map((follower) => html`<li>${follower}</li>`)}
    </ul>
</div>
`;