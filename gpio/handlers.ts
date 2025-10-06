import {
  IGpioOutputResponse,
  IGpioSubscriptionRequestData,
  IGpioSubscriptionResponse,
  IGpioUnsubscriptionResponse,
} from "../config/ws.ts";
import { Board, PinTypes } from "./interface.ts";

export const handleSubscribe = (
  data: IGpioSubscriptionRequestData,
  board: Board,
  callback: (data: IGpioSubscriptionResponse["data"]) => void
) => {
  const { pin, id } = data;
  const gpio = board[pin];
  const { status } = gpio;

  console.log("[MOCK]: Subscribe to pin: ", pin);
  gpio.subscribe(id);

  const eventData: IGpioSubscriptionResponse["data"] = { status, pin, id };
  callback(eventData);
};

export const handlePinOutput = (
  data: IGpioSubscriptionRequestData,
  board: Board,
  callback: (data: IGpioOutputResponse["data"]) => void
) => {
  const { pin, id } = data;
  const gpio = board[pin];
  const { status } = gpio;

  console.log("[MOCK]: Output of pin: ", pin);
  if (gpio.status === PinTypes.OUTPUT) {
    const eventData: IGpioOutputResponse["data"] = {
      status,
      pin,
      data: gpio.value,
      id,
    };
    callback(eventData);
  }
};

export const handleUnsubscribe = (
  data: IGpioSubscriptionRequestData,
  board: Board,
  callback: (data: IGpioUnsubscriptionResponse["data"]) => void
) => {
  const { pin, id } = data;
  const gpio = board[pin];
  const { status } = gpio;

  console.log("[MOCK]: Unsubscribe to pin: ", pin);
  gpio.unsubscribe(id);

  const eventData: IGpioUnsubscriptionResponse["data"] = { status, pin, id };
  callback(eventData);
};
