import { PinTypes } from "../gpio/interface.ts";
import { WebSocketBridge, WSSubscribableMixin } from "./utils.ts";

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


class WSGpio extends WSSubscribableMixin {
    constructor(ws, { type, timingMs }: IPinSettings) {
        super(ws);
        this.type = type;

        if (type === PinTypes.OUTPUT || type === PinTypes.SERVO) {
            this.timingMs = timingMs || 1000;
        }
    }

    subscriptionEvent(id: string) {
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

interface IPinSettings {
    type: PinTypes;
    timingMs?: number;
}

interface IPinGenerator extends IPinSettings {
    pin: number;
}

export class WSPinout extends WebSocketBridge {
    constructor(ws, pinsGenerator: IPinGenerator[]) {
        super(ws);

        pinsGenerator.forEach((pinGen) => {
            const { pin, type, timingMs } = pinGen;
            const gpio = new WSGpio(this.ws, { type, timingMs });
            this.pinout[pin] = gpio;
        });
    }

    pinout: { [key: string]: WSGpio } = {};

    setPin(pin: number, { type, timingMs }: IPinSettings) {
        const gpio = this.pinout[pin];
        if (!gpio) {
            return;
        }

        this.pinout[pin].type = type || gpio.type;
        this.pinout[pin].timingMs = timingMs || gpio.timingMs;
    }
};

export default WSPinout;
