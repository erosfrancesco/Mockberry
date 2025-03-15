import WebSocket from "ws";
import { Console, WSSubscribableMixin } from "../utils";
import { EventServiceType, ISerialRequestData } from "../config/ws";
import { WSSerialChannel } from './channel';


export class WSSerial extends WSSubscribableMixin {
    channels: { [key: string]: WSSerialChannel } = {};

    constructor(ws: WebSocket) {
        super(ws);
        this.channels[0x68] = new WSSerialChannel(this.ws);

        // WSCommand Websocket bridging
        this.ws.on('message', (message) => {
            try {
                const parsed = JSON.parse(message.toString());
                const { type, data } = parsed;

                if (type !== EventServiceType.serial) {
                    return;
                }

                const payload = data as ISerialRequestData;
                const { address } = payload;
                this.channels[address].handleAction(payload);
            } catch (e) {
                Console('Error Serial:', e);
            }

        });
    }
}

export default WSSerial;