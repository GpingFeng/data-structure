let length = 5;
let int16 = new Int16Array(length);
let array16 = [];
array16.length = length;
for (let i = 0; i < length; i++) {
    int16[i] = i + 1;
}
console.log(`${int16}`)

// concat
console.log(`${[1,2,3].concat([5,6,7])}`);

[1,2,3,4,5].reduce((pre, cur, index, item) => { // 这里四个参数的位置应该熟悉
    console.log(pre, cur, index, item);
    return item;    // 记得 return 一个值
}, 0)

let arr1 = [2,3,5,6];
for (val of arr1) {
    console.log(val);
}

let numbers = [5,6,7,8]

// 使用 ES6 新增的迭代器 @@iterator
let iterator = numbers[Symbol.iterator]();
console.log('+++++++++++');
console.log(iterator.next());
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);

let aEntries = numbers.entries(); // 得到键值对的迭代器
console.log(aEntries.next());
console.log(aEntries.next().value);
console.log(aEntries.next().value);
console.log(aEntries.next().value);
console.log(aEntries.next().value);

let akeys = numbers.keys(); // 得到数组索引的迭代器
console.log(akeys.next());
console.log(akeys.next());
console.log(akeys.next());
console.log(akeys.next());
console.log(akeys.next());
console.log(akeys.next());

// Array.form
let numbers2 = Array.from(numbers);
console.log('numbers2: ', numbers2);
let evens = Array.from(numbers, x => (x % 2 == 0))
console.log('evens: ', evens);


let numbers3 = Array.of(23,32);
console.log('numbers3: ', numbers3);
let numbers4 = Array.of(...numbers);
console.log('numbers4: ', numbers4);
// numbers4.fill(0);
console.log('numbers4.fill(0): ', numbers4.fill(0));
console.log('numbers4.fill(0): ', numbers4.fill(2, 1));
console.log('numbers4.fill(0): ', numbers4.fill(3, 1, 2));

// copyWithin 方法
let copyArray = [1,2,3,45,6,32];
copyArray.copyWithin(0,3)
console.log('copyArray: ', copyArray);
copyArray.copyWithin(1, 3, 5);
console.log('copyArray: ', copyArray);

console.log(numbers.includes(5));
console.log(numbers.toString());
console.log(numbers.join('=='));


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