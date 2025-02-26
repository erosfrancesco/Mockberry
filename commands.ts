import { WebSocket } from "ws";
import { EventServiceType, ICommandOutput, ISendCommand } from "./config/ws.ts";


export const commandService = (ws: WebSocket) => {
    ws.on('message', function (message) {
        const parsed = JSON.parse(message.toString());
        const { type, folder } = parsed;

        if (type !== EventServiceType.command) {
            return;
        }

        const data: ICommandOutput = { output: '[' + folder + ']: Output command', folder };
        const event: ISendCommand = { data, type };

        ws.send(JSON.stringify(event));
    });
}

export default commandService;
