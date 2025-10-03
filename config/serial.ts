import { WebSocketEvent } from "../interfaces";
import { SerialServiceActions } from "./ws";

export interface ISerialChannelConfig {}

interface ISerialActionData {
  address: number;
  id: string;
  config: ISerialChannelConfig;
}

export interface ISerialSubscriptionRequestData {
  address: number;
  id: string;
  request: SerialServiceActions;
}

export interface ISerialSubscriptionResponse
  extends WebSocketEvent<ISerialActionData> {
  request: SerialServiceActions.SUBSCRIBE;
}

export interface ISerialUnsubscriptionResponse
  extends WebSocketEvent<ISerialActionData> {
  request: SerialServiceActions.UNSUBSCRIBE;
}

export interface ISerialDataResponse {
  address: number;
  id: string;
  data: any;
}
