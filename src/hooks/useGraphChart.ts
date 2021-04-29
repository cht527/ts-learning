import { useEffect, useRef } from 'react';
import echarts from 'echarts/lib/echarts';
function useGraphCharts(
    ref: any,
    data: any,
    id: string,
    getOption: () => any,
    showLoading?: boolean
) {
    const timeRef = useRef(0);
    useEffect(() => {
        ref.current = echarts.init(document.getElementById(id) as HTMLDivElement);
        const resizeFunc = () => {
            if (timeRef.current) {
                clearTimeout(timeRef.current);
            }
            timeRef.current = window.setTimeout(() => {
                ref.current && ref.current.resize();
            }, 400);
        };
        window.addEventListener('resize', resizeFunc);

        return () => {
            echarts.dispose(ref.current);
            window.removeEventListener('resize', resizeFunc);
        };
    }, [id]);

    useEffect(() => {
        ref.current = echarts.init(document.getElementById(id) as HTMLDivElement);
        if (showLoading) {
            ref.current.showLoading('default', {
                text: '暂无数据',
                color: 'transparent',
                textColor: '#1c68d9',
                maskColor: 'rgba(255, 255, 255, 1)',
                zlevel: 0
            });
        } else {
            ref.current.hideLoading();
        }
        ref.current.setOption(getOption(), true);
    }, [data, showLoading]);
    return ref.current;
}

