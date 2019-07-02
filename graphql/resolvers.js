import Post from "./Posts";
import Test from "./Tests";
import Member from "./Members";
import moment from "moment";
import "moment-timezone";

/* 이미지 파일 저장용 */
const storeUpload = ({ stream, filename }) =>
    new Promise((resolve, reject) =>
        stream
            .pipe(createWriteStream(filename))
            .on("finish", () => resolve())
            .on("error", reject)
    );

const resolvers = {
    Query: {
        post: () => {
            return Post.find({}); // 데이터베이스에서 특정 하나의 데이터 조회
        },

        member: () => {
            return Member.find({});
        },

        getPost: (_, { id }) => {
            return Post.findById(id);
        },

        test: () => {
            return Test.find({}); // TODO : 테스트를 진행하는 부분입니다, 빌드시 삭제해주세요
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
        },

        insertMember: async (
            _,
            { avatar, userid, username, email, introduce, sns }
        ) => {
            return false;

            // moment.tz.setDefault("Asia/Seoul");
            // let now = moment().format("YYYY-MM-DD HH:mm:ss");
            // let post = new Post({
            //     mainImg: {
            //         path: "",
            //         width: 300,
            //         height: 300
            //     },
            //     category: "test",
            //     title,
            //     publish_date: now,
            //     content,
            //     comment: []
            // });

            // if (await post.save()) {
            //     return true;
            // } else {
            //     return false;
            // }
        },

        uploadFile: async (parent, { file }) => {
            console.log("들어옴??");
            const { stream, filename } = await file;
            await storeUpload({ stream, filename });
            return true;
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
