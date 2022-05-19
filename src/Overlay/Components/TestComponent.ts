import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('test-component')
export class TestComponent extends LitElement 
{
    @property()
    name? : string = "Testy";

    render () {
        return html`<p>Testing ${this.name}!</p>`;
    }
}