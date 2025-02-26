import { IGpioOutputResponse, IGpioSubscriptionRequestData, IGpioSubscriptionResponse, IGpioUnsubscriptionResponse } from "../config/ws.ts";
import { Board, PinTypes } from "./interface.ts";
import { mockPinOutput } from "./index.ts";


export const handleSubcribe = (data: IGpioSubscriptionRequestData, board: Board, callback: (data: IGpioSubscriptionResponse["data"]) => void) => {
    const { pin, id } = data;
    const gpio = board[pin];
    const { status, subscribed } = gpio;

    console.log('[MOCK]: Subscribe to pin: ', pin);
    if (!subscribed.has(id)) {
        subscribed.add(id);
    }

    const eventData: IGpioSubscriptionResponse["data"] = { status, pin, id };
    callback(eventData)
}

export const handlePinInput = (data: IGpioSubscriptionRequestData, board: Board, callback: (data: IGpioOutputResponse["data"]) => void) => {
    const { pin, id } = data;
    const gpio = board[pin];
    const { status } = gpio;

    if (gpio.status !== PinTypes.INPUT) {
        gpio.listening = mockPinOutput(pin, (pinData) => {
            const eventData: IGpioOutputResponse["data"] = { status, pin, data: pinData, id };
            callback(eventData);
        });
    }
}

export const handleUnsubscribe = (data: IGpioSubscriptionRequestData, board: Board, callback: (data: IGpioUnsubscriptionResponse["data"]) => void) => {
    const { pin, id } = data;
    const gpio = board[pin];
    const { status, subscribed } = gpio;

    console.log('[MOCK]: Unsubscribe to pin: ', pin);
    if (subscribed.has(id)) {
        subscribed.delete(id);
    }

    clearInterval(gpio.listening);

    const eventData: IGpioUnsubscriptionResponse["data"] = { status, pin, id };
    callback(eventData);
}