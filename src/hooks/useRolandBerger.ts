import produce from 'immer';
import d3 from 'd3';
export type rolandBergerItem = {
    label_id: number;
    label_name: string;
    self_score: number;
    cmp_score: number;
    above_cnt: number;
    x: number;
    y: number;
    type: string;
    clickStatus: string;
};
export type PRGB = {
    pos_r: number;
    pos_g: number;
    pos_b: number;
};
export type NRGB = {
    neg_r: number;
    neg_g: number;
    neg_b: number;
};
export type rolandBergerColor = {
    positive: PRGB;
    negative: NRGB;
};

export default function useRolandBerger(
    data: rolandBergerItem[],
    containerId: string,
    canvasId: string,
    color: rolandBergerColor = {
        positive: { pos_r: 255, pos_g: 0, pos_b: 0 },
        negative: { neg_r: 0, neg_g: 0, neg_b: 255 }
    },
    width: number = 512,
    height: number = 512,
    rangeRatio: number,
    isNetInfluence: boolean
) {
    // below threshold is negative, above threshold is positive, default is 0
    // range a point may affect, range = rangeRatio * Math.min(w, h);
    const container = document.getElementById(containerId) as HTMLDivElement; // id or dom node

    //  other optional params
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const { positive, negative } = color;

    const { pos_r, pos_g, pos_b } = positive;
    const { neg_r, neg_g, neg_b } = negative;

    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;
    const newData = isNetInfluence
        ? produce(data, dataState => {
              dataState.forEach((d: rolandBergerItem, i) => {
                  d.x = d.x * w;
                  d.y = d.y * h;
                  const temp_self_score = d.self_score - 50;
                  if (temp_self_score > -10 && temp_self_score < 10) {
                      d.self_score = 0;
                  } else {
                      d.self_score = temp_self_score / 100;
                  }
              });
          })
        : produce(data, dataState => {
              dataState.forEach((d: rolandBergerItem, i) => {
                  d.x = d.x * w;
                  d.y = d.y * h;
                  d.self_score = (d.self_score - d.cmp_score) / 100;
              });
          });
    container.style.cssText = `width:${width};height:${height};position:relative`;
    let currentCanvas = document.getElementById(canvasId) as HTMLCanvasElement;

    // let canvas = document.createElement('canvas');

    // 画图形 canvas
    // tslint:disable-next-line: only-arrow-functions
    const drawHeatmap = function(dataRolandBerger: rolandBergerItem[]) {
        if (currentCanvas) {
            container.removeChild(currentCanvas);
        }
        currentCanvas = document.createElement('canvas') as HTMLCanvasElement;
        const currentCtx = currentCanvas.getContext('2d') as CanvasRenderingContext2D;
        currentCanvas.id = canvasId;
        currentCanvas.style.cssText = `position:absolute;top:20px;left:20px;`;
        container.appendChild(currentCanvas);

        const tempCanvas = document.createElement('canvas') as HTMLCanvasElement;
        const tempCtx = tempCanvas.getContext('2d') as CanvasRenderingContext2D;

        const _width = w;
        const _height = h;
        const points = produce(dataRolandBerger, dataState => {});

        currentCanvas.width = tempCanvas.width = _width;
        currentCanvas.height = tempCanvas.height = _height;

        function draw() {
            const dataRect = []; // width * height
            const getWeight = function(
                x1: number,
                y1: number,
                x2: number,
                y2: number,
                range: number
            ) {
                return Math.pow(
                    Math.E,
                    (-0.5 * (Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))) / range / range
                );
            };
            let max = 0;
            (function() {
                const rangeSize = rangeRatio * Math.min(_width, _height);
                for (let i = 0, l = _width * _height; i < l; i++) {
                    const _w = i % _width;
                    const _h = Math.floor(i / _width);
                    let sum = 0;
                    points.forEach(function(p, j) {
                        const range = rangeSize * p.self_score;
                        const weight = getWeight(_w, _h, p.x, p.y, range);
                        sum += weight * p.self_score;
                    });

                    dataRect[i] = sum;
                    if (Math.abs(sum) >= max) {
                        max = Math.abs(sum);
                    }
                }
            })();

            tempCtx.clearRect(0, 0, _width, _height);

            const imageData = tempCtx.getImageData(0, 0, _width, _height);
            const pix = imageData.data;
            for (let i = 0, n = pix.length; i < n; i += 4) {
                const value = dataRect[Math.floor(i / 4)];
                if (value > 0) {
                    pix[i] = pos_r;
                    pix[i + 1] = pos_g;
                    pix[i + 2] = pos_b;
                    pix[i + 3] = Math.round(Math.floor(Math.abs(value) / max / 0.1) * 0.1 * 255);
                } else if (value < 0) {
                    pix[i] = neg_r;
                    pix[i + 1] = neg_g;
                    pix[i + 2] = neg_b;
                    pix[i + 3] = Math.round(Math.floor(Math.abs(value) / max / 0.1) * 0.1 * 255);
                } else {
                    pix[i] = 240;
                    pix[i + 1] = 240;
                    pix[i + 2] = 240;
                    pix[i + 3] = 1;
                }
            }

            if (currentCtx) {
                currentCtx.putImageData(imageData, 0, 0);
            }
        }
        draw();
    };

    // 画文字&框线 svg
    const drawWord = function(dataRolandBerger: rolandBergerItem[]) {
        const _width = w;
        const _height = h;
        d3.select(container)
            .selectAll('svg')
            .remove();
        const svg = d3
            .select(container)
            .append('svg')
            .attr('width', _width + margin.left + margin.right)
            .attr('height', _height + margin.top + margin.bottom)
            .attr('style', `position:absolute;z-index:50;`)
            .append('g')
            .attr('class', `tag-g-${containerId}`)
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        // line
        const lineData = [
            {
                x1: 0,
                y1: h / 2,
                x2: w,
                y2: h / 2
            },
            {
                x1: w / 2,
                y1: 0,
                x2: w / 2,
                y2: h
            }
        ];
        lineData.forEach(item => {
            svg.append('line')
                .attr('x1', item.x1)
                .attr('y1', item.y1)
                .attr('x2', item.x2)
                .attr('y2', item.y2)
                .attr('stroke', '#E4E9EDFF')
                .attr('stroke-width', '1px');
        });
        // words
        svg.selectAll(`.tag-name-${containerId}`)
            .data(dataRolandBerger)
            .enter()
            .append('text')
            .attr('class', `tag-name-${containerId}`)
            .attr('x', function(d) {
                return d.x;
            })
            .attr('y', function(d) {
                return d.y;
            })
            .attr('dominant-baseline', 'central')
            .attr('text-anchor', 'middle')
            .attr('data', function(d) {
                return d.label_name;
            })
            .style('cursor', 'pointer')
            .style('fill', '#333')
            .text(function(d) {
                return d.label_name;
            })
            .style('font-size', '14px');
        svg.append('rect')
            .attr('fill', 'none')
            .attr('stroke', '#E4E9ED')
            .attr('width', _width)
            .attr('height', _height);
        // area words
        const orient = [
            {
                x: 0,
                y: _height / 2 + 1,
                text: '消费-',
                width: 40,
                height: 26
                // writingMode: 'tb-rl'
            },
            {
                x: _width,
                y: _height / 2 + 1,
                text: '消费+',
                width: 40,
                height: 26
                // writingMode: 'tb-rl'
            },
            {
                x: _width / 2,
                y: 0,
                text: 'E 感性需求',
                width: 80,
                height: 26
                // writingMode: 'horizontal-tb'
            },
            {
                x: _width / 2,
                y: _height,
                text: 'R 理性需求',
                width: 80,
                height: 26
                // writingMode: 'horizontal-tb'
            }
        ];
        const areaList = [
            {
                x: 10,
                y: 20,
                text: '简约感性区'
            },
            {
                x: 390,
                y: 20,
                text: '消费升级区'
            },
            {
                x: 10,
                y: 460,
                text: '价格敏感区'
            },
            {
                x: 390,
                y: 460,
                text: '体验理性区'
            }
        ];
        svg.selectAll('.title')
            .data(orient)
            .enter()
            .append('rect')
            .attr('class', 'title')
            .attr('fill', '#fff')
            .attr('width', function(d) {
                return d.width;
            })
            .attr('height', function(d) {
                return d.height;
            })
            .attr('stroke', '#E4E9ED')
            .attr('x', function(d) {
                return d.x - d.width / 2;
            })
            .attr('y', function(d) {
                return d.y - d.height / 2;
            })
            .attr('rx', 4)
            .attr('ry', 4);
        svg.selectAll('.area')
            .data(areaList)
            .enter()
            .append('text')
            .attr('class', 'area')
            .attr('x', function(d) {
                return d.x;
            })
            .attr('y', function(d) {
                return d.y;
            })
            .style('fill', '#A0A6AE')
            .text(function(d) {
                return d.text;
            });
        svg.selectAll('.orient')
            .data(orient)
            .enter()
            .append('text')
            .attr('class', 'orient')
            .attr('x', function(d) {
                return d.x;
            })
            .attr('y', function(d) {
                return d.y;
            })
            .attr('dominant-baseline', 'central')
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('fill', '#666')
            .style('font-family', 'monospace')
            // .style('writing-mode', function (d) { return d.writingMode })
            .text(function(d) {
                return d.text;
            });
    };
    drawWord(newData);
    drawHeatmap(newData);
}

