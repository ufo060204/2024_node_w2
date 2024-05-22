const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Content 未填寫"], // 必填，並顯示錯誤訊息
    },
    image: {
      type: String,
      default: "", // 預設值
    },
    createdAt: {
      type: Date,
      default: Date.now(), // 預設值，使用 Date.now() 來取得目前時間
      select: false, // 不顯示，例如密碼
    },
    name: {
      type: String,
      required: [true, "貼文姓名未填寫"],
    },
    likes: {
      type: Number,
      default: 0, // 預設值，按讚數 0
    },
  },
  {
    versionKey: false, // 不顯示 __v
  }
);
// 此行關鍵，將 schema 轉換為 model，產生一個集合 (collection) 名稱為 posts
// mongoose 會自動將集合名稱轉為複數，例如 Post -> posts
// 建立時用單數去建立即可
const Post = mongoose.model("Post", postSchema);
// const init = async () => {
//   const AllPost = await Post.find();
//   console.log(AllPost);
// };
// init();

module.exports = Post;