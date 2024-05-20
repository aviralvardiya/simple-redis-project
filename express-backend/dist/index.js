"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const app = (0, express_1.default)();
const client = (0, redis_1.createClient)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({ msg: "hello" });
});
app.post("/submit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, age, like } = req.body;
    try {
        yield client.lPush("users", JSON.stringify({ name, age, like }));
        res.json({
            msg: "submission done",
        });
    }
    catch (error) {
        console.log(error);
        res.json({ msg: "something went wrong" });
    }
}));
function connectAndStart() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("connected to redis");
            const port = 8080;
            app.listen(port, () => {
                console.log("server listening on port :", port);
            });
        }
        catch (error) {
            console.log("error while connecting to redis");
        }
    });
}
connectAndStart();
