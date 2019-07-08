import jwt from "jsonwebtoken";

const expiresIn = "1m"; // time to live
const secret = "samplejwtauthgraphql"; // secret key
const tokenPrefix = "JWT"; // Prefix for HTTP header

const decodeJWT = async token => {
    try {
        // if (!payload) {
        //     //no token in the header
        //     throw new Error("No token provided");
        // }

        // if (prefix !== tokenPrefix) {
        //     //unexpected prefix or format
        //     throw new Error("Invalid header format");
        // }

        const decode = jwt.verify(token, secret, (err, data) => {
            if (err) {
                console.log("if !!!");
                //token is invalid
                throw new Error("Invalid token!");
            } else {
                console.log("else !!!");
                return { email: data.email, password: data.password };
            }
        });
        return decode;
    } catch (error) {
        console.log("error !!!");
        return undefined;
    }
};

export default decodeJWT;
