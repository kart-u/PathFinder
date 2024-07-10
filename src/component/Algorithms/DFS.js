function valid(x,y,ROW,COL){
    return(x>=0&&y>=0&&x<ROW&&y<COL); 
}
function create2DArray(rows, cols, initialValue) {
    return Array.from({ length: rows }, () => Array(cols).fill(initialValue));
}
function recur(ROW,COL,x,y,visited,newGrid,end,ck,visitedNode){
    visited[x][y]=true;
    let element=[x,y];
    // console.log(ck);
    if(ck){return;}
    if (valid(x + 1, y, ROW, COL) && !visited[x + 1][y]) {
        if(ck){return;}
        visited[x + 1][y] = true;
        newGrid[x + 1][y].parent = element;
        if (x + 1 === end[0] && y === end[1]) { ck=true;return; }
        visitedNode.push([x + 1, y]);
        recur(ROW, COL, x + 1, y, visited, newGrid,end,ck,visitedNode);
    }
    if (valid(x - 1, y, ROW, COL) && !visited[x - 1][y]) {
        if(ck){return;}
        visited[x - 1][y] = true;
        newGrid[x - 1][y].parent = element;
        if (x - 1 === end[0] && y === end[1]) {ck=true; return; }
        visitedNode.push([x - 1, y]);
        recur(ROW, COL, x - 1, y, visited, newGrid,end,ck,visitedNode);
    }
    if (valid(x, y + 1, ROW, COL) && !visited[x][y + 1]) {
        if(ck){return;}
        visited[x][y + 1] = true;
        newGrid[x][y + 1].parent = element;
        if (x === end[0] && y + 1 === end[1]) {ck=true; return; }
        visitedNode.push([x, y + 1]);
        recur(ROW, COL, x, y + 1, visited, newGrid,end,ck,visitedNode);
    }
    if (valid(x, y - 1, ROW, COL) && !visited[x][y - 1]) {
        if(ck){return;}
        visited[x][y - 1] = true;
        newGrid[x][y - 1].parent = element;
        if (x === end[0] && y - 1 === end[1]) {ck=true; return; }
        visitedNode.push([x, y - 1]);
        recur(ROW, COL, x, y - 1, visited, newGrid,end,ck,visitedNode);
    }
}
function dfs(grid,ROW,COL){
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

    const [x,y]=start;
    let ck=false;
    recur(ROW,COL,x,y,visited,newGrid,end,ck,visitedNode);
    const path=[];
    let [i,j]=end;
    while(newGrid[i][j].parent!=null){
        path.push([i,j]);
        [i,j]=newGrid[i][j].parent;
    }
    path.push(start);
    path.reverse();
    return {visitedNode,path,};
}
module.exports=dfs;