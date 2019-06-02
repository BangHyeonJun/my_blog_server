import { GraphQLServer } from "graphql-yoga";
const express = require("express");
import mongoose from "mongoose";
import resolvers from "./graphql/resolvers";

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://admin:bhj2849@ds044907.mlab.com:44907/blog", {
    useNewUrlParser: true
});
mongoose.connection.once("open", () => {
    console.log("MongoDB Connected...");
});

const server = new GraphQLServer({
    typeDefs: "graphql/schema.graphql",
    resolvers
});

// 정적 이미지를 사용하기 위해서 적어놓음
server.express.use("/statics", express.static("statics"));

server.start(() => console.log("http://localhost:4000"));
