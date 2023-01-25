import { html } from "lit";

export default (subject : any) => html`
    <div class="overlay-persistant overlay-persistant__control">
        <h3>Controls</h3>
        <ul>
            <button @click=${subject.sendSceneRequest}>Change Scene</button>
        </ul>
    </div>
`;