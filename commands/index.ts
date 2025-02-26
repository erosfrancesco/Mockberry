import { WebSocket } from "ws";
import { EventServiceType, ICommandInputData, ICommandOutputResponse } from "../config/ws.ts";
import { handleCommandOutput } from "./handlers.ts";

export const commandService = (ws: WebSocket) => {
    ws.on('message', function (message) {
        const parsed = JSON.parse(message.toString());
        const { type } = parsed;

        if (type !== EventServiceType.command) {
            return;
        }

        handleCommandOutput(parsed.data as ICommandInputData, (data) => {
            const event: ICommandOutputResponse = { data, type };
            ws.send(JSON.stringify(event));
        });

    });
}

export default commandService;
