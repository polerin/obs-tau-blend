// External system status definition

export type ExternalConnectionStatus = {
    serviceName: string,
    status : "disconnected" | "connecting" | "connected" | "disconnecting",
    details : Record<string, string | number | boolean>
}
