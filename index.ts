import { WebSocketServer } from "ws";
import { port, path } from "./config/ws.ts";
import { WebSocketBridge, Console } from "./utils.ts";

import WSPinout from "./board/pinout.ts";
import WSCommand from "./command.ts";
import WSSerial from "./serial/serial.ts";

const wss = new WebSocketServer({ path, port });
Console('Ready on localhost' + path + ':' + port);

wss.on('connection', function connection(ws) {
    const _board = new WSBoard(ws);

    Console('Client connected');
    ws.send('connected!');
});

class WSBoard extends WebSocketBridge {
    i2c = new WSSerial(this.ws);
    pinout = WSPinout(this.ws);
    command = new WSCommand(this.ws);
};