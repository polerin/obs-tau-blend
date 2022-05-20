
// @see https://rjzaworski.com/2021/06/event-target-with-typescript
class TypedEventTarget<EventDef extends { type: any }> extends EventTarget {
    public dispatchEvent(e: Event & EventDef): boolean {
      return super.dispatchEvent(e);
    }
  
    public dispatch(e: EventDef): boolean {
      const event = Object.assign(new Event(e.type), e);
      return this.dispatchEvent(event);
    }
  
    public addEventListener<
      T extends EventDef['type'],
      E extends EventDef & { type: T }
    >(
      type: T,
      listener: EventListenerOrEventListenerObject)
    {
      super.addEventListener(type, listener);
    }
  
    public removeEventListener(type: EventDef['type']) {
      super.removeEventListener(type, null)
    }
  }