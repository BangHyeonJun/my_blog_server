import { GraphQLServer } from "graphql-yoga";
import typeDefs from "./graphql/typeDefs";
import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import auth from "./graphql/middleware/auth";
import dotenv from "dotenv";
import ms from "ms";

// .env 파일
dotenv.config();

const PORT = process.env.PORT || 4000;

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://admin:admin123@ds044907.mlab.com:44907/blog", {
    useNewUrlParser: true
});
mongoose.connection.once("open", () => {
    console.log("MongoDB Connected...");
});

const opts = {
    port: process.env.PORT || 4000,
    endpoint: "/blog",
    cors: {
        credentials: true,
        origin: ["http://localhost:3000"] // your frontend url.
    }
};

// context
const context = req => {
    return {
        req: req.request
    };
};

const server = new GraphQLServer({ schema: typeDefs, context: context });

// 정적 이미지를 사용하기 위해서 적어놓음
server.express.use("./blog/statics", express.static("statics"));

// 인증을 위한 부분
server.express.use(auth);

server.start(opts, () => console.log(`http://localhost:${PORT}`));

// auth를 위해서 적어놓음
// server.express.use((req, res) => {
//     console.log("auth 들어옴??");
//     if (req.method === "POST") {
//         const token = createJWT(req.body.email, req.body.password);
//         if (token) {
//             res.get(200).json({ token });
//         } else {
//             res.status(403).json({
//                 //no token - invalid credentials
//                 message: "Login failed! Invalid credentials!"
//             });
//         }
//     }
// });

// server.express.use((req, res, next) => {
//     console.log("auth 들어옴?2");
//     const token = req.headers["authorization"];
//     try {
//         req.user = decodeJWT(token);
//         next();
//     } catch (e) {
//         res.status(401).json({
//             //unauthorized token
//             message: e.message
//         });
//     }
// });
