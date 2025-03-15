import { ISerialRequestData, ISerialSubscriptionResponse, ISerialUnsubscriptionResponse } from "../config/ws.ts";
import { SerialBoard } from "./interface.ts";

export const handleSubscribe = (data: ISerialRequestData, serial: SerialBoard, callback: (data: ISerialSubscriptionResponse["data"]) => void) => {
    const { address, id } = data as ISerialRequestData;
    const channel = serial[address];
    const { subscribed, listening, ...config } = channel;

    console.log('[MOCK]: Subscribe to Serial Address: ', address);
    if (!subscribed.value.has(id)) {
        subscribed.value.add(id);
        // updateMockSerialConnection(address, (data) => ws.send(JSON.stringify({ type, ...data })));
    }

    const eventData = { address, id, config };
    callback(eventData);
}

export const handleUnsubscribe = (data: ISerialRequestData, serial: SerialBoard, callback: (data: ISerialUnsubscriptionResponse["data"]) => void) => {
    const { address, id } = data as ISerialRequestData;
    const config = serial[address];
    const { subscribed, listening } = config;

    console.log('[MOCK]: Unsubscribe to Serial Address: ', address, id);
    if (subscribed.value.has(id)) {
        subscribed.value.delete(id);
        // updateMockSerialConnection(address, (data) => ws.send(JSON.stringify({ type, ...data })));
    }

    const eventData = { address, id, config };
    callback(eventData);
}