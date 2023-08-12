"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const posts_1 = __importDefault(require("./routes/posts"));
const session_1 = __importDefault(require("./middlewares/session"));
const auth_1 = __importDefault(require("./routes/auth"));
const passport_1 = __importDefault(require("passport"));
require("./middlewares/passport-strategies");
dotenv_1.default.config();
const port = process.env.PORT;
const startServer = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use((0, cors_1.default)({
        origin: 'http://127.0.0.1:5173',
        credentials: true, // Allow credentials (cookies, authentication headers, etc.)
    }));
    app.use(session_1.default);
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.get('/', (req, res) => {
        // @ts-ignore
        req.session.isAuth = true;
        console.log(req.session);
        res.send('hello again');
    });
    app.use('/auth', auth_1.default);
    app.use('/posts', posts_1.default);
    app.listen(port, () => console.log(`server is listening at port ${port}`));
};
exports.default = startServer;
