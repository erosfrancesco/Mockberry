import { WebSocket } from "ws";
import {
  EventServiceType,
  ICommandInputData,
  ICommandOutputResponse,
} from "../config/ws.ts";
import { handleCommandOutput } from "./handlers.ts";
import { mockCommandOutput } from "./index.ts";

export const commandService = (ws: WebSocket) => {
  ws.on("message", function (message) {
    const parsed = JSON.parse(message.toString());
    const { type } = parsed;

    if (type !== EventServiceType.command) {
      return;
    }

    const input = parsed.data as ICommandInputData;

    handleCommandOutput(input, () => {
      const data = mockCommandOutput(input);
      const event: ICommandOutputResponse = { data, type };
      ws.send(JSON.stringify(event));
    });
  });
};

export default commandService;
