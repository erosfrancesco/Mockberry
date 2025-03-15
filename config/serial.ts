import { WebSocketEvent } from "../utils";
import { SerialServiceActions } from "./ws";

export interface ISerialChannelConfig {

}

interface ISerialActionData {
    address: number;
    id: string;
    config: ISerialChannelConfig;
}

export interface ISerialRequestData {
    address: number;
    id: string;
    request: SerialServiceActions;
}


export interface ISerialSubscriptionResponse extends WebSocketEvent {
    request: SerialServiceActions.SUBSCRIBE;
    data: ISerialActionData;
}

export interface ISerialUnsubscriptionResponse extends WebSocketEvent {
    request: SerialServiceActions.UNSUBSCRIBE;
    data: ISerialActionData;
}

export interface ISerialDataResponse {
    address: number;
    id: string;
    data: any;
}