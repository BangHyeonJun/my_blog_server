import Post from "./Posts";
import Test from "./Tests";
import moment from "moment";
import "moment-timezone";

const resolvers = {
    Query: {
        post: () => {
            return Post.find({}); // 데이터베이스에서 특정 하나의 데이터 조회
        },

        test: () => {
            return Test.find({}); // TODO : 테스트를 진행하는 부분입니다, 빌드시 삭제해주세요
        }
    },

    Mutation: {
        insertPost: async (_, { category, title, content }) => {
            moment.tz.setDefault("Asia/Seoul");
            let now = moment().format("YYYY-MM-DD HH:mm:ss");
            let post = new Post({
                mainImg: {
                    path: "",
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
        },

        insertTest: async (_, { text }) => {
            let test = new Test({
                text
            });

            if (await test.save()) {
                return true;
            } else {
                return false;
            }
        }
    }
};

export default resolvers;
