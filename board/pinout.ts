import { WebSocketBridge } from "../utils.ts";
import { WSGpio, IPinSettings, PinTypes } from './gpio.ts';

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

export default (ws) => new WSPinout(ws, [{ pin: 4, type: PinTypes.INPUT }]);;
