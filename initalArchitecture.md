
# Main Responsibilities

* Main control logic:
  * Housed in a SharedWorker in order to prevent race conditions as different overlays load
  * This SharedWorker (aka `Control`) WILL be responsible for maintaining overall application state
  * `Control` MUST set up and maintain external service connections (e.g. the websockets to both the TAU and host OBS)
  * `Control` WILL dispatch (maybe after transforming) messages from either source on its port to listening `OverlayControllers`
  * `Control` MUST coordinate `Activity Slots`

* Overlays/Alerts
  * Visuals that are displayed to the user WILL be in one of a collective of browser sources
  * The individual browser source WILL load up the `OverlayController` app entry point, which will use a supplied configuration to then dynamically load the correct display modules.
  * The individual display modules SHOULD be web components.  The `OverlayController` WILL be responsible for passing messages from Control to the web components
  * To avoid multiple `OverlayContainers` displaying content at the same time (if not desired), the `OverlayController` SHOULD request an `Activity Slot` from `Control`, with an estimated duration.  This MUST be a cancellable grant, and WILL auto expire after duration + buffer if it has not been completed prior.
  * `OverlayControllers` may decide to act without an `Activity Slot`, as their display should not be impeaded by stream events.
  * Before an `OverlayController` takes any action (including requesting an `Activity Slot`), it SHOULD check if it is currently active.


# Open questions

* Message transformation from TAU/obs-websocket before transmission to subscribed `OverlayControllers` ?
* General message format (allowing for different message types?)
* Reacting to hotkeys?
* Should `Activity Slots` be in a priority queue?
* How can `Control` cancel a previously granted `Activity Slot`?
* How can an `OverlayController` notify `Control` that it completed it's activity prior to the `Activity Slot` duration?
* SharedWorker port vs BroadcastChannel?  Probably BroadcastChannel?
