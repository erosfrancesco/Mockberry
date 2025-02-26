import { WebSocket } from "ws";
import { EventServiceType, GpioServiceActions, IGpioOutputResponse, IGpioSubscriptionRequestData, IGpioSubscriptionResponse, IGpioUnsubscriptionResponse } from "../config/ws.ts";
import { Board, PinTypes } from "./interface.ts";
import { mockPinOutput } from "./index.ts";


export const gpioService = (ws: WebSocket, board: Board) => {
    ws.on('message', function (message) {
        const parsed = JSON.parse(message.toString());
        const { type } = parsed;

        if (!type.startsWith(EventServiceType.gpio)) {
            return;
        }

        const { pin, id, request } = parsed.data as IGpioSubscriptionRequestData;
        const gpio = board[pin];

        if (!gpio) {
            console.log('[MOCK]: Pin ' + pin + ' not found on Board.')
            return;
        }
        const { status, subscribed } = gpio;

        if (request === GpioServiceActions.SUBSCRIBE) {
            console.log('[MOCK]: Subscribe to pin: ', pin);
            if (!subscribed.has(id)) {
                subscribed.add(id);
            }

            if (gpio.status !== PinTypes.INPUT) {
                gpio.listening = mockPinOutput(pin, (pinData) => {
                    const data = { status, pin, data: pinData, id };
                    const event: IGpioOutputResponse = { type, request: GpioServiceActions.OUTPUT, data };
                    ws.send(JSON.stringify(event));
                });
            }

            const data = { status, pin, id };
            const event: IGpioSubscriptionResponse = { type, request, data };
            ws.send(JSON.stringify(event));
        }

        if (request === GpioServiceActions.UNSUBSCRIBE) {
            console.log('[MOCK]: Unsubscribe to pin: ', pin);
            if (subscribed.has(id)) {
                subscribed.delete(id);
            }

            clearInterval(gpio.listening);

            const data = { status, pin, id };
            const event: IGpioUnsubscriptionResponse = { type, request, data };
            ws.send(JSON.stringify(event));
            return;
        }

        // TODO: - 
        if (request === GpioServiceActions.SETSTATUS) {
            return;
        }
    });
}

export default gpioService;