import Member from "./memberSchema";

export default {
    Query: {
        getMember: async (_, { id }) => {
            console.log(id);
            return await Member.findById(id);
        },

        checkMember: async (_, { email, password }) => {
            return await Member.findOne({ email, password });
        }
    }

    // Mutation: {
    //     // insertMember: async (
    //     //     _,
    //     //     { avatar, userid, username, email, introduce, sns }
    //     // ) => {
    //     //     return false;
    //     //     // moment.tz.setDefault("Asia/Seoul");
    //     //     // let now = moment().format("YYYY-MM-DD HH:mm:ss");
    //     //     // let post = new Post({
    //     //     //     mainImg: {
    //     //     //         path: "",
    //     //     //         width: 300,
    //     //     //         height: 300
    //     //     //     },
    //     //     //     category: "test",
    //     //     //     title,
    //     //     //     publish_date: now,
    //     //     //     content,
    //     //     //     comment: []
    //     //     // });
    //     //     // if (await post.save()) {
    //     //     //     return true;
    //     //     // } else {
    //     //     //     return false;
    //     //     // }
    //     // }
    // }
};
