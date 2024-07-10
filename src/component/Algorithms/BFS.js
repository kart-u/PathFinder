const PriorityQueue = require("js-priority-queue");

function valid(x,y,ROW,COL){
    return(x>=0&&y>=0&&x<ROW&&y<COL); 
}
function create2DArray(rows, cols, initialValue) {
    return Array.from({ length: rows }, () => Array(cols).fill(initialValue));
}
function bfs(grid,ROW,COL){
    const visitedNode=[];
    let visited=create2DArray(ROW,COL,false);
    let start=null,end=null;
    const newGrid=grid;
    for(let i=0;i<ROW;i++){
        for(let j=0;j<COL;j++){
            if(newGrid[i][j].isStart){
                start=[i,j];
            }
            if(newGrid[i][j].isFinish){
                end=[i,j];
            }
        }
    }
    if(start===null||end===null){
        return null;
    }
    const pq = new PriorityQueue({ comparator: (a, b) => a.priority - b.priority });
    const [x1,y1]=start;
    visited[x1][y1]=true;
    pq.queue({element:[x1,y1],priority:newGrid[x1][y1].weight});
    //visitedNode.push([x1,y1]);
    // console.log(pq.peek());
    while(pq.length!=0){
        const {element,priority}=pq.dequeue();
        const [x,y]=element;
        //console.log(newGrid[x+1][y].visited);
        if(valid(x+1,y,ROW,COL)&&!visited[x+1][y]){
          pq.queue({element:[x+1,y],priority:newGrid[x+1][y].weight+priority});
          visited[x+1][y]=true;
          newGrid[x+1][y].parent=element;
          if(x+1===end[0]&&y===end[1]){break;}
          visitedNode.push([x+1,y]);
          
        }
        if(valid(x-1,y,ROW,COL)&&!visited[x-1][y]){
          pq.queue({element:[x-1,y],priority:newGrid[x-1][y].weight+priority});
          visited[x-1][y]=true;
          newGrid[x-1][y].parent=element;
          if(x-1===end[0]&&y===end[1]){break;}
          visitedNode.push([x-1,y]);
        }
        if(valid(x,y+1,ROW,COL)&&!visited[x][y+1]){
          pq.queue({element:[x,y+1],priority:newGrid[x][y+1].weight+priority});
          visited[x][y+1]=true;
          newGrid[x][y+1].parent=element;
          if(x===end[0]&&y+1===end[1]){break;}
          visitedNode.push([x,y+1]);
        }
        if(valid(x,y-1,ROW,COL)&&!visited[x][y-1]){
          pq.queue({element:[x,y-1],priority:newGrid[x][y-1].weight+priority});
          visited[x][y-1]=true;
          newGrid[x][y-1].parent=element;
          if(x===end[0]&&y-1===end[1]){break;}
          visitedNode.push([x,y-1]);
        }
    }
    //console.log(visitedNode);
    const path=[];
    let [i,j]=end;
    while(newGrid[i][j].parent!=null){
        path.push([i,j]);
        [i,j]=newGrid[i][j].parent;
    }
    path.push(start);
    path.reverse();
    return {visitedNode,path};
}

module.exports = bfs;