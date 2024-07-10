import React from "react";
import '../css/Node.css'
function Node({
    col,
    isFinish,
    isStart,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    row
    })
    {
    // console.log(onMouseClick)
    // console.log(onMouseClick());
    let extraClass=(isFinish)?"end":(isStart)?"start":(isWall)?"wall":"";
    return(<div
    id={`node-${row}-${col}`}
    className={`node ${extraClass}`}
    onMouseDown={onMouseDown}
    onMouseEnter={onMouseEnter}
    onMouseUp={onMouseUp}
    >

    </div>);
}

export default Node;