import './game.css';

let observer = null;
let  knightPosition = [0,0];

function setObserver(o) {
    if(observer) {
        throw new Error("Multiple observers not supported");
    }
    
    observer = o;
    observer(knightPosition)
}

function knightMove(toRow, toCol) {
    knightPosition = [toRow, toCol];
    observer(knightPosition)
}


export { setObserver, knightMove }