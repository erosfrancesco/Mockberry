import { WebSocket } from "ws";
import { Board, PinOutput, PinTypes } from "./interface.ts";
import { gpioService } from './gpio.ts';
import { Observable } from "../interfaces.ts";


export const mockPinOutput = (pin: number, callback: (data: any) => void) => {
    const gpio = board[pin] as PinOutput;
    if (!gpio) {
        return;
    }

    return setInterval(() => {
        const r = Math.random();
        const max = 100;
        const min = 10;
        const data = Math.floor(((max - min) * r) + min);
        gpio.data = data;

        callback(gpio.data);
    }, 2000);
};


export const board: Board = {
    4: {
        status: PinTypes.INPUT,
        subscribed: new Observable(new Set())
    },
    12: {
        status: PinTypes.OUTPUT,
        subscribed: new Observable(new Set()),
        data: 37,
    },
    16: {
        status: PinTypes.SERVO,
        subscribed: new Observable(new Set()),
        currentData: { hello: "World", fuck: "You World" }
    }
};

export const boardService = (ws: WebSocket) => gpioService(ws, board);

export default boardService;