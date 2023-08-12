"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = void 0;
const getPosts = (req, res) => {
    //@ts-ignore
    // req.session.isAuth = true
    console.log(req.session);
    res.send('fetched all posts');
};
exports.getPosts = getPosts;
