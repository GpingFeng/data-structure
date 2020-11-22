/**
 * 栈的实现
 * 栈是一种遵从先进先出（LIFO）原则的有序集合
 */
class Stack {
  constructor() {
    // 使用数组来存放栈的元素
    this.items = [];
  }
  // 添加元素到栈顶
  push(element) {
    this.items.push(element);
    // return this
  }
  // 移除栈顶元素，同时返回被移除了的元素
  pop() {
    return this.items.pop();
  }
  // 返回栈顶元素，只是返回，不对栈做任何处理
  peek() {
    return this.items[this.items.length - 1];
  }
  // 判断栈是否为空
  isEmpty() {
    // console.log(this.items)
    return this.size() === 0;
  }
  // 移除栈中所有的元素
  clear() {
    this.items = [];
  }
  // 返回栈中元素个数
  size() {
    return this.items.length;
  }
  // 打印出栈（用来测试用）
  print() {
    console.log(this.items.toString());
  }
}

module.exports = Stack;

// 以下为测试代码
let stack = new Stack();
console.log(stack.isEmpty());
stack.push(7);
stack.push(8);
console.log(stack.isEmpty());
console.log(stack.peek());
stack.push(9);
console.log(stack.size());
console.log(stack.pop());
stack.print();
console.log(stack.pop());
stack.print();
console.log(stack.size());
stack.print();

// 栈的应用，将十进制转换成二进制
function divideByTwo(desNumber) {
  let stack = new Stack();
  while (desNumber > 0) {
    // 将余2的结果入栈
    stack.push(desNumber % 2);
    // 更新 desNumber 的值，记得是向下取整
    desNumber = Math.floor(desNumber / 2);
  }
  stack.print();
}

divideByTwo(10);
