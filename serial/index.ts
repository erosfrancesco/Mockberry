import { WebSocket } from "ws";
import { EventServiceType, ISerialSubscriptionRequestData, ISerialSubscriptionResponse, ISerialUnsubscriptionResponse, SerialServiceActions } from "../config/ws.ts";
import updateMockSerialConnection, { serial } from "./serial.ts";

export const serialService = (ws: WebSocket) => {
    ws.on('message', function (message) {
        const parsed = JSON.parse(message.toString());
        const { type } = parsed;

        if (type !== EventServiceType.serial) {
            return;
        }

        const { address, id, request } = parsed.data as ISerialSubscriptionRequestData;
        const config = serial[address];

        if (!config) {
            console.log('[MOCK]: Serial ' + address + ' not found on Board.')
            return;
        }

        const { subscribed, listening, ...serialConfig } = config;
        if (request === SerialServiceActions.SUBSCRIBE) {
            console.log('[MOCK]: Subscribe to Serial Address: ', address);
            if (!subscribed.has(id)) {
                subscribed.add(id);
                updateMockSerialConnection(address, (data) => ws.send(JSON.stringify({ type, ...data })));
            }

            const data = { address, id, config: serialConfig };
            const event: ISerialSubscriptionResponse = {
                type,
                request: SerialServiceActions.SUBSCRIBE,
                data
            };
            ws.send(JSON.stringify(event));
            return;
        }

        if (request === SerialServiceActions.UNSUBSCRIBE) {
            console.log('[MOCK]: Unsubscribe to Serial Address: ', address, id);
            if (subscribed.has(id)) {
                subscribed.delete(id);
                updateMockSerialConnection(address, (data) => ws.send(JSON.stringify({ type, ...data })));
            }

            const data = {
                address, id, config: serialConfig
            }
            const event: ISerialUnsubscriptionResponse = {
                type,
                request: SerialServiceActions.UNSUBSCRIBE,
                data
            };
            ws.send(JSON.stringify(event));
            return;
        }
    });
}

export default serialService;