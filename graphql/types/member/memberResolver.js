import Member from "./memberSchema";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import createJWT from "../../middleware/createJWT";
import decodeJWT from "../../middleware/decodeJWT";

const data = {};

export default {
    Query: {
        getMember: async (_, { id }) => {
            return await Member.findById(id);
        },

        test: async (_, { token }) => {
            const test = await decodeJWT(token);
            return test;
        },

        isLogin: (parent, args, context) => {
            return context.user.email;
            typeof req.session.user !== "undefined";
        }
    },

    Mutation: {
        signup: async (parent, { username, pwd }, ctx) => {
            if (data[username]) {
                throw new Error("Another User with same username exists.");
            }

            data[username] = {
                pwd: await bcrypt.hashSync(pwd, 10)
            };

            return true;
        },
        login: async (parent, { username, pwd }, { req }) => {
            const user = data[username];
            if (user) {
                if (await bcrypt.compareSync(pwd, user.pwd)) {
                    return createJWT(username, pwd);
                }

                throw new Error("Incorrect password.");
            }

            throw new Error("No Such User exists.");
        }
    }
};

// 참고
// https://blog.pusher.com/handling-authentication-in-graphql-jwt/
// me: async (_, args, { member }) => {
//     return {
//         ok: true,
//         member,
//         error: null
//     };

// if (!member) {
//     throw new Error("인증을 하지 않았습니다.");
// }

// return await Member.findById(member.id);

// Mutation: {
//     // login: async (_, { email, password }) => {
//     //     const member = await Member.findOne({ email, password });
//     //     if (!member) {
//     //         throw new Error("이메일과 비밀번호가 올바르지 않습니다.");
//     //     }
//     //     // const valid = await bcrypt.compare(password, user.password)
//     //     return jsonwebtoken.sign(
//     //         { id: member._id, email: member.email },
//     //         "somereallylongsecretkey",
//     //         { expiresIn: "1min" }
//     //     );
//     // }
// }

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
