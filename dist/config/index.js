"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const env = process.env.NODE_ENV === "production";
exports.default = {
    // firebase
    env,
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGE_SENDER_ID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENT_ID,
    jwtSecret: process.env.JWT_SECRET,
    emailApp: process.env.APP_EMAIL,
    passApp: process.env.APP_PASS,
    ablyKey: process.env.ABLY_API_KEY,
    serverUrl: env ? process.env.WEB_SERVER_URL : "http://localhost:3456",
    clientUrl: env ? process.env.WEB_CLIENT_URL : "http://localhost:3000",
};
//# sourceMappingURL=index.js.map