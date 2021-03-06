"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyAuth = (request, response, next) => {
    try {
        const authorizationHeader = request.headers.authorization;
        if (typeof authorizationHeader !== 'undefined') {
            const token = authorizationHeader.split(' ')[1];
            process.env.TOKEN_SECRET &&
                jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        }
        next();
    }
    catch (error) {
        response.status(401);
        response.json('Access denied, invalid token');
    }
};
exports.default = verifyAuth;
