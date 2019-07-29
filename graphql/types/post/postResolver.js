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
        insertPost: async (_, { userID, hashtag, title, text, html }) => {
            // TODO : 메인 이미지 작업 진행해야함

            moment.tz.setDefault("Asia/Seoul");
            let now = moment().format("YYYY-MM-DD HH:mm:ss");
            let post = new Post({
                writer: userID,
                mainImg: "test",
                hashtag: hashtag,
                title: title,
                publish_date: now,
                text: text,
                html: html,
                comment: new Array()
            });

            if (await post.save()) {
                return true;
            } else {
                return false;
            }
        },

        UploadMainImg: async (obj, { file }) => {
            const { filename, mimetype, encoding } = await file;
            console.log("file : ", await file);
            console.log("filename : ", filename);
            console.log("minetype : ", mimetype);
            console.log("encoding : ", encoding);

            const returnFile = { filename, mimetype, encoding };
            return returnFile;
        }
    }
};
