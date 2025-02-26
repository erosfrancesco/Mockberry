import { WebSocket } from "ws";
import { EventServiceType, ICommandInputData, ICommandOutputData, ICommandOutputResponse } from "./config/ws.ts";

export const commandService = (ws: WebSocket) => {
    ws.on('message', function (message) {
        const parsed = JSON.parse(message.toString());
        const { type } = parsed;

        if (type !== EventServiceType.command) {
            return;
        }

        const { folder } = parsed.data as ICommandInputData;
        const data: ICommandOutputData = { output: '[' + folder + ']: Output command', folder };
        const event: ICommandOutputResponse = { data, type };

        ws.send(JSON.stringify(event));
    });
}

export default commandService;
