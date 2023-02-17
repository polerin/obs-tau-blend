import { ReactiveControllerHost } from "lit";

export default interface IVisibilityAwareComponent extends ReactiveControllerHost, HTMLElement {
    set isVisible(visibility: boolean);
    get isVisible(): boolean;
}