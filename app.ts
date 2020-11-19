import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import Controller from "./controller/controller";

const app: Application = express();
const port = 3000;

const controller = new Controller();
//
//Middleware
//

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(cors());
app.use(express.static("frontend", { etag: false }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "1mb" }));

let infoLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`A ${req.method}-request was made by ${req.ip}`);
  if (req.method === "PUT") {
    console.log(`Editing ${req.path} with new post: "${req.body.content}"`);
  }
  next();
};

app.use(infoLogger);

//
//Routes
//
app.get("/posts/", (req: Request, res: Response) => {
  res.send(controller.PostArr);
});

app.post("/posts/", (req: Request, res: Response) => {
  if (req.is("json") && req.body.content) {
    let newPost = controller.createNewPost(
      String(controller.PostArr.length + 1),
      req.body.content
    );
    res.send(controller.PostArr);
  } else {
    res.send("wrong format, only json allowed: {'content': 'msg'}");
  }
});

//
//Run
//
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
