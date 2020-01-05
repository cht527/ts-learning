"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const locale_1 = require("./locale");
const convert_1 = require("./convert");
function createEmptyFormat(token) {
    return () => token;
}
function formatDate(date, format, locale) {
    const tokens = convert_1.tokenizer(format);
    const matched = tokens.map(token => {
        const fn = convert_1.CONVERTER_MAP[token] ? convert_1.CONVERTER_MAP[token].formatToken : createEmptyFormat(token);
        return fn(date, locale_1.getDateLocale(locale));
    });
    return matched.join('');
}
exports.formatDate = formatDate;
function formatDateArr(dateList, format, locale) {
    return dateList.map(item => {
        if (typeof item === 'string') {
            return item;
        }
        return formatDate(item, format, locale);
    });
}
exports.formatDateArr = formatDateArr;
