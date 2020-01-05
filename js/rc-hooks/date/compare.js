"use strict";
/**
 * @file compare 日期比较
 */
Object.defineProperty(exports, "__esModule", { value: true });
const week_1 = require("./tokens/week");
function compareDate(type, date1, date2, startDay = 0) {
    const yearDelta = date1.getFullYear() - date2.getFullYear();
    const monthDelta = date1.getMonth() - date2.getMonth();
    const dateDelta = date1.getDate() - date2.getDate();
    // 周的处理比较特别
    if (type !== 'week') {
        // 年不同，或者只比年
        if (yearDelta !== 0 || type === 'year') {
            return yearDelta;
        }
        // 月不同，或者只比月
        if (monthDelta !== 0 || type === 'month') {
            return monthDelta;
        }
        // 日不同
        return dateDelta;
    }
    return week_1.weekOfYear(date1, startDay, 1970) - week_1.weekOfYear(date2, startDay, 1970);
}
exports.compareDate = compareDate;
