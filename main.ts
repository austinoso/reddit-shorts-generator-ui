import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import videoRouter from "./src/routes/video.route";
import { connectMongo } from "./src/database/database";
import { createWS } from "./src/wsServer";

const app: Express = express();
const port = process.env.PORT || 7777;

connectMongo();
createWS();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/videos", videoRouter);

app.use(express.static("client/dist"));
app.use("/files", express.static("output"));

app.listen(port, () => {
  console.log(`Reddit Shorts Bot Running on http://localhost:${port}`);
});
