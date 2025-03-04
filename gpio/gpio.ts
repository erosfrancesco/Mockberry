import { WebSocket } from "ws";
import { EventServiceType, GpioServiceActions, IGpioOutputResponse, IGpioSubscriptionRequestData, IGpioSubscriptionResponse, IGpioUnsubscriptionResponse } from "../config/ws.ts";
import { Board } from "./interface.ts";
import { handlePinOutput, handleSubcribe, handleUnsubscribe } from "./handlers.ts";


export const gpioService = (ws: WebSocket, board: Board) => {
    ws.on('message', function (message) {
        const parsed = JSON.parse(message.toString());
        const { type } = parsed;

        if (!type.startsWith(EventServiceType.gpio)) {
            return;
        }

        const { pin, request } = parsed.data as IGpioSubscriptionRequestData;
        const gpio = board[pin];

        if (!gpio) {
            console.log('[MOCK]: Pin ' + pin + ' not found on Board.')
            return;
        }

        if (request === GpioServiceActions.SUBSCRIBE) {
            handleSubcribe(parsed.data as IGpioSubscriptionRequestData, board, (data) => {
                const event: IGpioSubscriptionResponse = { type, request: GpioServiceActions.SUBSCRIBE, data };
                ws.send(JSON.stringify(event));
            });

            handlePinOutput(parsed.data as IGpioSubscriptionRequestData, board, (data) => {
                const event: IGpioOutputResponse = { type, request: GpioServiceActions.OUTPUT, data };
                ws.send(JSON.stringify(event));
            });
            return;
        }

        if (request === GpioServiceActions.UNSUBSCRIBE) {
            handleUnsubscribe(parsed.data as IGpioSubscriptionRequestData, board, (data) => {
                const event: IGpioUnsubscriptionResponse = { type, request, data };
                ws.send(JSON.stringify(event));
            });
            return;
        }

        // TODO: - 
        if (request === GpioServiceActions.SETSTATUS) {
            return;
        }
    });
}

export default gpioService;