import { WebSocketServer } from "ws";
import { port, path } from "./config/ws";

import commandService from "./commands/index";
import gpioService from "./gpio/index";
import serialService from "./serial/index";

const wss = new WebSocketServer({ path, port });
console.log('[MOCK] ready on localhost' + path + ':' + port);

wss.on('connection', function connection(ws) {
    commandService(ws);
    gpioService(ws);
    serialService(ws);

    console.log('[MOCK] Client connected');
    ws.send('connected!');
});
