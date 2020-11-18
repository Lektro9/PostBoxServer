class Post {
  id: string;
  content: string;

  constructor(id?: string, content?: string) {
    this.id = id || '-1';
    this.content = content || 'not content';
  }

  showPost() {
    return `PostID: ${this.id} and it's content: ${this.content}`;
  }
}

export default Post;
