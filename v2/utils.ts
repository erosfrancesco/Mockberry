import { WebSocket } from "ws";

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

    subscriptionEvent(id: string, value2: string, subscriptions: Set<string>) { }

    listener: NodeJS.Timeout;

    private _timingMs: number;
    get timingMs() {
        return this._timingMs;
    }

    set timingMs(v: number) {
        this._timingMs = v;

        if (this.timingMs) {
            this.listener = setInterval(() => this.subscriptions.forEach(this.subscriptionEvent), this.timingMs);
        } else {
            clearInterval(this.listener);
        }
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

