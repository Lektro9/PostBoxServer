import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import Controller from "./controller/controller";
import fileUpload from "express-fileupload";

const app: Application = express();
const port = 3000;

const friendUrl = "http://localhost:3000/api/chat/botpost";

const controller = new Controller();
controller.createExamplePosts();
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

app.use(
  fileUpload({
    limits: { fileSize: 1 * 1024 * 1024 },
  })
);

//
//Routes
//
app.get("/api/chat", (req: Request, res: Response) => {
  res.send(controller.PostArr);
});

app.post("/api/chat/botpost", (req: Request, res: Response) => {
  if (req.is("json") && req.body.content) {
    let newPost = controller.createNewPost(
      String(controller.PostArr.length + 1),
      req.body.content
    );
    res.send(controller.PostArr);
  }
});

app.post("/api/chat", (req: Request, res: Response) => {
  if (req.is("json") && req.body.content) {
    let newPost = controller.createNewPost(
      String(controller.PostArr.length + 1),
      req.body.content
    );
    controller.sendPost(newPost, friendUrl);
    res.send(controller.PostArr);
  } else if (typeof req.files !== "undefined") {
    controller.storeFile(req.files.file1);
    let newPost = controller.createNewPost(
      String(controller.PostArr.length + 1),
      req.files.file1.name
    );
    res.send(controller.PostArr);
  } else {
    res.send(
      "wrong format, only json allowed: {'content': 'msg'}, or upload a file"
    );
  }
});

//
//Run
//
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
