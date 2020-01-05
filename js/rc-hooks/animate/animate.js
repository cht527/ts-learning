"use strict";
/*
 * @Author: your name
 * @Date: 2019-09-28 00:23:56
 * @LastEditTime: 2019-12-11 14:56:30
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /ts-learning/rc-hooks/animate/animate.ts
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cubicBezier = __importStar(require("./cubicBezier"));
function animate(animateType, duration, distance, tick, end) {
    let frame = null;
    let startTime = new Date().getTime();
    function innerTick() {
        const time = new Date().getTime() - startTime;
        if (duration < time) {
            // 保证最后一次一定为1
            tick && tick(distance, 1);
            stop();
            return;
        }
        const percent = cubicBezier[animateType](time / duration);
        tick && tick(percent * distance, percent);
        frame = requestAnimationFrame(innerTick);
    }
    function stop() {
        frame && window.cancelAnimationFrame(frame);
        frame = null;
        end && end();
    }
    frame = requestAnimationFrame(innerTick);
    return stop;
}
exports.animate = animate;
