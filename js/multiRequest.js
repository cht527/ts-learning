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
/*
 * @Author: your name
 * @Date: 2020-01-05 15:26:11
 * @LastEditTime : 2020-01-05 19:44:52
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /node_test/src/multiRequest.ts
 */
const axios_1 = __importDefault(require("axios"));
const imgUrl = 'http://sf1-ttcdn-tos.pstatp.com/obj/ttfe/adfe/yuntu_ng/';
const urlList = [10, 11, 12, 13, 14].map(item => `${imgUrl}${item}.png`);
class MultiRequest {
    constructor(urlList, limit) {
        this.reqList = [];
        this.count = 0;
        this.lock = [];
        this.reqList = urlList;
        this.limit = limit;
    }
    block() {
        let _resolve;
        return new Promise((resolve, reject) => {
            _resolve = resolve;
            this.lock.push(_resolve);
        });
    }
    next() {
        if (this.lock.length > 0) {
            this.lock.shift()();
        }
    }
    call() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.count >= this.limit) {
                yield this.block();
            }
            if (this.reqList.length > 0) {
                this.count++;
                const res = yield axios_1.default.get(this.reqList.shift());
                console.log(~~(Math.random() * 30));
                this.count--;
                this.next();
            }
        });
    }
}
const tester = new MultiRequest(urlList, 3);
for (let i = 0; i < urlList.length; i++) {
    tester.call();
}
