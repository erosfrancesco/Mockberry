import { EventServiceType, GpioServiceActions, SerialServiceActions } from "./config/ws";

export interface Subscribable {
    subscribed: Set<string>;
}

export interface Intervallable {
    listening?: NodeJS.Timeout;
    everyMs?: number;
}

export interface WebSocketEvent {
    type: EventServiceType | string;
    request?: SerialServiceActions | GpioServiceActions;
    data: any;
};

// 
export type SendWebSocketEvent = (event: WebSocketEvent) => void;

export interface IWSWidget {
    send: (data: any) => void;
    events: MessageEvent<any>[];
    isReady: Boolean;
}