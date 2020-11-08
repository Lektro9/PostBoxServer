import express from "express";
import bodyParser from "body-parser";
import posts from "./models/post.js";
import cors from "cors";

const app = express()
const port = 3000
console.log(cors);
//
//Middleware
//
app.use(cors());
app.use(express.static('frontend'))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let infoLogger = (req, res, next) => {
  console.log(`A ${req.method}-request was made by ${req.ip}`);
  if (req.method === "PUT") {
    console.log(`Editing ${req.path} with new post: "${req.body.content}"`)
  }
  next();
};

app.use(infoLogger);

//
//Routes
//
app.get('/posts/', (req, res) => {
  res.send(posts);
})

app.post('/posts/', (req, res) => {
  if (req.is("json") && req.body.content) {
    var newPost = {
      "id": String(posts.length + 1),
      "content": req.body.content
    }
    posts.push(newPost);
    res.send(posts);
  } else {
    res.send("wrong format, only json allowed");
  }
})

app.put('/posts/:id/', function (req, res) {
  if (req.is("json") && req.body.content) {
    var editPost = posts.find(p => p.id === req.params.id);
    editPost.content = req.body.content;
    res.send(posts);
  } else {
    res.send("wrong format, only json allowed");
  }
})

//
//Run
//
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})