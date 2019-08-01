import Post from "./postSchema";
import moment from "moment";
import "moment-timezone";

import fs from "fs";
import Jimp from "jimp";

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
            const mainImg = await file;
            const { filename, mimetype, encoding, createReadStream } = mainImg;

            let test = createReadStream(filename);
            console.log(test);

            // fs.writeFile(filename, mainImg, "binary", function(err) {
            //     if (err) throw err;
            //     console.log("File saved.");
            //     console.log(filename);

            //     Jimp.read(filename, function(err, image) {
            //         console.log(image);

            //         if (err) throw err;
            //         image
            //             .resize(256, 256) // resize
            //             .quality(60) // set JPEG quality
            //             .greyscale() // set greyscale
            //             .write("lena-small-bw.jpg"); // save
            //     });
            // });

            const returnFile = { filename, mimetype, encoding };
            return returnFile;
        }
    }
};
