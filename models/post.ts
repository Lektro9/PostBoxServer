class Post {
  id: string;
  content: string;
  date: number;

  constructor(id?: string, content?: string) {
    this.id = id || "-1";
    this.content = content || "not content";
    this.date = new Date().getTime();
  }

  showPost() {
    return `PostID: ${this.id} and it's content: ${this.content}`;
  }
}

export default Post;
