const Dictionary = require('./map');
const Queue = require('./qeue');
const Stack = require('./stack');

const initializeColor = (vertices) => {
    const colors = [];
    vertices.forEach(vertex => {
        colors[vertex] = 'white';
    });
    return colors;
};
const printNode = (value) => console.log(`Visited vertex: ${value}`);
const dfsVisit = (vertex, colors, cb, adjList, d, f, p, time) => {
    console.log('discovered ' + vertex);
    colors[vertex] = 'grey';
    d[vertex] = ++time;
    const neighbours = adjList.get(vertex);
    neighbours.forEach(neighbor => {
        const w = neighbor;
        if (colors[w] === 'white') {
            p[w] = vertex;
            dfsVisit(w, colors, cb, adjList, d, f, p, time);
        }
    });

    colors[vertex] = 'black';
    f[vertex] = ++time;
    console.log('explored ' + vertex);
};
class Graph {
    constructor() {
        this._vertices = [];
        this._adjList = new Dictionary();
    }

    addVertex(vertex) {
        this._vertices.push(vertex);
        this._adjList.set(vertex, []);
    }
    addEdge(vertex1, vertex2) {
        this._adjList.get(vertex1).push(vertex2);
        this._adjList.get(vertex2).push(vertex1);
    }
    toString() {
        let string = '';
        this._vertices.forEach(vertex => {
            string += vertex + ' -> ';
            const neighbors = this._adjList.get(vertex);
            neighbors.forEach(neighbor => {
               string += neighbor + ' ';
            });
            string += '\n';
        })
        return string;
    }
    bfs(vertex, cb) {
        const colors = initializeColor(this._vertices);
        const queue = new Queue();
        const distance = [];
        const pred = [];
        queue.enque(vertex);

        this._vertices.forEach(vertex => {
           distance[vertex] = 0;
           pred[vertex] = null;
        });

        while (!queue.isEmpty()) {
            const u = queue.deque();
            const neighbors = this._adjList.get(u);
            colors[u] = 'grey';
            neighbors.forEach(neighbor => {
                const w = neighbor;
                if (colors[w] === 'white') {
                    colors[w] = 'grey';
                    distance[w] = distance[u] + 1;
                    pred[w] = u;
                    queue.enque(w);
                }
            });
            colors[u] = 'black';
            if (cb) {
                cb(u);
            }
        }
        return {
            distances: distance, predecessors: pred
        }
    }
    dfs(cb) {
        const colors = initializeColor(this._vertices);
        const d = [];
        const f = [];
        const p = [];
        let time = 0;
        this._vertices.forEach(vertex => {
            f[vertex] = 0;
            d[vertex] = 0;
            p[vertex] = null;

        });
        this._vertices.forEach(vertex => {
           if (colors[vertex] === 'white') {
               dfsVisit(vertex, colors, cb, this._adjList, d, f, p, time);
           }
        });
        return {
            discovery: d, finished: f, predecessors: p
        }
    }
}

