import { EventServiceType } from "./ws";
import { IWSWidget, WebSocketEvent } from "../interfaces";

export interface ICommandInput {
    folder: string;
    command: string;
}

export interface ICommandOutput {
    folder: string;
    output: string;
}

export interface IShellWidgetUIProps extends IWSWidget {
    folder?: ICommandInput["folder"];
    events: MessageEvent<ICommandOutput>[];
}

export interface ISendCommand extends WebSocketEvent {
    data: ICommandOutput;
    type: EventServiceType.command;
}