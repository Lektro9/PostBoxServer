import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import Controller from "./controller/controller";
import fileUpload from "express-fileupload";

const app: Application = express();
const port = 3000;

const controller = new Controller();
controller.createExamplePosts();
//
//Middleware
//

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 499, // limit each IP to 499 requests per windowMs
});
app.use(limiter);

app.use(cors());

app.use(express.static("frontend", { etag: false }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "1mb" }));

let infoLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`A ${req.method}-request was made by ${req.ip}`);
  next();
};

let holidayGreetings = {
  message: "hello from the dasdsadsadsa"
}

app.use(infoLogger);

//
//Routes
//
app.get("/api/chat", (req: Request, res: Response) => {
  res.send(controller.PostArr);
});

app.get("/message", (req: Request, res: Response) => {
  res.send(holidayGreetings);
});

app.post("/message", (req: Request, res: Response) => {
  holidayGreetings.message = req.body.message;
  res.send(holidayGreetings);
});

//
//Run
//
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
