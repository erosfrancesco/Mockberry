import { WebSocketServer } from "ws";
import { port, path } from "./config/ws";
import { Intervallable, Subscribable } from "./utils";

// BE
const initialValue = 1;
const updateValue = (value: number) => {
  return value + 1;
};

const clockPin = new Intervallable(
  initialValue,
  1000,
  updateValue,
  (value, sub) => {
    console.log("[Notified]: " + sub + " - " + value);
  }
);

const commandShell = new Subscribable("", (value, sub) =>
  console.log("[Notified]: Shell output: " + sub + " - " + value)
);

// FE
const alarmWidget = {
  id: "Alarm-Widget",
};

const clockWidget = {
  id: "Clock-Widget",
};

const shellWidget = {
  id: "Shell-Widget",
  sendCommand: () => {
    setTimeout(() => {
      commandShell.value = "Folder: ./mock1.ts ./value.js";
    }, 2000);
  },
};

clockPin.subscribe(alarmWidget.id);
clockPin.subscribe(clockWidget.id);
commandShell.subscribe(shellWidget.id);

// For now it needs only this functionalities. WS integration will take care of everything else.

const wss = new WebSocketServer({ path, port });
console.log("[MOCK] Test ready on localhost" + path + ":" + port);

wss.on("connection", function connection() {
  console.log("[MOCK] Test. Close this task yourself");
});
