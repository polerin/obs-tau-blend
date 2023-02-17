import { customElement, property } from "lit/decorators.js";
import { ref, Ref, createRef } from "lit/directives/ref.js";
import { html, LitElement } from "lit";


@customElement("blend-video")
export default class BlendVideo extends LitElement 
{
  @property()
  public src!: string;

  @property()
  public type: string = 'video/mp4';

  private observer?: IntersectionObserver;
  private videoRef: Ref<HTMLVideoElement> = createRef();

  
  public connectedCallback() {
    console.log("wat");
    super.connectedCallback();
    
    this.observer = new IntersectionObserver(this.visibilityChange);
  }

  public disconnectedCallback(): void {
    console.log('wwwwwwwwwwwwwwwwat?"');
    this.observer?.disconnect();
    
    super.disconnectedCallback();
  }

  protected firstUpdated(): void {
    if (this.observer === undefined) {
      console.error("in first updated, observer not set");

      return;
    }

    if (!this.videoRef.value) {
      console.error("in first updated no value?");
    
      return;
    }

    this.observer.observe(this.videoRef.value);
  }

  protected render() {
    return html`<video ${ref(this.videoRef)} src="${this.src}" type="${this.type}" autoplay preload></video>`;
  }

  private visibilityChange = (entries: IntersectionObserverEntry[]): void => {
    const video = this.videoRef.value;

    if (!video) {
      return;
    }
    
    // intersecting === visible 
    if (!entries[0]?.isIntersecting) {
      // video.play();
    } else {
      // video.pause();
      video.currentTime = 0;
    }
  }

}

declare global {
  interface HTMLElementTagNameMap {
    "blend-video": BlendVideo;
  }
}
