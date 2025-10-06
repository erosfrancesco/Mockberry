import { WebSocket } from "ws";
import { Board, PinInput, PinOutput, PinServo, PinTypes } from "./interface.ts";
import { gpioService } from "./service.ts";

const mockRandomPinValue = (previous: number): number => {
  const r = Math.random();
  const max = 10;
  const min = -10;
  const data = Math.floor((max - min) * r + min);
  return data + previous;
};

export const mockBoard: Board = {
  4: new PinInput(1),
  12: new PinOutput(37, 2000, mockRandomPinValue),
  16: new PinServo({ hello: "World", fuck: "You World" }),
};

export const boardService = (ws: WebSocket) => gpioService(ws, mockBoard);

export default boardService;
