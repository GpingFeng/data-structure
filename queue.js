/**
 * 队列的实现
 */
function Queue() {
    let items = []
    this.enqueue = function(element) {
        items.push(element)
    }
    this.dequeue = function() {
        return items.shift()
    }
    this.front = function() {
        return items[0]? items[0]: '数组为空'
    }
    this.isEmpty = function() {
        return items.length === 0
    }
    this.size = function() {
        return items.length
    }
    this.print = function() {
        console.log(items.toString())
    }
}

module.exports = Queue

let queue = new Queue()
console.log('queue.isEmpty(): ', queue.isEmpty())
queue.enqueue('gping')
queue.enqueue('Feng')
queue.print()
queue.enqueue('Yang')
queue.print()
console.log('queue.size(): ', queue.size())
queue.dequeue()
queue.dequeue()
queue.print()
console.log('queue.size(): ', queue.size())

// 使用ECMAScript 6语法实现Queue类
// 使用 WeakMap 来保存私有属性 items，并用外层
let Queue2 = (function () {
    const items = new WeakMap()
    class Queue2 {
        constructor () {
            items.set(this, [])
        }
        enqueue(element) {
            let q = items.get(this)
            q.push(element)
        }
        dequeue() {
            let q = items.get(this)
            return q.shift()
        }
    }
    return Queue2
})