// 图
let Dictionary = require('./dictionary');
let Queue = require('./queue');
let Stack = require('./stack');
// console.log(Dictionary);
console.log('====================================================');


function Graph() {
    let vertices = [];  // 存储图中所有顶点的名称
    let adjList = new Dictionary(); // 使用字典存储邻接表
    let initializeColor = function() {
        let color = [];
        vertices.forEach(vertice => {
            // 1 白色为该顶点还没被访问过
            // 2 灰色为该顶点已经被访问过，但还没被探索过
            // 3 黑色为该顶点已经被探索过
            color[vertice] = 'white';
        })
        return color;
    }
    // 深度优先遍历辅助函数
    function dfsVisit(u, color, callback) {
        color[u] = 'grey';
        if (callback) {
            callback(u);
        }
        let neighbors = adjList.get(u);
        neighbors.forEach(neighbor => {
            if(color[neighbor] === 'white') {
                dfsVisit(neighbor, color, callback);
            }
        })
        color[u] = 'black';
    }
    // 添加顶点
    this.addVertex = function(v) {
        vertices.push(v);
        adjList.set(v, []);
    }
    // 添加边
    this.addEdge = function(v, w) { // 传入两个顶点
        adjList.get(v).push(w); // 实现的是无向图
        adjList.get(w).push(v);
    }
    // 广度优先遍历
    this.bfs = function(v, callback) {
        let color = initializeColor(),
            queue = new Queue();
        queue.enqueue(v);   // 顶点是必须的

        while(!queue.isEmpty()) {
            let u = queue.dequeue();
            neighbors = adjList.get(u); // 取出其相邻所有相邻点
            color[u] = 'grey';
            neighbors.forEach(neighbor => {
                if (color[neighbor] === 'white') {  // 周边的点如果是还没被访问过的
                    color[neighbor] = 'grey';
                    queue.enqueue(neighbor);
                }
            })
            color[u] = 'black'; // u 已经被探索完成
            if (callback) {
                callback(u);
            }
        }
    }
    // 广度优先遍历,使用BFS寻找最短路径
    this.BFS = function(v) {
        let color = initializeColor(),
            queue = new Queue(),
            d = [], // 表示距离
            pred = [];  // 表示前朔点
        queue.enqueue(v);   // 顶点是必须的

        vertices.forEach(vertice => {
            d[vertice] = 0;
            pred[vertice] = null;
        })

        while(!queue.isEmpty()) {
            let u = queue.dequeue();
            neighbors = adjList.get(u); // 取出其相邻所有相邻点
            color[u] = 'grey';
            neighbors.forEach(neighbor => {
                if (color[neighbor] === 'white') {  // 周边的点如果是还没被访问过的
                    color[neighbor] = 'grey';
                    d[neighbor] = d[u] + 1;
                    pred[neighbor] = u;
                    queue.enqueue(neighbor);
                }
            })
            color[u] = 'black'; // u 已经被探索完
        }

        return {
            distance: d,
            predecessors: pred
        }
    }
    // 深度优先遍历
    this.dfs = function(callback) {
        var color = initializeColor();
        vertices.forEach(vertice => {
            if (color[vertice] === 'white') {
                dfsVisit(vertice, color, callback);
            }
        })
    }
    this.toString = function() {
        let s = '';
        for (let i = 0; i < vertices.length; i++) {
            s += vertices[i] + ' -> '
            let neighbors = adjList.get(vertices[i]);
            neighbors.forEach(neighbor => {
                s += neighbor + ' '
            });
            s += '\n';
        }
        return s;
    }
}

let graph = new Graph();
let myVertices = ['A','B','C','D','E','F','G','H','I']; //{7} 
for (let i=0; i<myVertices.length; i++){ //{8}
    graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'B'); //{9}
graph.addEdge('A', 'C'); 
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
console.log(graph.toString());
console.log('-----------------------');
 
function printNode(value) {
    console.log('Visited Vertex: ' + value);
}
graph.bfs('A', printNode);

var shortestPathA = graph.BFS('A');
console.log(shortestPathA);

var fromVertex = myVertices[0];

for (var i = 1; i < myVertices.length; i++) {
    let path = new Stack();
    let toVertex = myVertices[i];
    let v = toVertex;
    while(v !== fromVertex) {   // 遍历寻找目标值
        path.push(v);
        v = shortestPathA.predecessors[v];
    }
    path.push(fromVertex);
    var s = path.pop();
    while(!path.isEmpty()) {
        s += ' - ' + path.pop();
    }
    console.log(s);
}
console.log('测试深度优先遍历');
// 测试深度优先遍历
graph.dfs(printNode);