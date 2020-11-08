new Vue({
  el: "#app",
  data: {
    posts: "",
    url: "https://code.shmiede.de/proxy/3000/posts/",
    newPost: ""
  },
  methods: {
    getRequest() {
      axios.get(this.url).then((response) => {
        this.posts = response.data;
        this.posts.reverse();
      });
    },
    postRequest() {
      axios
        .post(this.url, {
          content: this.newPost
        })
        .then((response) => {
          this.posts = response.data;
          this.posts.reverse();
          this.newPost = "";
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    putRequest() {
      axios.put(this.url, {
        content: this.newPost
      }).then((response) => {
        this.posts = response.data;
        this.posts.reverse();
        this.newPost = ""
      });
    }
  },
  mounted() {
    this.getRequest();
  }
});