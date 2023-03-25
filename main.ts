import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import videoRouter from "./src/routes/video.route";

const app: Express = express();
const port = process.env.PORT || 7777;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/video", videoRouter);

app.listen(port, () => {
  console.log(`Reddit Shorts Bot Running on http://localhost:${port}`);
});
