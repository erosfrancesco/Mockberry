import { WebSocketEvent } from "../interfaces";
import { GpioServiceActions } from "./ws";


interface IGpioActionData {
    pin: number;
    id: string;
}

export interface IGpioSubscriptionRequestData {
    pin: number;
    id: string;
    request: GpioServiceActions;
}

//
export interface IGpioSubscriptionResponse extends WebSocketEvent {
    request: GpioServiceActions.SUBSCRIBE;
    data: IGpioActionData;
}

export interface IGpioUnsubscriptionResponse extends WebSocketEvent {
    request: GpioServiceActions.UNSUBSCRIBE;
    data: IGpioActionData;
}

export interface IGpioOutputResponse extends WebSocketEvent {
    request: GpioServiceActions.OUTPUT;
    data: IGpioActionData;
}