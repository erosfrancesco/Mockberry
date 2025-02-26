import { WebSocketServer } from "ws";
import { port, path } from "./config/ws.ts";

import commandService from "./commands.ts";
import gpioService from "./gpio";
import serialService from "./serial";

const wss = new WebSocketServer({ path, port });
console.log('[MOCK] ready on localhost' + path + ':' + port);

wss.on('connection', function connection(ws) {
    commandService(ws);
    gpioService(ws);
    serialService(ws);

    console.log('[MOCK] Client connected');
    ws.send('connected!');
});
