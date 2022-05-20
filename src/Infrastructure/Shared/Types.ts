export type ControlMessage = {
    type : 'controlMessage',
    label : string,
    data : any
};

export type ControlMessageOrEvent = ControlMessage | Event;

export type ControlRequest = {
    type : 'controlRequest',
    label : string,
    data : any
}


// Overlay Component related

export type ComponentDefinition = {
    elementName: string,
    sourcePath: string
    element?: HTMLElement | null | undefined,
};

// definition of a callback for the component
export type ComponentCallback = {
    messageName : string,
    callback : Function
};