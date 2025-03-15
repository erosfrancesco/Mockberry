import WebSocket from "ws";
import { WSSubscribableMixin } from "./utils";
import { EventServiceType, ISerialRequestData, SerialServiceActions } from "../config/ws";

//
const mockSerialData = (): Object => {
    return {
        data: {
            accelX: 107,
            accelY: 3,
            accelZ: 4
        }
    }
}
//

class WSSerialChannel extends WSSubscribableMixin {
    constructor(ws: WebSocket) {
        super(ws);
        this.timingMs = 2000;
    }

    handleAction(payload: ISerialRequestData) {
        try {
            const { request } = payload;

            switch (request) {
                case SerialServiceActions.SUBSCRIBE:
                    this.handleSubscription(payload);
                    break;
                case SerialServiceActions.UNSUBSCRIBE:
                    this.handleUnsubscription(payload);
                    break;
                case SerialServiceActions.WRITECONFIG:
                    this.handleSetConfig(payload);
                    break;
            }
        } catch (e) {
            console.log("[MOCK] Error Serial Channel:", e);
        }
    };

    // on Subscription
    handleSubscription(payload: ISerialRequestData) {
        const { id } = payload;
        this.subscribe(id);
    }
    // on data fire
    fireSubscription(id: string) {
        const data = mockSerialData();
        if (data) {
            this.send({ id, data, type: EventServiceType.serial });
        }
    }

    // on Unsubscription
    handleUnsubscription(payload: ISerialRequestData) {
        const { id } = payload;
        this.unsubscribe(id);
    }

    // on SetWrite
    handleSetConfig(payload: ISerialRequestData) {
        const { id } = payload;
        console.log('write configs')
    }

}


export class WSSerial extends WSSubscribableMixin {
    channels: { [key: string]: WSSerialChannel } = {};

    constructor(ws: WebSocket) {
        super(ws);
        this.channels[0x68] = new WSSerialChannel(this.ws);

        // WSCommand Websocket bridging
        this.ws.on('message', (message) => {
            try {
                const parsed = JSON.parse(message.toString());
                const { type, data } = parsed;

                if (type !== EventServiceType.serial) {
                    return;
                }

                const payload = data as ISerialRequestData;
                const { address } = payload;
                this.channels[address].handleAction(payload);
            } catch (e) {
                console.log("[MOCK] Error Serial:", e);
            }

        });
    }
}

export default WSSerial;