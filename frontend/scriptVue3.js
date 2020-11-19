new Vue({
  el: "#app",
  data: {
    posts: "",
    url: "https://postbox.shmiede.de/posts",
    newPost: ""
  },
  created: function() {
    console.log("Starting connection to WebSocket Server")
    this.connection = new WebSocket("wss://postbox.shmiede.de/")

    this.connection.onmessage = function(event) {
      console.log(event);
    }

    this.connection.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }

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