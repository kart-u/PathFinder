
import { useState } from "react";
import React from "react";
import Node from "./Node/Node.jsx"
import "./Pathfinder.css"
import dijkstra from "./Algorithms/dijkstra.js";
import dfs from "./Algorithms/DFS.js";
import bfs from "./Algorithms/BFS.js";
import Astar from "./Algorithms/A.js";

const COLUMN=35;
const ROW=15;

let start= false,end=false;
function Pathfinder(props){

const [node , setGrid]=useState(generateGrid());
const [mousepress,setMousepress]=useState(false);
const [algo,setAlgorithm] = useState();
const [algoName,setAlgorithmName] = useState("Algorithms");

function generateGrid(){
    let grid=[]
    for(let i=0;i<ROW;i++){
        let first=[];
        for(let j=0;j<COLUMN;j++){
            first.push({
            row:i,
            col:j,
            isFinish:false,
            isStart:false,
            isWall:false,
            weight:1,
            visited:false,
            parent:null
            })
        }
        grid.push(first);
    }
    return grid;
}
const handleMouseDown = (row, col) => {
    if (algoName !== "Algorithms") {
        setMousepress(true);
        setGrid(prevGrid => {
            const newGrid = prevGrid.map((gridRow, rowIndex) =>
                gridRow.map((cell, colIndex) => {
                    if (rowIndex === row && colIndex === col) {
                        const updatedCell = { ...cell };
                        if (start !== false) {
                            if (updatedCell.isStart) { return updatedCell; }
                            if (end !== false) {
                                if ((algoName==="Dijkstra"||algoName==="A*")) {
                                    updatedCell.isWall = !cell.isWall;
                                    updatedCell.weight = 20;
                                }
                            }
                            else {
                                updatedCell.isFinish = true;
                                end = [rowIndex, colIndex];
                            }
                        }
                        else {
                            updatedCell.isStart = true
                            start = [rowIndex, colIndex];
                        }

                        return updatedCell;
                    }
                    else {
                        return cell;
                    }
                })
            );
            return newGrid;
        });
    }
};
const handleMouseUp=()=>{
    setMousepress(false);
}
const handleMouseEnter=(row,col)=>{
    if(mousepress&&(algoName==="Dijkstra"||algoName==="A*")){
        if(start&&end){
            setGrid(prevGrid=>{
                const newGrid=prevGrid.map((rowGrid,rowIndex)=>{
                    return rowGrid.map((div,colIndex)=>{
                        const updatedCell={...div};
                        if(row===rowIndex&&col===colIndex){
                            updatedCell.isWall=!div.isWall;
                            updatedCell.weight=20;
                            return updatedCell;
                        }
                        else{
                            return div;
                        }
                    })
                });
                
                return newGrid;
            });
        }
        return;
    }
    return ;
}
const animate=()=>{
    if(algoName !== "Algorithms") {
        const {  visitedNode } = (algo(node, ROW, COLUMN)) ? algo(node, ROW, COLUMN) : { path: [], visitedNode: [] };
        if (visitedNode !== null) {
            for (let i = 0; i < visitedNode.length; i++) {
                const div = visitedNode[i];
                const element = document.getElementById(`node-${div[0]}-${div[1]}`);
                let st = element.classList.contains("start");
                let fn = element.classList.contains("end");
                let wl = element.classList.contains("wall");
                if (st || fn || wl) {
                    continue;
                }
                setTimeout(() => {
                    element.classList.add("visited");
                }, 25 * i);
            }
        }
    }
    else return console.log("choose-Algo");
}
const animatePath=()=>{
    //console.log(dfs(node,ROW,COLUMN));
    // console.log(algoName);
    if (algoName !== "Algorithms") {
        const { path } = (algo(node, ROW, COLUMN)) ? algo(node, ROW, COLUMN) : { path: [], visitedNode: [] };
        if (path !== null) {
            for (let i = 0; i < path.length; i++) {
                const div = path[i];
                const element = document.getElementById(`node-${div[0]}-${div[1]}`);
                let st = element.classList.contains("start");
                let fn = element.classList.contains("end");
                let wl = element.classList.contains("wall");
                if (st || fn || wl) {
                    continue;
                }
                setTimeout(() => {
                    element.classList.add("path");
                }, 25 * i);
            }
        }
    }
}
const reset=()=>{
    if(algoName==="Algorithms"){return;}
    start=false;
    end=false;
    const {path,visitedNode}=(algo(node,ROW,COLUMN))?algo(node,ROW,COLUMN):{path:[],visitedNode:[]};
    if (path.length!==0) {
        for (let i = 0; i < path.length; i++) {
            const div = path[i];
            const element = document.getElementById(`node-${div[0]}-${div[1]}`);
            if (element.classList.contains("path")) { element.classList.remove("path"); }
        }
    }
    if (visitedNode.length!==0) {
        for (let i = 0; i < visitedNode.length; i++) {
            const div = visitedNode[i];
            const element = document.getElementById(`node-${div[0]}-${div[1]}`);
            if (element.classList.contains("visited")) { element.classList.remove("visited"); }
        }
    }
    setGrid(()=>generateGrid());
}
const dijkstraSet=()=>{
    reset();
    setAlgorithm(()=>dijkstra);
    setAlgorithmName("Dijkstra");
}
const bfsSet=()=>{
    reset();
    setAlgorithm(()=>bfs);
    setAlgorithmName("BFS");
}
const dfsSet=()=>{
    reset();
    setAlgorithm(()=>dfs);
    setAlgorithmName("DFS");
}
const AstarSet=()=>{
    reset();
    setAlgorithm(()=>Astar);
    setAlgorithmName("A*");
}
return(
<div>
    <div className="p-5 navbar">
        <ul className="flex items-top justify-center space-x-72">
            <li className="flex space-x-16">
            <div className="inline-block text-2xl">
            Pathfinding Visualizer
            </div>
            <div className="dropdown relative justify-center">
                <button className="justify-center dropbtn pt-1 border-2 pl-2 pr-2 pb-2 rounded-full border-slate-500">{algoName}</button>
                <div className="dropdown-content absolute z-50">
                    <button className="px-5 py-2 border-x-2 border-y" onClick={()=>dijkstraSet()}>Dijkstra</button>
                    <button className="px-5 py-2 border-x-2 border-y"onClick={()=>AstarSet()}>A*</button>
                    <button  className="px-5 py-2 border-x-2 border-y"onClick={()=>dfsSet()}>DFS</button>
                    <button className="px-5 py-2 border-x-2 border-y rounded-b-lg"onClick={()=>bfsSet()}>BFS</button>
                </div>
            </div>
            </li>
            <ul className="flex items-top space-x-2.5 pt-1">
                <li><button className="visualize"onClick={()=>animate()}>Visualize</button></li>
                <li><button className="showPath" onClick={()=>animatePath()}>Show Path</button></li>
                <li><button className="reset" onClick={()=>reset()}>Reset</button></li>
            </ul>
        </ul>
    </div>
    <div className="grid">
        {
            node.map((row,rowIndex)=>{
                return <div key={`${rowIndex}`}>
                    {row.map((nodes)=>{
                        const {col,isFinish,isStart,isWall,row} = nodes
                        return<Node
                        row={row}
                        col={col}
                        mousepress={mousepress}
                        onMouseDown={()=>{handleMouseDown(row,col)}}
                        onMouseEnter={()=>{handleMouseEnter(row,col)}}
                        onMouseUp={()=>{handleMouseUp()}}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        key={`node-${row}-${col}`}
                        />

                    })}
                </div>
            })
        }
    </div>
</div>
);

}
export default Pathfinder