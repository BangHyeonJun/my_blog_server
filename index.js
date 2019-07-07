import { GraphQLServer } from "graphql-yoga";
import express from "express";
import typeDefs from "./graphql/typeDefs";
import mongoose from "mongoose";

const PORT = process.env.PORT || 4000;

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://admin:admin123@ds044907.mlab.com:44907/blog", {
    useNewUrlParser: true
});
mongoose.connection.once("open", () => {
    console.log("MongoDB Connected...");
});

const server = new GraphQLServer({ schema: typeDefs });

// 정적 이미지를 사용하기 위해서 적어놓음
server.express.use("./statics", express.static("statics"));

server.start({ port: PORT }, () => console.log(`http://localhost:${PORT}`));

// AUTH : https://www.prisma.io/tutorials/graphql-rest-authentication-authorization-basics-ct20
// 참고
