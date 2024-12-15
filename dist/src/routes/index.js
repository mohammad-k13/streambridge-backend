"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user.controller"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const api = (0, express_1.Router)().use(user_controller_1.default).use(auth_controller_1.default);
exports.default = (0, express_1.Router)().use("/api", api);
