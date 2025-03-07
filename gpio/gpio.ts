import { WebSocket } from "ws";
import {
    EventServiceType, GpioServiceActions, IGpioOutputResponse,
    IGpioActionRequestData, IGpioSubscriptionRequestData, IGpioUnsubscriptionRequestData, IGpioStatusRequestData,
    IGpioSubscriptionResponse, IGpioUnsubscriptionResponse, IGpioStatusResponse
} from "../config/ws.ts";
import { Board } from "./interface.ts";
import { handlePinOutput, handleSubcribe, handleUnsubscribe, handleStatusChange } from "./handlers.ts";


export const gpioService = (ws: WebSocket, board: Board) => {
    ws.on('message', function (message) {
        const parsed = JSON.parse(message.toString());
        const { type } = parsed;

        if (!type.startsWith(EventServiceType.gpio)) {
            return;
        }

        const { pin, request } = parsed.data as IGpioActionRequestData;
        const gpio = board[pin];

        if (!gpio) {
            console.log('[MOCK]: Pin ' + pin + ' not found on Board.')
            return;
        }

        if (request === GpioServiceActions.SUBSCRIBE) {
            const payload = parsed.data as IGpioSubscriptionRequestData;

            handleSubcribe(payload, board, (data) => {
                const event: IGpioSubscriptionResponse = { type, request: GpioServiceActions.SUBSCRIBE, data };
                ws.send(JSON.stringify(event));
            });

            handlePinOutput(payload, board, (data) => {
                const event: IGpioOutputResponse = { type, request: GpioServiceActions.OUTPUT, data };
                ws.send(JSON.stringify(event));
            });
            return;
        }

        if (request === GpioServiceActions.UNSUBSCRIBE) {
            const payload = parsed.data as IGpioUnsubscriptionRequestData;

            handleUnsubscribe(payload, board, (data) => {
                const event: IGpioUnsubscriptionResponse = { type, request, data };
                ws.send(JSON.stringify(event));
            });
            return;
        }

        // TODO: - 
        if (request === GpioServiceActions.SETSTATUS) {
            const payload = parsed.data as IGpioStatusRequestData;

            handleStatusChange(payload, board, () => {
                const event: IGpioStatusResponse = { type, request, data: { pin, id, status } };
                ws.send(JSON.stringify(event));
            });
            return;
        }
    });
}

export default gpioService;