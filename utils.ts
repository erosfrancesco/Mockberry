import { WebSocket } from "ws";
import { EventServiceType, GpioServiceActions, SerialServiceActions } from "./config/ws";

// Interfaces
export interface WebSocketEvent {
    type: EventServiceType | string;
    request?: SerialServiceActions | GpioServiceActions;
    data: any;
};

// Classes
export class WebSocketBridge {
    constructor(ws: WebSocket) {
        this.ws = ws;
    }

    ws: WebSocket;
    send(data: any) {
        this.ws.send(JSON.stringify(data));
    }
}

export class Subscribable {
    subscriptions = new Set<string>();

    subscribe(id: string) {
        this.subscriptions.add(id);
    }

    unsubscribe(id: string) {
        this.subscriptions.delete(id);
    }
}

export class SubscriptionEvents extends Subscribable {

    fireSubscription(id: string) { }

    listener: NodeJS.Timeout;

    private _timingMs: number;
    get timingMs() {
        return this._timingMs;
    }

    set timingMs(v: number) {
        this._timingMs = v;

        if (this.timingMs) {
            this.listener = setInterval(() => this.subscriptions.forEach((id) => this.fireSubscription(id)), this.timingMs);
        } else {
            clearInterval(this.listener);
        }
    }

    subscribe(id: string) {
        super.subscribe(id);

        // fire event refresh
        this.timingMs = this.timingMs;
    }

    unsubscribe(id: string) {
        super.unsubscribe(id);

        if (!this.subscriptions.size) {
            clearInterval(this.listener);
        }
    }
}

export class WSSubscribableMixin extends SubscriptionEvents implements WebSocketBridge {
    constructor(ws: WebSocket) {
        super();
        this.ws = ws;
    }

    ws: WebSocket;
    send(data: any) {
        this.ws.send(JSON.stringify(data));
    }
}


// Functions
export const Console = (...args) => console.log('[MOCK]:', ...args);