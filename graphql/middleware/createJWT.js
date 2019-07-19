import jwt from "jsonwebtoken";

const createJWT = (email, password) => {
    if (!email || !password) {
        // no credentials = fail
        return false;
    }

    const payload = {
        email: email,
        password: password
    };

    const token = jwt.sign(payload, process.env.token_sort, {
        expiresIn: process.env.token_expire
    });

    return token;
};

export default createJWT;
