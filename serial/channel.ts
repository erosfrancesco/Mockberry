import WebSocket from "ws";
import { Console, WSSubscribableMixin } from "../utils";
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

export class WSSerialChannel extends WSSubscribableMixin {
    constructor(ws: WebSocket) {
        super(ws);
        this.timingMs = 2000;
    }

    handleAction(payload: ISerialRequestData) {
        try {
            const { request } = payload;

            switch (request) {
                case SerialServiceActions.SUBSCRIBE:
                    Console('Subscription to serial channel');
                    this.handleSubscription(payload);
                    break;
                case SerialServiceActions.UNSUBSCRIBE:
                    Console('Unsubscription to serial channel');
                    this.handleUnsubscription(payload);
                    break;
                case SerialServiceActions.WRITECONFIG:
                    Console('Config write of serial channel');
                    this.handleSetConfig(payload);
                    break;
            }
        } catch (e) {
            Console('Error Serial Channel:', e);
        }
    };



    // on Subscription
    handleSubscription(payload: ISerialRequestData) {
        const { id } = payload;
        this.subscribe(id);
    }

    // on data fire
    fireSubscription(id: string) {
        Console(' Serial channel data', id)
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
        // TODO;
    }

}

export default WSSerialChannel;