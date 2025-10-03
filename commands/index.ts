import { ICommandInputData, ICommandOutputResponse } from "../config/ws.ts";
import commandService from "./service.ts";

export const mockCommandOutput = (
  data: ICommandInputData
): ICommandOutputResponse["data"] => {
  const { folder } = data;
  const outputData: ICommandOutputResponse["data"] = {
    output: "[" + folder + "]: Output command",
    folder,
  };
  return outputData;
};

export default commandService;
