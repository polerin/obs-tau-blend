// External system status definition

export type ExternalConnectionStatus = {
    status : "disconnected" | "connecting" | "connected" | "disconnecting",
    details : Record<string, string | number | boolean>
}
