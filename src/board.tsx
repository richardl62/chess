import React from 'react';
import { DroppableSquare as BoardSquare } from './square';

type KLUDGE = any;

function addHeader(nCols: number, elems: KLUDGE, rowName: string) {
    const key = (elemName: string | number) => rowName + '-' + elemName;
    elems.push(<div key={key('start')} />);
    for (let col = 0; col < nCols; ++col) {
        elems.push(
            <div
                key={key(col)}
                className='board-boarder board-boarder-letter'
            >
                {String.fromCharCode(65+col)}
            </div>
        );
    }
    elems.push(<div key={key('end')} />);
}

function addRow(layout: KLUDGE, row: number, gameOptions: KLUDGE, elems: KLUDGE) {

    let key = (name: string | number) =>  'r' + row + '-' + name;

    let makeBoarderElem = (name: string) => (
        <div
            key={key(name)}
            className='board-boarder board-boarder-number'
        >
            {gameOptions.numberRowsFromTop ? row + 1 : layout.nRows - row}
        </div>
    );

    let makeSquare = (col: number) => (
        <BoardSquare
            // @ts-ignore - temporary KLUDGE to help with transition to Typescript.
            index={col}
            key={key(col)}

            corePiece={layout.corePiece(row, col)}
            gameOptions={gameOptions}

            // This is the 'conceptual' color which must be black or white.
            color={layout.isBlack(row, col) ? 'black' : 'white'}

            row={row}
            col={col}
        />
    )

    elems.push(makeBoarderElem('start'));

    for (let col = 0; col < layout.nCols; ++col) {
        elems.push(makeSquare(col));
    }

    elems.push(makeBoarderElem('end'));
}


function Board({ layout, gameOptions }: {
    layout: KLUDGE,
    gameOptions: KLUDGE
    })
    {
    const nRows = layout.nRows;
    const nCols = layout.nCols;

    let elems: KLUDGE = [];

    addHeader(nCols, elems, 'top');
    for (let row = 0; row < nRows; ++row) {
        addRow(layout, row, gameOptions, elems);
    }
    addHeader(nCols, elems, 'bottom');

    const style = { // For now
        display: 'grid',
        gridTemplateColumns: `repeat(${nCols+2},auto)`,
        gridTemplateRows: `repeat(${nRows+2},auto)`,
    };

    return (
        <div className="board" style={style}>
            {elems}
        </div>
    )

}

export { Board }
