import Post from "./postSchema";
import moment from "moment";
import "moment-timezone";

export default {
    Query: {
        getPosts: async () => {
            return await Post.find({});
        },

        getPost: async (_, { id }) => {
            console.log(await Post.findById(id));
            return await Post.findById(id);
        }
    },

    Mutation: {
        insertPost: async (
            _,
            { userID, mainImg, hashtag, title, content, html }
        ) => {
            moment.tz.setDefault("Asia/Seoul");
            let now = moment().format("YYYY-MM-DD HH:mm:ss");
            let post = new Post({
                writer: userID,
                mainImg: mainImg,
                hashtag: hashtag,
                title: title,
                publish_date: now,
                content: content,
                html: html,
                comment: new Array()
            });

            if (await post.save()) {
                return true;
            } else {
                return false;
            }
        }
    }
};
