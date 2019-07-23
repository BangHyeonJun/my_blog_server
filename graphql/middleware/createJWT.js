import jwt from "jsonwebtoken";

const createJWT = (_id, email, avatar, nickname, rule) => {
    const payload = {
        _id: _id,
        email: email,
        avatar: avatar,
        nickname: nickname,
        rule: rule
    };

    const token = jwt.sign(payload, process.env.token_sort, {
        expiresIn: process.env.token_expire
    });

    return token;
};

export default createJWT;
