"use strict";
/*
 * @Author: your name
 * @Date: 2019-09-28 00:23:56
 * @LastEditTime: 2019-12-11 14:56:57
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /ts-learning/rc-hooks/date/tokens/month.ts
 */
/**
 * @file month 月相关方法
 */
Object.defineProperty(exports, "__esModule", { value: true });
const convert_1 = require("../convert");
const year_1 = require("./year");
const MONTH_DATE_MAP = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function daysInMonth(year, month) {
    if (month !== 1) {
        return MONTH_DATE_MAP[month];
    }
    return year_1.isLeapYear(year) ? 29 : 28;
}
exports.daysInMonth = daysInMonth;
// MMMM
convert_1.createEnumConverter({
    format: 'MMMM',
    localeKey: 'monthList',
    getter: date => date.getMonth(),
    field: 'month'
});
// MMM
convert_1.createEnumConverter({
    format: 'MMM',
    localeKey: 'shortMonthList',
    getter: date => date.getMonth(),
    field: 'month'
});
// MM 和 M
convert_1.createNumberConverter({
    field: 'month',
    format: 'M',
    paddingFormat: 'MM',
    maxLength: 2,
    getter: date => date.getMonth() + 1,
    converter: num => num - 1
});
