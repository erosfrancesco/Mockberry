import { WebSocket } from "ws";
import { EventServiceType, ISerialSubscriptionRequestData, ISerialSubscriptionResponse, ISerialUnsubscriptionResponse, SerialServiceActions } from "../config/ws.ts";
import { serial } from "./serial.ts";
import { handleSubscribe, handleUnsubscribe } from "./handlers.ts";

export const serialService = (ws: WebSocket) => {
    ws.on('message', function (message) {
        const parsed = JSON.parse(message.toString());
        const { type } = parsed;

        if (type !== EventServiceType.serial) {
            return;
        }

        const { address, request } = parsed.data as ISerialSubscriptionRequestData;
        const channel = serial[address];

        if (!channel) {
            console.log('[MOCK]: Serial channel ' + address + ' not found on Board.')
            return;
        }

        if (request === SerialServiceActions.SUBSCRIBE) {
            handleSubscribe(parsed.data as ISerialSubscriptionRequestData, serial, (data) => {
                const event: ISerialSubscriptionResponse = {
                    type,
                    request: SerialServiceActions.SUBSCRIBE,
                    data
                };
                ws.send(JSON.stringify(event));
            });

            /*
            if (!subscribed.has(id)) {
                updateMockSerialConnection(address, (data) => ws.send(JSON.stringify({ type, ...data })));
            }
            /** */
            return;
        }

        if (request === SerialServiceActions.UNSUBSCRIBE) {
            handleUnsubscribe(parsed.data as ISerialSubscriptionRequestData, serial, (data) => {
                const event: ISerialUnsubscriptionResponse = {
                    type,
                    request: SerialServiceActions.UNSUBSCRIBE,
                    data
                };
                ws.send(JSON.stringify(event));
            });

            /*
            console.log('[MOCK]: Unsubscribe to Serial Address: ', address, id);
            if (subscribed.has(id)) {
                subscribed.delete(id);
                updateMockSerialConnection(address, (data) => ws.send(JSON.stringify({ type, ...data })));
            }

            const data = {
                address, id, config
            };
            const event: ISerialUnsubscriptionResponse = {
                type,
                request: SerialServiceActions.UNSUBSCRIBE,
                data
            };
            ws.send(JSON.stringify(event));
            /** */
            return;
        }
    });
}

export default serialService;