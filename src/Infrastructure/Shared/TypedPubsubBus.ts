import { Omnibus } from "@hypersphere/omnibus";

import {SystemMessageByName, SystemMessages } from "Shared/MessageHandling";

type SystemMessageSet = {
  [messageName in keyof SystemMessages]: [SystemMessageByName<messageName>];
};

/**
 * Singleton facade to enforce typing for pubsub.js calls
 * 
 * !!! This is a sneaky singleton because of the way pubsub is structured
 */
export default class TypedPubSubBus extends Omnibus<SystemMessageSet> {
  public publish = this.trigger;
  public subscribe = this.on;
  public unsubscribe = this.off;
  public unsubscribeAll = this.offAll;
}
