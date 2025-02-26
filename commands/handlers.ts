import { ICommandInputData, ICommandOutputResponse } from "../config/ws.ts";

export const handleCommandOutput = (data: ICommandInputData, callback: (data: ICommandOutputResponse["data"]) => void) => {
    const { folder } = data;
    const outputData: ICommandOutputResponse["data"] = { output: '[' + folder + ']: Output command', folder };
    callback(outputData);
}
