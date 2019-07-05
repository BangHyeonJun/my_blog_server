import Post from "./postSchema";
import moment from "moment";
import "moment-timezone";

export default {
    Query: {
        post: () => {
            return Post.find({}); // 데이터베이스에서 특정 하나의 데이터 조회
        },

        getPost: (_, { id }) => {
            console.log(id);
            return Post.findById(id);
        }
    },

    Mutation: {
        insertPost: async (_, { title, content }) => {
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
