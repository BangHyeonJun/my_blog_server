import decodeJWT from "./decodeJWT";

const auth = async req => {
    const token = req.get(process.env.token_prefix).replace(/^Bearer /, "");

    if (token) {
        const user = await decodeJWT(token);
        return user;
    } else {
        return null;
    }
};

export default auth;
