"use strict";
/*
 * @Author: your name
 * @Date: 2019-09-28 00:23:56
 * @LastEditTime: 2019-12-11 14:57:46
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /ts-learning/rc-hooks/date/index.ts
 */
/**
 * @file index 工具函数
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./util"));
__export(require("./format"));
__export(require("./parse"));
__export(require("./compare"));
__export(require("./tokens/date"));
__export(require("./tokens/day"));
__export(require("./tokens/month"));
__export(require("./tokens/week"));
__export(require("./tokens/year"));
__export(require("./locale"));
