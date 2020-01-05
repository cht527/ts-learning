"use strict";
/**
 * @file locale 本地语言
 */
Object.defineProperty(exports, "__esModule", { value: true });
let DEFAULT_DATE_LOCALE = null;
function setDefaultDateLocale(locale) {
    DEFAULT_DATE_LOCALE = locale;
}
exports.setDefaultDateLocale = setDefaultDateLocale;
function getDateLocale(locale) {
    if (locale != null) {
        return locale;
    }
    if (DEFAULT_DATE_LOCALE != null) {
        return DEFAULT_DATE_LOCALE;
    }
    throw new Error('you must provide `locale` param, or call `setDefaultDateLocale` first');
}
exports.getDateLocale = getDateLocale;
