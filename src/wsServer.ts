import { WebSocketServer, WebSocket } from "ws";
import http from "http";

let server: any;
const clients: any = {};

export function createWS() {
  if (server) return server;

  server = http.createServer();
  const wss = new WebSocketServer({ server });
  const wsport = process.env.WSPORT || 7778;

  server.listen(wsport, () => {
    console.log(`Websocket Server Running on port: ${wsport}`);
  });

  wss.on("connection", (connection) => {
    console.log("New client connected");
    const id = Math.random().toString(36).substr(2, 5);
    clients[id] = connection;

    console.log(`Client ${id} connected`);
  });
}

export async function sendWSMessage(message: any) {
  if (!server) return;

  const data = JSON.stringify(message);

  console.log("clients", clients);
  for (const id in clients) {
    const client = clients[id];
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  }
}
