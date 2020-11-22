// 字典
function Dictionary() {
  var items = {};
  this.set = function (key, value) {
    items[key] = value;
  };
  this.delete = function (key) {
    if (this.has(key)) {
      delete items[key];
      return true;
    } else {
      return false;
    }
  };
  this.has = function (key) {
    return key in items;
  };
  this.get = function (key) {
    // return items[key]
    return this.has(key) ? items[key] : undefined;
  };
  this.clear = function () {
    items = {};
  };
  this.size = function () {
    return Object.keys(items).length;
  };
  this.keys = function () {
    // let keys = []
    // for (let i in items) {
    //     if(this.has(items[i])) {
    //         keys.push(items[i]);
    //     }
    // }
    // return keys;
    return Object.keys(items);
  };
  this.values = function () {
    let values = [];
    for (let i in items) {
      // if(this.has(items[i])) {
      values.push(items[i]);
      // }
    }
    return values;
    // return Object.values(items)
  };
  this.getItems = function () {
    console.log(items);
  };
}

module.exports = Dictionary;

// 使用字典实例
let dictionary = new Dictionary();
dictionary.set("gping", "zhanjiang");
dictionary.set("feng", "shanghai");
dictionary.set("lin", "shanghai");

console.log(dictionary.has("gping"));
console.log(dictionary.has("fgp"));
console.log(dictionary.size());
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.get("lin"));
dictionary.delete("gping");
console.log(dictionary.size());
console.log(dictionary.keys());
console.log(dictionary.values());
