import { ISerialDataResponse } from "../config/ws";
import { Observable } from "../interfaces";
import { SerialBoard } from "./interface";

// subscribed get set
export const serial: SerialBoard = {
    0x68: {
        subscribed: new Observable(new Set()), everyMs: 2000, config: {}
    }
};

/*
export const updateMockSerialConnection = (address: number, callback: (data: ISerialDataResponse) => void) => {
    const channel = serial[address];
    const { subscribed, everyMs, listening } = channel;

    if (!subscribed.value.size) {
        clearInterval(listening);
        return;
    }

    if (listening) {
        clearInterval(listening);
    }

    channel.listening = setInterval(() => subscribed.value.forEach((id) => callback(mockSerialData(id, address))), everyMs);
}
/** */

export const mockSerialData = (id: string, address: number) => {
    const data: ISerialDataResponse = { address, id, data: {} };
    return data;
}

// export default updateMockSerialConnection;