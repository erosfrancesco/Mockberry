export * from './commands';
export * from './serial';
export * from './gpio';

// SERVICES
export enum EventServiceType {
    command = "CommandShell",
    gpio = "Gpio",
    chat = "Chat",
    serial = "Serial"
}

// ACTIONS
export enum SerialServiceActions {
    SUBSCRIBE = "Subscribe",
    UNSUBSCRIBE = "Unsubscribe",
    WRITECONFIG = "WriteConfig"
}

export enum GpioServiceActions {
    SUBSCRIBE = "Subscribe",
    UNSUBSCRIBE = "Unsubscribe",
    SETSTATUS = "SetStatus",
    OUTPUT = "Output"
}

// WS CONFIGS
export const path = "/";
export const port = 80;
