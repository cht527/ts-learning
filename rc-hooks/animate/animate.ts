/**
 * @file animate
 * @author wuqi57(441984145@qq.com)
 */
import * as cubicBezier from './cubicBezier';

export type AnimateType = 'linear' | 'ease' | 'easeIn' | 'easeOut' | 'easeInOut';

export type animateTickFunc = (stepDis: number, percent: number) => void;

export type animateStopFunc = () => void;

export function animate(
    animateType: AnimateType,
    duration: number,
    distance: number,
    tick?: animateTickFunc,
    end?: () => void
): animateStopFunc {
    let frame: number | null = null;
    let startTime = new Date().getTime();

    function innerTick(): void {
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

    function stop(): void {
        frame && window.cancelAnimationFrame(frame);
        frame = null;
        end && end();
    }

    frame = requestAnimationFrame(innerTick);

    return stop;
}
