function Queue() {
    let items = [];
    this.enqueue = function(element) {
        items.push(element);
    }
    this.dequeue = function() {
        return items.shift();
    }
    this.front = function() {
        return items[0]? items[0]: '数组为空'
    }
    this.isEmpty = function() {
        return items.length === 0;
    }
    this.size = function() {
        return items.length;
    }
    this.print = function() {
        console.log(items.toString());
    }
}

// 循环队列，模拟击鼓传花
function hotPotato(nameList, num) {
    let queue = new Queue();
    for (let i =0; i<nameList.length; i++) {
        queue.enqueue(nameList[i]);
    }
    let result = '';
    while(queue.size() > 1) {
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue());
        }
        result = queue.dequeue();
        console.log(`${result} 被淘汰了`);
    }
    console.log(queue.dequeue() + '是最后的胜利者');
}

let names = ['feng', 'gping', 'ling', 'qing', 'zeng'];
hotPotato(names, 4);

// 最小优先队列的实现
function PriorityQueue() {
    let items = [];
    function QueueElement(element, priority) {
        this.element = element;
        this.priority = priority;
    }

    this.enqueue = function(element, priority) {
        let queueElement = new QueueElement(element, priority);
        let add = false;
        // items.forEach((item, index) => {
        //     if (queueElement.priority < item.priority) {
        //         items.splice(index, 0, queueElement);
        //         add = true;
        //         break;   // forEach 中不能使用break
        //     }
        // })
        for (let index = 0; index < items.length; index++) {
            if (queueElement.priority < items[index].priority) {
                items.splice(index, 0, queueElement);
                add = true;
                break;
            }
        }
        if(!add) {
            items.push(queueElement)
        }
    }
    this.print = function() {
        items.forEach((item, index) => {
            console.dir(item);  // 使用 dir 可以输出对象
            // console.dir(`item: ${item},index: ${index}`);
        })
    }
}

let queue = new PriorityQueue;
queue.enqueue(1, 2);
queue.print();
queue.enqueue(2, 1);
queue.print();
queue.enqueue(3, 4);
queue.print();


const sleep = async function(time) {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
            console.log(1111)
        }, time)
    })
}

console.log(sleep(1000));
console.log(1111111)

const sleep1 = async function(time) {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(1);
            console.log(2222);
        }, time)
    })
}
console.log(sleep1(2000));
console.log(`2222222`)

// const sleep2 = function (time) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve();
//             console.log(3333);
//         }, time)
//     })
// }
// console.log(sleep2(3000))
// console.log(`33333`)

