const handleError = require("../service/handleError");
const handleSuccess = require("../service/handleSuccess");
const Posts = require("../models/post.js");

const posts = {
  async getPosts({ req, res }) {
    const allPosts = await Posts.find();
    handleSuccess(res, allPosts);
    res.end();
  },
  async createdPosts({ body, req, res }) {
    try {
        const data = JSON.parse(body);
        if (data.content && data.name && data.tags && data.type) {
          const newPost = await Posts.create({
            name: data.name,
            content: data.content.trim(), // 去除字串前後空白
            tags: data.tags,
            type: data.type,
          });
          handleSuccess(res, newPost);
          res.end();
        } else {
          handleError(res);
        }
      } catch (err) {
        handleError(res, err);
      }
  },
  async deletePosts({ req, res }) {
    try {
      await Posts.deleteMany();
      handleSuccess(res);
      res.end();
    } catch (err) {
      handleError(res, err);
    }
  },
  async deletePost({ req, res }) {
    try {
      const id = req.url.split("/").pop();
      await Posts.findByIdAndDelete(id);
      handleSuccess(res);
      res.end();
    } catch (err) {
      handleError(res, err);
    }
  },
  async updatePost({ body, req, res }) {
    try {
      const id = req.url.split("/").pop();
      // console.log(id);
      const data = JSON.parse(body);
      console.log(data);
      if (data.content) {
        const updatePost = await Posts.findByIdAndUpdate(id, {
          name: data.name,
          content: data.content.trim(), // 去除字串前後空白
          tags: data.tags,
          type: data.type,
          image: data.image || ""
        });
        handleSuccess(res, updatePost);
        res.end();
      } else {
        handleError(res);
      }
    } catch (err) {
      handleError(res, err);
    }
  },

}

module.exports = posts;