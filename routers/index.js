const headers = require("../service/headers");

const postsControllers = require("../controllers/posts");
const httpControllers = require("../controllers/http");

const routers = async (req, res) => {
  const { url, method } = req;
  console.log(method, url);
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  if (url === "/posts" && method == "GET") {
    postsControllers.getPosts({ req, res });
  } else if (url === "/posts" && method == "POST") {
    req.on("end", async () => await postsControllers.createdPosts({ body, req, res }));
  } else if (url === "/posts" && method === "DELETE") {
    postsControllers.deletePosts({ req, res });
  } else if (url.startsWith("/posts/") && method == "DELETE") {
    postsControllers.deletePost({ req, res });
  } else if (url.startsWith("/posts/") && method == "PATCH") {
    req.on("end", async () => await postsControllers.updatePost({ body, req, res }));
  } else if (method == "OPTIONS") {
    httpControllers.cors(req, res);
  } else {
    httpControllers.notFound(req, res);
  }
};

module.exports = routers;
