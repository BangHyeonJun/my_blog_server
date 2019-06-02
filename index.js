import { GraphQLServer } from "graphql-yoga";
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

server.start(() => console.log("http://localhost:4000"));
