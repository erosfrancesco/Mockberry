import { EventServiceType } from "./ws";
import { IWSWidget, WebSocketEvent } from "../interfaces";

export interface ICommandInputData {
    folder: IShellWidgetUIProps["folder"];
    command: string;
}

export interface ICommandOutputData {
    folder: IShellWidgetUIProps["folder"];
    output: string;
    // TODO: - User
}

export interface IShellWidgetUIProps extends IWSWidget {
    folder?: string;
    events: MessageEvent<ICommandOutputData>[];
}

export interface ICommandOutputResponse extends WebSocketEvent<ICommandOutputData> {
    type: EventServiceType.command;
}