// 集合
function SetES5() {
    let items = {};
    this.add = function(value) {
        if(this.has(value)) {
            return false;
        } else {
            items[value] = value;
            return true;
        }
    }
    this.remove = function(value) {
        if(this.has(value)) {
            // items[value] = null;
            delete items[value];    // 使用 delete 删除对象的属性
            return true;
        }
        return false
    }
    this.has = function(value) {
        // return value in items;  // 包括原型上的属性
        return items.hasOwnProperty(value);
    }
    this.clear = function() {
        items = {};
    }
    this.size = function() {
        // return Object.keys(items).length;
        let count = 0;
        for(let key in items) {
            if (items.hasOwnProperty(key)) {
                count++
            }
        }
        return count;
    }
    this.values = function() {
        let values = [];
        for(let key in items) {
            if(items.hasOwnProperty(key)) {
                values.push(items[key]);
            }
        }
        return values;
    }
    // 集合操作
    // 并集
    this.union = function(otherSet) {
        let unionSet = new SetES5();
        let values = this.values();
        for(let i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
        }
        values = otherSet.values();
        for(let i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
        }
        return unionSet;
    }
    // 交集
    this.intersection = function(otherSet) {
        let intersectionSet = new SetES5();
        let values = this.values();
        for(let i = 0; i < values.length; i++) {
            if(otherSet.has(values[i])) {
                intersectionSet.add(values[i])
            }
        }
        return intersectionSet;
    }
    // 差集
    this.difference = function(otherSet) {
        let differenceSet = new SetES5();
        let values = this.values();
        for(let i = 0; i < values.length; i++) {
            if(!otherSet.has(values[i])) {
                differenceSet.add(values[i])
            }
        }
        return differenceSet;
    }
    // 子集
    this.subset = function(otherSet) {
        if(this.size() > otherSet.size()) {
            return false;
        } else {
            let values = this.values();
            for(let i = 0; i< values.length; i++) {
                if(!otherSet.has(values[i])) {
                    return false;
                }
            }
            return true;
        }
    }
}

// 使用集合
let set = new SetES5();
set.add(1);
console.log(set.values());
console.log(set.has(1));
console.log(set.size());
set.add(2);
console.log(set.values());
console.log(set.has(11));
console.log(set.size());
set.remove(1);
console.log(set.values());
console.log(set.has(1));
console.log(set.size());
set.remove(2);
console.log(set.values());
console.log(set.has(1));
console.log(set.size());


// 测试集合操作
let setA = new SetES5();
let setB = new SetES5();
setA.add(1);
setA.add(2);
setA.add(3);
setB.add(1);
setB.add(2);
setB.add(3);
setB.add(4);
let unionAB = setA.union(setB);
let intersectionAB = setA.intersection(setB);
let differenceAB = setA.difference(setB);
console.log(unionAB.values());
console.log(intersectionAB.values());
console.log(differenceAB.values());
console.log(setA.subset(setB));