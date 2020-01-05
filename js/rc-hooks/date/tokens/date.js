"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: your name
 * @Date: 2019-09-28 00:23:56
 * @LastEditTime: 2019-12-11 14:56:49
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /ts-learning/rc-hooks/date/tokens/date.ts
 */
/**
 * @file date 日相关方法
 */
const convert_1 = require("../convert");
const month_1 = require("./month");
exports.DATE_MILLISECONDS = 24 * 60 * 60 * 1000;
function dayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 1);
    const end = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return Math.floor((Number(end) - Number(start)) / exports.DATE_MILLISECONDS) + 1;
}
exports.dayOfYear = dayOfYear;
function buildFromDayOfYear(year, day) {
    let month = 0;
    while (month < 12) {
        const monthDay = month_1.daysInMonth(year, month);
        if (monthDay >= day) {
            return new Date(year, month, day);
        }
        month++;
        day -= monthDay;
    }
    throw new Error('day of year should < 365/366');
}
exports.buildFromDayOfYear = buildFromDayOfYear;
convert_1.createNumberConverter({
    field: 'dateOfYear',
    format: 'DDD',
    paddingFormat: 'DDDD',
    maxLength: 3,
    getter: date => dayOfYear(date)
});
// DD 和 D
convert_1.createNumberConverter({
    field: 'date',
    format: 'D',
    paddingFormat: 'DD',
    maxLength: 2,
    getter: date => date.getDate()
});
