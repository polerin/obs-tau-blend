import { ReactiveController } from "lit";
import { isVisibilityAwareComponent } from "#overlay/Shared/typeGuards/index";
import { IVisibilityAwareComponent } from "#overlay/Shared/interfaces/index";

export class VisibilityNotifyingController implements ReactiveController {

    private observer?: IntersectionObserver;

    private _isVisible = false;
    public get isVisible(): boolean {
        return this._isVisible;
    }

    public constructor(private host: IVisibilityAwareComponent) {
        if (isVisibilityAwareComponent(this.host)) {
            console.log("spinning up observer")
            this.observer = new IntersectionObserver(this.visibilityChange);
            this.observer.observe(this.host);
        }
    }

    public hostConnected(): void {
    }

    hostDisconnected(): void {
        if (!this.observer) {
            return;
        }

        this.observer.disconnect();
    }


  private visibilityChange = (entries: IntersectionObserverEntry[]): void => {
    this._isVisible = !!(entries[0]?.isIntersecting)
    this.host.isVisible = this._isVisible;

    console.log("Determined visiblity", this._isVisible);
  }
}
