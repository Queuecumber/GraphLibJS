GraphLibJS
=======

Directed graphs in JavaScript using a sparse (adjacency list) representation

Example
-------

    var graphlib = require('./graphlib');
  
    var O = new graphlib.Node('O');
    var A = new graphlib.Node('A');
    var B = new graphlib.Node('B');
    var C = new graphlib.Node('C');
    var D = new graphlib.Node('D');
    var E = new graphlib.Node('E');
    var F = new graphlib.Node('F');
    var T = new graphlib.Node('T');
    
    O.edges.push(new graphlib.Edge(A, 2));
    O.edges.push(new graphlib.Edge(B, 5));
    O.edges.push(new graphlib.Edge(C, 4));
    
    A.edges.push(new graphlib.Edge(F, 12));
    A.edges.push(new graphlib.Edge(D, 7));
    A.edges.push(new graphlib.Edge(B, 2));
    
    B.edges.push(new graphlib.Edge(D, 4));
    B.edges.push(new graphlib.Edge(E, 3));
    
    C.edges.push(new graphlib.Edge(B));
    C.edges.push(new graphlib.Edge(E, 4));
    
    D.edges.push(new graphlib.Edge(T, 5));
    D.edges.push(new graphlib.Edge(E, 1));
    
    E.edges.push(new graphlib.Edge(T, 7));
    
    F.edges.push(new graphlib.Edge(T, 3));
    
    var graph = new graphlib.Graph();
    graph.nodes.push(O);
    graph.nodes.push(A);
    graph.nodes.push(B);
    graph.nodes.push(C);
    graph.nodes.push(D);
    graph.nodes.push(E);
    graph.nodes.push(F);
    graph.nodes.push(T);
    
    var testGetNode = graph.node('A');
    console.log(testGetNode);
    
    var testGetEdge = testGetNode.edge('F');
    console.log(testGetEdge);
    
    var path = graph.shortestPath(O, T);
    
    path.nodes.forEach(function (n)
    {
        console.log(n.id + ': ' + path.distances[n.id]);
    });
    
    var testPathNode = path.node('D');
    console.log(testPathNode);
    console.log(path.distances['D']);
