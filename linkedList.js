// 链表的初步实现
function LinkedList() {
  let Node = function (element) {
    this.element = element;
    this.next = null;
  };
  let length = 0;
  let head = null;
  this.append = function (element) {
    let node = new Node(element);
    let current;
    // 第一个节点为空
    if (head === null) {
      head = node;
    } else {
      current = head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    length++; // 长度加一
  };
  this.insert = function (position, element) {
    let node = new Node(element);
    let current = head;
    if (position > -1 && position <= length) {
      // 头部特殊处理
      if (position === 0) {
        node.next = current;
        head = node;
      } else {
        let index = 0,
          previous;
        while (position > index) {
          index++;
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
      }
      length++;
      return true;
    } else {
      return false;
    }
  };
  this.remove = function (element) {
    let index = this.indexOf(element);
    return this.removeAt(index);
  };
  this.removeAt = function (position) {
    if (position > -1 && position < length) {
      let index = 0,
        previous,
        current = head;
      if (position === 0) {
        head = current.next;
      } else {
        while (position > index) {
          index++;
          previous = current;
          current = current.next;
        }
        // 这里就是要将它移除掉
        previous.next = current.next;
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  };
  this.indexOf = function (element) {
    let current = head,
      index = 0;
    while (current) {
      if (element === current.element) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  };
  this.isEmpty = function () {
    return length === 0;
  };
  this.size = function () {
    return length;
  };
  this.getHead = function () {
    return head;
  };
  this.toString = function () {
    let current = head,
      string = "";
    while (current) {
      string += current.element + (current.next ? "-" : "");
      current = current.next;
    }
    return string;
  };
  this.print = function () {
    console.log(length, head);
  };
}

module.exports = LinkedList;

// 测试用例
let list = new LinkedList();
list.append(10);
list.print();
list.append(15);
list.print();
list.insert(0, 1);
list.print();
list.insert(2, 3);
list.print();
list.insert(1, 3);
list.print();
console.log(list.toString());
console.log(list.indexOf());
list.remove(1);
list.print();
