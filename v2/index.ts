import { WebSocketServer } from "ws";
import { port, path } from "../config/ws.ts";
import WSPinout from "./pinout.ts";
import { WebSocketBridge } from "./utils.ts";
import WSCommand from "./command.ts";
import { PinTypes } from "../gpio/interface.ts";

const wss = new WebSocketServer({ path, port });
console.log('[MOCK] ready on localhost' + path + ':' + port);

wss.on('connection', function connection(ws) {
    const board = new WSBoard(ws);

    // handle events with board

    console.log('[MOCK] Client connected');
    ws.send('connected!');
});


class WSBoard extends WebSocketBridge {
    pinout = new WSPinout(this.ws, [{ pin: 4, type: PinTypes.INPUT }]);
    command = new WSCommand(this.ws);
};