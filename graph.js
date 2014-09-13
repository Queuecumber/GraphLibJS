// Implementation of a sparse directed graph using adjacency list
var Graph = function ()
{
    this.nodes = [];
};

var Node = function (id, data)
{
    this.edges = [];
    this.data = data;
    this.id = id;
};

var Edge = function (node, cost)
{
    this.node = node;
    this.cost = cost;
};

var Path = function()
{
    this.nodes = [];
    this.distances = {};
};

Graph.prototype.dijkstra = function (source, sink)
{
    var unvisited = {};
    this.nodes.forEach(function (n)
    {
        unvisited[n.id] = { node: n, visited: false, distance: Infinity };
    });

    var o = unvisited[source.id];
    var t = unvisited[sink.id];

    var current = o;
    current.distance = 0;

    var previous = {};

    // Label distances for all nodes reachable from the source, term if we visit the target node
    while(current && current.distance != Infinity && !t.visited)
    {
        current.node.edges
            .filter(function (e)
            {
                return (e.node.id in unvisited);
            })
            .forEach(function (e)
            {
                var neighbor = unvisited[e.node.id];
                var updatedDist = current.distance + e.cost;

                if(neighbor.distance > updatedDist)
                {
                    neighbor.distance = updatedDist;
                    previous[neighbor.node.id] = current;
                }
            });

        current.visited = true;
        delete unvisited[current.node.id];

        // Min distance element
        current = Object.keys(unvisited)
                    .map(function (k) { return unvisited[k]; })
                    .reduce(function (prev, n) { return prev.distance > n.distance ? n : prev; });
    }

    // Reconstruct path
    var path = new Path();

    if(t.visited)
    {
        current = t;
        while(current != o)
        {
            path.nodes.unshift(current.node);
            path.distances[current.node.id] = current.distance;
            current = previous[current.node.id];
        }

        path.nodes.unshift(o.node);
        path.distances[o.node.id] = 0;
    }

    return path;
};

module.exports.Graph = Graph;
module.exports.Node = Node;
module.exports.Edge = Edge;
module.exports.Path = Path;
