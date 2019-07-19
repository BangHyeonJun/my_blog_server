import decodeJWT from "./decodeJWT";

const auth = async (req, res, next) => {
    const token = req.get(process.env.token_prefix);

    if (token) {
        const user = await decodeJWT(token);
        console.log("test : ", user);
        req.user = user;
    }

    next();
};

export default auth;
