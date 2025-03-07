import { PinTypes } from "../gpio/interface";
import { WebSocketEvent } from "../interfaces";
import { GpioServiceActions } from "./ws";


interface IGpioActionData {
    pin: number;
    id: string;
    status: PinTypes;
}

interface IGpioActionOutput extends IGpioActionData {
    data: any;
}

//
export interface IGpioActionRequestData {
    pin: number;
    id: string;
    request: GpioServiceActions;
}

export interface IGpioSubscriptionRequestData extends IGpioActionRequestData { }
export interface IGpioUnsubscriptionRequestData extends IGpioActionRequestData { }
export interface IGpioStatusRequestData extends IGpioActionRequestData {
    status: PinTypes;
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
    data: IGpioActionOutput;
}

export interface IGpioStatusResponse extends WebSocketEvent {
    request: GpioServiceActions.SETSTATUS;
    data: IGpioActionData;
}