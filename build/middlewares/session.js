"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const mongoDBStotreSession = (0, connect_mongodb_session_1.default)(express_session_1.default);
const store = new mongoDBStotreSession({
    uri: dbConfig_1.default.mongoUri,
    collection: 'mySessions'
});
// Catch errors
store.on('error', (error) => {
    console.log(error);
});
const sessionMiddleware = (req, res, next) => {
    return (0, express_session_1.default)({
        secret: 'some secret',
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: (1000 * 60 * 60 * 24) * 7,
            secure: true,
            sameSite: 'none',
        },
        store: store,
    })(req, res, next);
};
exports.default = sessionMiddleware;
