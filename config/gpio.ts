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

export interface IGpioSubscriptionRequestData {
  pin: number;
  id: string;
  request: GpioServiceActions;
}

//
export interface IGpioSubscriptionResponse
  extends WebSocketEvent<IGpioActionData> {
  request: GpioServiceActions.SUBSCRIBE;
}

export interface IGpioUnsubscriptionResponse
  extends WebSocketEvent<IGpioActionData> {
  request: GpioServiceActions.UNSUBSCRIBE;
}

export interface IGpioOutputResponse extends WebSocketEvent<IGpioActionOutput> {
  request: GpioServiceActions.OUTPUT;
}
