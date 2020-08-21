// 自平衡树（AVL树），一种自平衡二叉搜索树，任何一个节点
// 左右两侧子树的高度之差最多为1
// 在添加或者删除一个节点的时候，尽量试着成为一棵完全树
function AdelsonVelskiiLandiTree() {
    let Node  = function(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
    let root = null;
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
                let aux = findMinNode(node.right);
                console.log('aux:', aux);
                node.key = aux.key;
                node.right = removeNode(node.right, aux.key);
                return node;
            }
        }   
    }

    // 计算树的高度辅助函数
    function heightNode(node) {
        if (node === null) {
            return -1;
        } else {
            return Math.max(heightNode(node.left), heightNode(node.right)) + 1;
        }
    }

    // RR 向左的单旋转
    function rotationRR(node) {
        let tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        return tmp;
    }
    // LL 向右的单旋转
    function rotationLL(node) {
        let tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        return tmp;
    }

    // RL 向左的双旋转
    function rotationRL(node) {
        node.right = rotationLL (node.right);
        return rotationRR(node);
    }

    // LR 向右的双旋转
    function rotationLR(node) {
        node.left = rotationRR(node.left);
        return rotationLL(node);
    }

    function insertNode(node, key) {
        if (node === null) {
            node = new Node(key);
        } else if (key < node.key) {
            node.left = insertNode(node.left, key);
            if (node.left !== null) {
                // 确定是否需要平衡
                if ((heightNode(node.left) - heightNode(node.right)) > 1) {
                    if (key < node.left.key) {
                        node = rotationLL(node);
                    } else {
                        node = rotationLR(node);
                    }
                }
            }
        } else if (key > node.key) {
            node.right = insertNode(node.right, key);
            if (node.right !== null) {
                // 确定是否需要平衡
                if ((heightNode(node.right) - heightNode(node.left)) > 1) {
                    if (key > node.right.key) {
                        node = rotationRR(node);
                    } else {
                        node = rotationRL(node);
                    }
                }
            }
        }
        return node;
    }

    // 插入任意一个节点
    this.insert = function(key) {
        root = insertNode(root, key);
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

let avlTree = new AdelsonVelskiiLandiTree();
// 遍历打印辅助函数
function print(key) {
    console.log(key);
}

avlTree.insert(50);
avlTree.insert(30);
avlTree.insert(10);
avlTree.insert(40);
avlTree.insert(70);
avlTree.print();
console.log('-----------------');
avlTree.insert(35);
avlTree.print();
