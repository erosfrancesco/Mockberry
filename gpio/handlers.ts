import { IGpioOutputResponse, IGpioStatusRequestData, IGpioSubscriptionRequestData, IGpioSubscriptionResponse, IGpioUnsubscriptionResponse } from "../config/ws.ts";
import { Board, PinTypes } from "./interface.ts";
import { mockPinOutput } from "./index.ts";


export const handleSubcribe = (data: IGpioSubscriptionRequestData, board: Board, callback: (data: IGpioSubscriptionResponse["data"]) => void) => {
    const { pin, id } = data;
    const gpio = board[pin];
    const { status, subscribed } = gpio;

    console.log('[MOCK]: Subscribe to pin: ', pin);
    if (!subscribed.value.has(id)) {
        subscribed.value.add(id);
    }

    const eventData: IGpioSubscriptionResponse["data"] = { status, pin, id };
    callback(eventData)
}

export const handlePinOutput = (data: IGpioSubscriptionRequestData, board: Board, callback: (data: IGpioOutputResponse["data"]) => void) => {
    const { pin, id } = data;
    const gpio = board[pin];
    const { status } = gpio;

    console.log('[MOCK]: Output of pin: ', pin);
    if (gpio.status === PinTypes.OUTPUT) {
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
    if (subscribed.value.has(id)) {
        subscribed.value.delete(id);
    }

    clearInterval(gpio.listening);

    const eventData: IGpioUnsubscriptionResponse["data"] = { status, pin, id };
    callback(eventData);
}

export const handleStatusChange = (data: IGpioStatusRequestData, board: Board, callback: () => void) => {
    const { pin, id, status } = data;
    const gpio = board[pin];
    const { status: oldStatus, subscribed } = gpio;

    console.log('[MOCK]: Change pin status: ', pin);
    
    if (oldStatus === PinTypes.OUTPUT || oldStatus === PinTypes.SERVO) {
        clearInterval(gpio.listening);
    }

    board[pin].status = status;
    if (status === PinTypes.OUTPUT || status === PinTypes.SERVO) {
        clearInterval(gpio.listening);
    }

    callback();
}