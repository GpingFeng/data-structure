function HashTable() {
    var table = [];
    // 散列函数
    var loseloseHashCode = function(key) {
        var hash = 0;
        for(let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);  // 取得每个字符对应的ASCII值
        }
        return hash % 37;
    }

    var ValuePair = function(key, value) {
        this.key = key;
        this.value = value;
        this.toString = function() {
            return `[${this.key} - ${this.value}]`
        }
    }
    this.put = function(key, value) {
        var position = loseloseHashCode(key);
        console.log(`${position} -- ${key}`);
        table[position] = value;
    }
    this.remove = function(key) {
        var position = loseloseHashCode(key);
        console.log(`${position} -- ${key}`);
        table[position] = undefined;
    }
    this.get = function(key) {
        return table[loseloseHashCode(key)]
    }
    this.print = function() {
        table.forEach((item, index) => {
            console.log(`${index} --- ${item}`);
        })
    }
}

var hash = new HashTable();
hash.put('Donnie', 'zhanjiang');
hash.put('Ana', 'Maoming');
hash.put('Jonathan', 'Guangzhou');
hash.put('Jamie', 'Shanghai');
hash.put('Sue', 'Beijing');
console.log(hash.get('Donnie'));
// console.log(hash.get('FGP'));
// hash.remove('Donnie');
console.log(hash.get('Donnie'));
hash.print()


// 处理散列表中的冲突
// 分离链接
var LinkedList = require('./20181230.js');  // 使用到之前的链表结构

function HashTableSeparateLink() {
    var table = [];
    // 散列函数
    var loseloseHashCode = function(key) {
        var hash = 0;
        for(let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);  // 取得每个字符对应的ASCII值
        }
        return hash % 37;
    }

    var ValuePair = function(key, value) {
        this.key = key;
        this.value = value;
        this.toString = function() {
            return `[${this.key} - ${this.value}]`
        }
    }
    this.put = function(key, value) {
        var position = loseloseHashCode(key);
        if(table[position] === undefined) {
            table[position] = new LinkedList();
        }
        table[position].append(new ValuePair(key, value));
    }
    this.remove = function(key) {
        // var position = loseloseHashCode(key);
        // console.log(`${position} -- ${key}`);
        // table[position] = undefined;
        var position = loseloseHashCode(key);
        if(table[position] !== undefined) {
            let current = table[position].getHead();
            // 使用链表来查询键值
            while(current.next) {
                if(current.element.key === key) {
                    table[position].remove(current.element);
                    if(table[position].isEmpty()) {
                        table[position] = undefined;
                    }
                    return true;
                }
            }
            // 检查第一个或者最后一个
            if(current.element.key === key) {
                table[position].remove(current.element);
                if(table[position].isEmpty()) {
                    table[position] = undefined;
                }
                return true;
            }
        }
        return false;
    }
    this.get = function(key) {
        // return table[loseloseHashCode(key)]
        var position = loseloseHashCode(key);
        if(table[position] !== undefined) {
            // 使用链表来查询键值
            let current = table[position].getHead();
            while(current.next) {
                if(current.element.key === key) {
                    return current.element.value;
                }
                current = current.next;
            }
            // 检查元素在链表最前或者最后一个的情况
            if(current.element.key == key) {
                return current.element.value;
            }
        }
        return undefined;
    }
    this.print = function() {
        table.forEach((item, index) => {
            console.log(`${index} --- ${item}`);
        })
    }
}
console.log('++++++++++++++++++++++++++++++');

var hashSeparateLink = new HashTableSeparateLink();
hashSeparateLink.put('Donnie', 'zhanjiang');
hashSeparateLink.put('Ana', 'Maoming');
hashSeparateLink.put('Jonathan', 'Guangzhou');
hashSeparateLink.put('Jamie', 'Shanghai');
hashSeparateLink.put('Sue', 'Beijing');
console.log(hashSeparateLink.get('Donnie'));
// console.log(hash.get('FGP'));

console.log(hashSeparateLink.get('Jamie'));
hashSeparateLink.print();
hashSeparateLink.remove('Donnie');
hashSeparateLink.print();

// 线性探查解决方法
function HashTableLineFind() {
    var table = [];
    // 散列函数
    var loseloseHashCode = function(key) {
        var hash = 0;
        for(let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);  // 取得每个字符对应的ASCII值
        }
        return hash % 37;
    }

    var ValuePair = function(key, value) {
        this.key = key;
        this.value = value;
        this.toString = function() {
            return `[${this.key} - ${this.value}]`
        }
    }
    this.put = function(key, value) {
        var position = loseloseHashCode(key);
        if(table[position] == undefined) {
            table[position] = new ValuePair(key, value);
        } else {
            var index = ++position;
            while(table[index] !== undefined) {
                index++;
            }
            table[index] = new ValuePair(key, value);
        }
    }
    this.remove = function(key) {
        var position = loseloseHashCode(key);
        if (table[position] !== undefined) {
            if (table[position].key === key) {
                table[position] = undefined;
            } else {
                let index = ++position;
                while(table[index] === undefined || table[index].key !== key) {
                    index++
                }
                if(table[index].key === key) {
                    [index] = undefined;
                }
            }
        }
        return undefined;
    }
    this.get = function(key) {
        // return table[loseloseHashCode(key)]
        var position = loseloseHashCode(key);
        if (table[position] !== undefined) {
            if (table[position].key === key) {
                return table[position].value;
            } else {
                let index = ++position;
                while(table[index] === undefined || table[index].key !== key) {
                    index++
                }
                if(table[index].key === key) {
                    return table[position].value;
                }
            }
        }
        return undefined;
    }
    this.print = function() {
        table.forEach((item, index) => {
            console.log(`${index} --- ${item}`);
        })
    }
}

console.log('---------------------------------------');

var hashLineFind = new HashTableLineFind();
hashLineFind.put('Donnie', 'zhanjiang');
hashLineFind.put('Ana', 'Maoming');
hashLineFind.put('Jonathan', 'Guangzhou');
hashLineFind.put('Jamie', 'Shanghai');
hashLineFind.put('Sue', 'Beijing');
console.log(hashLineFind.get('Donnie'));
// console.log(hash.get('FGP'));

console.log(hashLineFind.get('Jamie'));
hashLineFind.print();
hashLineFind.remove('Donnie');
hashLineFind.print();