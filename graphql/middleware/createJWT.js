import jwt from "jsonwebtoken";

const expiresIn = "1h"; // time to live
const secret = "samplejwtauthgraphql"; // secret key
const tokenPrefix = "JWT"; // Prefix for HTTP header

const createJWT = (email, password) => {
    if (!email || !password) {
        // no credentials = fail
        return false;
    }

    const payload = {
        email: email,
        password: password
    };
    const token = jwt.sign(payload, secret, {
        expiresIn
    });
    return token;
};

export default createJWT;
