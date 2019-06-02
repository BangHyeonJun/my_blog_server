import Post from "./Posts";
import moment from "moment";
import "moment-timezone";

const resolvers = {
    Query: {
        post: () => {
            return Post.find({}); // 데이터베이스에서 특정 하나의 데이터 조회
        }
    },

    Mutation: {
        insertPost: async (_, { category, title, content }) => {
            moment.tz.setDefault("Asia/Seoul");
            let now = moment().format("YYYY-MM-DD HH:mm:ss");
            let post = new Post({
                mainImg: {
                    path: "/statics/img/no_image.png",
                    width: 300,
                    height: 300
                },
                category,
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

export default resolvers;
