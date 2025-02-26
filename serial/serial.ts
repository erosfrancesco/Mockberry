import { ISerialDataResponse } from "../config/ws";
import { SerialBoard } from "./interface";

export const serial: SerialBoard = {
    0x68: { subscribed: new Set(), everyMs: 2000, config: {} }
};

export const updateMockSerialConnection = (address: number, callback: (data: ISerialDataResponse) => void) => {
    const channel = serial[address];
    const { subscribed, everyMs, listening } = channel;

    if (!subscribed.size) {
        clearInterval(listening);
        return;
    }

    if (listening) {
        clearInterval(listening);
    }

    channel.listening = setInterval(() => subscribed.forEach((id) => callback(mockSerialData(id, address))), everyMs);
}

export const mockSerialData = (id: string, address: number) => {
    const data: ISerialDataResponse = { address, id, data: {} };
    return data;
}

export default updateMockSerialConnection;