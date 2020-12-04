import fileUpload from "express-fileupload";
import Post from "../models/post";
import axios from "axios";
import fs from "fs";

class Controller {
  PostArr: Post[];

  constructor(PostArr?: Post[]) {
    this.PostArr = PostArr || [];
  }

  // create some example Posts
  // attention! it deletes all old posts
  createExamplePosts() {
    let exPost1: Post = new Post("1", "hello");
    let exPost2: Post = new Post("2", "hello");
    let exPost3: Post = new Post("3", "hello");
    this.PostArr = [exPost1, exPost2, exPost3];
  }

  createNewPost(id: string, content: string): Post {
    let retVal = new Post(id, content);
    this.PostArr.push(retVal);
    return retVal;
  }

  storeFile(file: fileUpload.UploadedFile) {
    file.mv(`./uploads/${file.name}`);
  }

  sendPost(humanPost: Post, url: string) {
    axios
      .post(
        url,
        {
          content: humanPost.content,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  sendFile(humanPost: Post, url: string) {
    let formData = new FormData();
    fs.readFile("./uploads/testdatei.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      formData.append("file1", data);
    });
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export default Controller;
