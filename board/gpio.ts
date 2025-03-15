import { WebSocket } from "ws";
import { WSSubscribableMixin } from "../utils.ts";

export enum PinTypes {
    INPUT = "input",
    OUTPUT = "output",
    SERVO = "servo"
}

export interface IPinSettings {
    type: PinTypes;
    timingMs?: number;
}


//
const mockPinData = (wsGpio: WSGpio): Object | undefined => {
    const { type: status } = wsGpio;

    if (status === PinTypes.OUTPUT) {
        return { data: 56 };
    }

    if (status === PinTypes.SERVO) {
        return {
            data: {
                accelX: 107,
                accelY: 3,
                accelZ: 4
            }
        }
    }
}
//


export class WSGpio extends WSSubscribableMixin {
    constructor(ws: WebSocket, { type, timingMs }: IPinSettings) {
        super(ws);
        this.type = type;

        if (type === PinTypes.OUTPUT || type === PinTypes.SERVO) {
            this.timingMs = timingMs || 1000;
        }
    }

    fireSubscription(id: string) {
        const data = mockPinData(this);
        if (data) {
            this.send({ id, data });
        }
    }

    private _type;
    get type() {
        return this.type;
    }

    set type(v: PinTypes) {
        this._type = v;

        if (v === PinTypes.INPUT) {
            clearInterval(this.listener);
        } else {
            this.timingMs = this.timingMs || 1000;
        }
    }
}

export default WSGpio;