"use strict";
/**
 * @file day 星期相关方法
 */
Object.defineProperty(exports, "__esModule", { value: true });
const convert_1 = require("../convert");
function weekStart(date, startDay) {
    const day = date.getDay();
    const offset = (day - startDay + 7) % 7;
    if (offset === 0) {
        return date;
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - offset);
}
exports.weekStart = weekStart;
function getFirstOfMonth(sourceDate, startDay) {
    return weekStart(new Date(sourceDate.getFullYear(), sourceDate.getMonth(), 1), startDay);
}
exports.getFirstOfMonth = getFirstOfMonth;
// dddd
convert_1.createEnumConverter({
    format: 'dddd',
    localeKey: 'dayList',
    getter: date => date.getDay(),
    field: 'day'
});
// ddd
convert_1.createEnumConverter({
    format: 'ddd',
    localeKey: 'shortDayList',
    getter: date => date.getDay(),
    field: 'day'
});
// dd
convert_1.createEnumConverter({
    format: 'dd',
    localeKey: 'shortestDayList',
    getter: date => date.getDay(),
    field: 'day'
});
// d
convert_1.createNumberConverter({
    field: 'day',
    format: 'd',
    maxLength: 1,
    getter: date => date.getDay()
});
