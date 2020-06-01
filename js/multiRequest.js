/*
 * @Author: your name
 * @Date: 2020-01-05 15:26:11
 * @LastEditTime : 2020-01-05 19:44:52
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /node_test/src/multiRequest.ts
 */
import axios from 'axios';
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
    async call() {
        if (this.count >= this.limit) {
            await this.block();
        }
        if (this.reqList.length > 0) {
            this.count++;
            const res = await axios.get(this.reqList.shift());
            console.log(~~(Math.random() * 30));
            this.count--;
            this.next();
        }
    }
}
const tester = new MultiRequest(urlList, 3);
for (let i = 0; i < urlList.length; i++) {
    tester.call();
}
