import { EventServiceType, ICommandInputData, ICommandOutputResponse } from "../config/ws";
import { WebSocketBridge } from "./utils";

export class WSCommand extends WebSocketBridge {
    constructor(ws) {
        super(ws);

        ws.on('message', function (message) {
            const parsed = JSON.parse(message.toString());
            const { type, data } = parsed;

            if (type !== EventServiceType.command) {
                return;
            }

            const payload = data as ICommandInputData;

            const output = this.executeCommand(payload);
            const event: ICommandOutputResponse = { data: output, type };
            this.send(event);
        });
    }

    executeCommand(data: ICommandInputData): ICommandOutputResponse["data"] {
        const { folder } = data;
        const outputData: ICommandOutputResponse["data"] = { output: '[' + folder + ']: Output command', folder };

        return outputData;
    }
}

export default WSCommand;