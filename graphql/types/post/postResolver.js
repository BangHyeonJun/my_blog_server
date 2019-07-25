import Post from "./postSchema";
import moment from "moment";
import "moment-timezone";

export default {
    Query: {
        getPosts: async () => {
            return await Post.find({});
        },

        post: async () => {
            return await Post.find({}); // 데이터베이스에서 특정 하나의 데이터 조회
        },

        getPost: (_, { id }) => {
            return Post.findById(id);
        }
    },

    Mutation: {
        insertPost: async (_, { title, writer, mainImg, content }) => {
            moment.tz.setDefault("Asia/Seoul");
            let now = moment().format("YYYY-MM-DD HH:mm:ss");
            let post = new Post({
                mainImg: {
                    path: "",
                    width: 300,
                    height: 300
                },
                category: "test",
                title,
                publish_date: now,
                content,
                comment: []
            });

            if (await post.save()) {
                return true;
            } else {
                return false;
            }
        }
    }
};
