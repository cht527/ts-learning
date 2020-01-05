"use strict";
/**
 * @file util 工具函数
 */
Object.defineProperty(exports, "__esModule", { value: true });
const month_1 = require("./tokens/month");
function prevDate(date, amount = 1) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - amount);
}
exports.prevDate = prevDate;
function nextDate(date, amount = 1) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}
exports.nextDate = nextDate;
function prevMonth(date, amount = 1) {
    const dateOfMonth = date.getDate();
    const newDate = new Date(date);
    newDate.setDate(1);
    newDate.setMonth(newDate.getMonth() - amount);
    const maxDate = month_1.daysInMonth(newDate.getFullYear(), newDate.getMonth());
    newDate.setDate(Math.min(dateOfMonth, maxDate));
    return newDate;
}
exports.prevMonth = prevMonth;
function nextMonth(date, amount = 1) {
    return prevMonth(date, -amount);
}
exports.nextMonth = nextMonth;
function prevYear(date, amount = 1) {
    return prevMonth(date, amount * 12);
}
exports.prevYear = prevYear;
function nextYear(date, amount = 1) {
    return prevYear(date, -amount);
}
exports.nextYear = nextYear;
function sortDate(dateList) {
    return dateList.sort((a, b) => a.getTime() - b.getTime());
}
exports.sortDate = sortDate;
