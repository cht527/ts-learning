"use strict";
class NodeForLink {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }
    get isEmpty() {
        return this.length === 0;
    }
    // 获取链表指定位置的结点
    findAsIndex(index) {
        // 参数校验
        if (index >= 0 && index <= this.length) {
            if (index === 0) {
                return this.head;
            }
            // 获取链表头部元素
            let current = this.head;
            // 从链表头部遍历至目标结点位置
            for (let i = 0; i < index && current != null; i++) {
                // 当前结点指向下一个目标结点
                current = current.next;
            }
            // 返回目标结点数据
            return current;
        }
        return null;
    }
    append(ele) {
        const node = new NodeForLink(ele);
        let lastNode = this.findAsIndex(this.length - 1);
        if (lastNode === null) {
            lastNode = node;
        }
        else {
            lastNode.next = node;
        }
        this.length++;
    }
    insert(index, ele) {
        const node = new NodeForLink(ele);
        if (index === 0 || this.isEmpty) {
            // 将节点变量(node)的下一个元素指向链表的头部元素
            node.next = this.head;
            // 链表头部元素赋值为节点变量
            this.head = node;
        }
        else {
            const targetNode = this.findAsIndex(index - 1);
            node.next = targetNode.next;
            targetNode.next = node;
        }
    }
    remove(index) {
        if (index >= 0 && index < this.length) {
            const headNode = this.head;
            if (index === 0 && headNode !== null) {
                this.head = headNode.next;
            }
            else {
                const prevNode = this.findAsIndex(index - 1);
                const currentNode = prevNode?.next;
                prevNode.next = currentNode.next;
            }
            this.length--;
        }
    }
}
const firstNode = {
    val: 1,
    next: null
};
const linkedNode = new LinkedList();
console.log(linkedNode);
linkedNode.insert(1, 2);
console.log(linkedNode);
linkedNode.insert(3, 3);
