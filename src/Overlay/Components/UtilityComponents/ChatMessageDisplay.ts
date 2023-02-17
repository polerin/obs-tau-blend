import { customElement, property, state } from "lit/decorators.js";
import { html, LitElement } from "lit";

import {
  ChatMessage, TwitchUser,
} from "#shared";
import { stripHtml } from "#shared/Utility/dataCleaning";

@customElement("chat-message-display")
export default class ChatMessageDisplay extends LitElement 
{

  @property()
  public fromUser!: TwitchUser;

  @property()
  public contents!: string;

  public render() {
    return html`<div class="chat-message">
        <span class="chat-user">${this.fromUser.userName}</span>
        <span class="chat-text">${stripHtml(this.contents)}</span>
      </div>`;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    "chat-message-display": ChatMessageDisplay;
  }
}
