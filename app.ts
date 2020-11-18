import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import Post from "./models/post";

const app: Application = express();
const port = 3000;

// some example Posts
let exPost1: Post = new Post("1", "hello");
let exPost2: Post = new Post("2", "hello");
let exPost3: Post = new Post("3", "hello");
let PostArr: Post[] = [exPost1, exPost2, exPost3];
//
//Middleware
//

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(cors());
app.use(express.static("frontend"));

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
  res.send(PostArr);
});

app.post("/posts/", (req: Request, res: Response) => {
  if (req.is("json") && req.body.content) {
    let newPost = new Post(String(PostArr.length + 1), req.body.content);
    PostArr.push(newPost);
    res.send(PostArr);
  } else {
    res.send("wrong format, only json allowed");
  }
});

app.put("/posts/:id/", function (req: Request, res: Response) {
  if (req.is("json") && req.body.content) {
    let editPost = PostArr.find((p) => p.id === req.params.id);
    if (typeof editPost !== "undefined") {
      editPost.content = req.body.content;
      res.send(PostArr);
    } else {
      res.send("you send empty content, please check");
    }
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
