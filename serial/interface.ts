import { ISerialChannelConfig } from "../config/serial";
import { Subscribable, Intervallable } from "../interfaces";

interface SerialChannel extends Subscribable, Intervallable {
    config: ISerialChannelConfig;
}

export interface SerialBoard {
    [key: number]: SerialChannel
}