// 双向链表
function DoubleLinkdList() {
  let Node = function (element) {
    this.element = element;
    this.next = null;
    this.prev = null; // 新增
  };
  let length = 0,
    head = null,
    tail = null; // 新增
  // 在任意位置插入新的元素
  this.insert = function (position, element) {
    if (position > -1 && position <= length) {
      let node = new Node(element);
      let current = head,
        previous,
        index = 0;
      // 插入第一个位置
      if (position === 0) {
        if (!head) {
          // 原本的链表为空
          head = node;
          tail = node;
        } else {
          node.next = current;
          current.prev = node;
          head = node;
        }
      } else if (position === length) {
        current = tail;
        current.next = node;
        node.prev = current;
        tail = node;
      } else {
        // 在中间插入
        while (index < position) {
          index++;
          previous = current;
          current = current.next;
        }
        previous.next = node;
        node.prev = previous;
        node.next = current;
        current.prev = node;
      }
      length++; // 更新链表长度
      return true;
    } else {
      return false;
    }
  };
  // 从任意位置移除元素
  this.removeAt = function (position) {
    let current = head;
    let previous,
      index = 0;
    if (position > -1 && position < length) {
      if (position === 0) {
        head = current.next;
        if (length === 1) {
          tail = null;
        } else {
          head.prev = null;
        }
      } else if (position === length - 1) {
        current = tail;
        tail = current.prev;
        tail.next = null;
      } else {
        while (index < position) {
          index++;
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
        current.next.prev = previous;
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  };
  this.print = function () {
    console.log(length, head);
  };
}

let doubleList = new DoubleLinkdList();
doubleList.insert(0, 12);
doubleList.print();
doubleList.insert(1, 15);
doubleList.insert(2, 13);
doubleList.insert(1, 10);
doubleList.print();
doubleList.removeAt(3);
doubleList.removeAt(2);
doubleList.print();
