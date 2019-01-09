// 二叉搜索树
function BinarySearchTree() {
    let Node  = function(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
    let root = null;

    // 插入节点辅助函数，使用递归查找合适的位置
    function insertNode(node, newNode) {
        if (node.key < newNode.key) {
            if (node.right === null) {
                node.right = newNode;
            } else {
                insertNode(node.right, newNode)
            }
        } else {
            if (node.left === null) {
                node.left = newNode;
            } else {
                insertNode(node.left, newNode);
            }
        }
    }
    // 中序遍历辅助函数
    function inOrderTraverseNode(node, callback) {
        if (node !== null) {
            inOrderTraverseNode(node.left, callback);
            callback(node.key);
            inOrderTraverseNode(node.right, callback);
        }
    }
    // 先序遍历辅助函数
    function preOrderTraverseNode(node, callback) {
        if (node !== null) {
            callback(node.key);
            preOrderTraverseNode(node.left, callback);
            preOrderTraverseNode(node.right, callback);
        }
    }
    // 后序遍历辅助函数
    function postOrderTraverseNode(node, callback) {
        if (node !== null) {
            postOrderTraverseNode(node.left, callback);
            postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }

    // 查询特定值辅助函数
    function searchNode(node, key) {
        if(node !== null) {
            if (node.key < key) {
                return searchNode(node.right, key);
            } else if (node.key > key) {
                return searchNode(node.left, key);
            } else {
                return '找到这个值'
            }
        } else {
            return '查找的值不存在';
        }
    }

    // 查询左边最小的节点，跟最小值相似，只不过返回值是一个Node节点
    function findMinNode(node) {
        while(node && node.left !== null) {
            node = node.left;
        }
        return node;
    }

    // 移除一个节点辅助函数
    function removeNode(node, key) {
        if (node === null) {
            return null;
        }
        // 小于要查询的值
        if (node.key < key) {
            node.right = removeNode(node.right, key);
        // 大于要查询的值
        } else if (node.key > key) {
            node.left = removeNode(node.left, key);
        // 命中查询的值
        } else {
            // 命中的第一种情况，一个叶子节点
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            } else if (node.left === null) { // 命中的第二种情况，只有一个子节点的节点
                node = node.right;
                return node;
            } else if (node.right === null) {
                node = node.left;
                return node;
            } else {    // 命中的第三种情况，就是有两个子节点（最复杂的情况）
                var aux = findMinNode(node.right);
                console.log('aux:', aux);
                node.key = aux.key;
                node.right = removeNode(node.right, aux.key);
                return node;
            }
        }   
    }

    // 插入任意一个节点
    this.insert = function(key) {
        let newNode = new Node(key);
        if (root === null) {
            root = newNode;
        } else {
            insertNode(root, newNode);
        }
    }
    this.search = function(key) {
        return searchNode(root, key);
    }
    // 中序遍历
    this.inOrderTraverse = function(callback) {
        inOrderTraverseNode(root, callback);
    }
    // 先序遍历
    this.preOrderTraverse = function(callback) {
        preOrderTraverseNode(root, callback);
    }
    // 后序遍历
    this.postOrderTraverse = function(callback) {
        postOrderTraverseNode(root, callback)
    }
    this.min = function() {
        if (root) {
            let min = root.left;
            while(min.left !== null) {
                min = min.left;
            }
            return min.key;
        }
        return null;
    }
    this.max = function() {
        if (root) {
            let max = root.right;
            while(max.right !== null) {
                max = max.right;
            }
            return max.key;
        }
    }
    // 移除一个节点
    this.remove = function(key) {
        root = removeNode(root, key);
    }
    this.print = function() {
        console.log(root);
    }
}

var tree = new BinarySearchTree();
// 遍历打印辅助函数
function print(key) {
    console.log(key);
}
tree.insert(11);
tree.print();
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.print();
// tree.inOrderTraverse(print);
// tree.preOrderTraverse(print);
// tree.postOrderTraverse(print);
console.log('------------------------------------');
tree.remove(11);
tree.print();

// console.log('min:' + tree.min())
// console.log('max:' + tree.max())
// console.log(tree.search(3));
// console.log(tree.search(32));

