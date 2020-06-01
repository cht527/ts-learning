/*
 * @Author: your name
 * @Date: 2019-09-28 00:23:56
 * @LastEditTime: 2019-12-11 14:57:19
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /ts-learning/rc-hooks/date/tokens/week.ts
 */
/**
 * @file week
 */
import { createNumberConverter } from '../convert';
import { DATE_MILLISECONDS, buildFromDayOfYear } from './date';
export function weekOfYear(date, startDay, year) {
    const firstDay = new Date(year == null ? date.getFullYear() : year, 0, 1);
    const day = firstDay.getDay();
    const offset = (day - startDay + 7) % 7;
    firstDay.setDate(firstDay.getDate() - offset);
    // 第一天为0
    const offsetDay = Math.floor((Number(date) - Number(firstDay)) / DATE_MILLISECONDS);
    return Math.floor(offsetDay / 7) + 1;
}
export function buildFromWeek(year, week, day, startDay) {
    const firstDay = new Date(year, 0, 1);
    const offset = (firstDay.getDay() - startDay + 7) % 7;
    const offsetDay = (week - 1) * 7 + day - offset + 1;
    return buildFromDayOfYear(year, Math.max(1, offsetDay));
}
export function buildWeekRange(year, week, startDay) {
    const firstDay = new Date(year, 0, 1);
    const offset = (firstDay.getDay() - startDay + 7) % 7;
    const offsetDay = (week - 1) * 7 + 1 - offset;
    const start = buildFromDayOfYear(year, offsetDay);
    const end = new Date(+start);
    end.setDate(end.getDate() + 6);
    return [start, end];
}
// WW 和 W
createNumberConverter({
    field: 'week',
    format: 'W',
    paddingFormat: 'WW',
    maxLength: 2,
    getter: (date, locale) => weekOfYear(date, locale.startDay)
});
