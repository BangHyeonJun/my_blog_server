import { GraphQLServer } from "graphql-yoga";
import mongoose from "mongoose";
import resolvers from "./graphql/resolvers";

mongoose.Promise = global.Promise;

mongoose.connect(
    "mongodb://localhost:27017/myBlog", // mLab URL 삽입 dbuser: 아이디, dbpassword: 비밀번호
    { useNewUrlParser: true }
);
mongoose.connection.once("open", () => {
    console.log("MongoDB Connected...");
});

const server = new GraphQLServer({
    typeDefs: "graphql/schema.graphql",
    resolvers
});

server.start(() => console.log("http://localhost:4000"));
