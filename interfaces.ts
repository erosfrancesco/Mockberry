import { EventServiceType, GpioServiceActions, SerialServiceActions } from "./config/ws";

export class Observable<T> {
    constructor(public initialValue: T, callback: Function = () => {}) {
        this.callback = callback;
        this.value = initialValue;
    }

    callback: Function;
    private _value!: T;

    set value(v: T) {
        this._value = v;
        if (this.callback) {
            this.callback(v);
        }
    }

    get value() {
        return this._value
    }
}


export interface Subscribable {
    subscribed: Observable<Set<string>>
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