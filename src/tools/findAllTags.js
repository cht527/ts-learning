"use strict";
/*
 * @Author: your name
 * @Date: 2020-01-06 10:07:27
 * @LastEditTime : 2020-01-06 20:35:58
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ts-learning/tools/findAllTags.ts
 */
class GetAllTags {
    constructor() {
        this.tagObj = {};
        this.stack = [];
    }
    cycle() {
        this.stack = [document.documentElement];
        while (this.stack.length) {
            const currentNode = this.stack.pop();
            this.countTag(currentNode);
            if (currentNode.nodeType === 1 || currentNode.nodeType === 9) { // 标签节点或根节点
                if (currentNode.childNodes.length > 0) {
                    for (let index = currentNode.childNodes.length - 1; index >= 0; index--) {
                        if (currentNode.childNodes[index].nodeType === 1) {
                            this.stack.push(currentNode.childNodes[index]);
                        }
                    }
                }
            }
        }
    }
    countTag(node) {
        if (node.nodeType === 1) {
            var thisName = node.nodeName;
            if (!this.tagObj[thisName]) {
                this.tagObj[thisName] = 1;
            }
            else {
                this.tagObj[thisName]++;
            }
        }
    }
}
const getAllTags = new GetAllTags();
getAllTags.cycle();
console.log(getAllTags.tagObj);
