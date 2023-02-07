import _ from "lodash";
import { DebugContainer } from "#overlay/Components/index";
import {
  AppOverlay,
  IOverlayComponent,
  SystemMessageNames,
  SystemMessage,
  isSystemMessage,
} from "#shared";
import { IControlWorker } from "#infra/Interfaces/index";
import TypedPubSubBus from "#infra/Shared/TypedPubsubBus";
import AbstractController from "#infra/Controllers/AbstractController";

export default class OverlayController extends AbstractController {
  private defaultOptions: object = {
    targetSelector: ".overlay-container",
    debugSelector: "debug-container",
    componentMaps: {},
  };

  private options: any = {};
  private container?: HTMLElement;
  private debugContainer?: DebugContainer;

  constructor(
    private controlWorker: IControlWorker,
    eventBus: TypedPubSubBus
  ) {
    super(eventBus);

    this.startControlWorker();
  }

  public async init(options: object = {}) {
    this.options = { ...this.defaultOptions, ...options };

    this.locateElements();
    this.connectContainerComponents(this.container);

    // Not using typed subscribe so we can say "gimmie everything"
    this.eventBus.subscribe("*", this.busMessageHandler);

    this.controlWorker.sendMessage(AppOverlay.OverlayOnline, {
      type: "controlMessage",
      name: AppOverlay.OverlayOnline,
    });
  }

  protected locateElements() {
    this.container = window.document.querySelector(this.options.targetSelector);
    this.debugContainer = window.document.querySelector(
      this.options.debugSelector
    );
  }

  protected connectContainerComponents(container: HTMLElement | undefined | null): void {

    if (container === undefined || container === null) {
      console.warn("Overlay: Attempting to connect a container while it is undefined or null");
      return;
    }

    container.childNodes.forEach(this.connectComponent);
  }

  protected connectComponent = (component: ChildNode) : void => {
    const overlayComponent = (<unknown>component) as IOverlayComponent;
    if (!overlayComponent.componentType || !overlayComponent.registerCallbacks) {
      return;
    }

    overlayComponent.registerCallbacks(this.eventBus);
  }

  protected startControlWorker(): void {
    console.debug("Overlay: Starting control worker");
    this.controlWorker.setCallback(this.portMessageHandler);
    this.controlWorker.connect();
  }

  /**
   * Handler for all bus messages,
   */
  protected busMessageHandler = (
    messageName: SystemMessageNames,
    message: SystemMessage
  ): void => {
    if (!isSystemMessage(message) || message.name !== messageName) {
      console.warn("Overlay: received non-system bus message");
      return;
    }

    if (message.source && message.source === "Port") {
      console.debug(`Overlay: Skipping port message (${messageName})`);
      // don't echo port messages back to the port
      return;
    }

    console.debug(`Overlay: dispatching message (${messageName})`)
    this.controlWorker.sendMessage(messageName, message);
  }
}
