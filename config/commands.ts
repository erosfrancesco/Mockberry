import { EventServiceType } from "./ws";
import { WebSocketEvent } from "../utils";

export interface ICommandInputData {
    folder: IShellWidgetUIProps["folder"];
    command: string;
}

export interface ICommandOutputData {
    folder: IShellWidgetUIProps["folder"];
    output: string;
}

export interface IShellWidgetUIProps {
    folder?: string;
    events: MessageEvent<ICommandOutputData>[];
}

export interface ICommandOutputResponse extends WebSocketEvent {
    data: ICommandOutputData;
    type: EventServiceType.command;
}
