import { CorePiece } from "./pieces";


let standardLayout = [
    ['bC', 'bK', 'bB', 'bQ', 'bK', 'bB', 'bK', 'bC'],
    ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
    ['wC', 'wK', 'wB', 'wQ', 'wK', 'wB', 'wK', 'wC'],
];
standardLayout.topLeftBlack=true;
Object.freeze(standardLayout);


class BoardLayout {

    constructor(toCopy) {
        if(toCopy) {
            this._corePieces = toCopy._corePieces;
            this._topPieces = toCopy._corePieces;
        } else {
            this._corePieces = standardLayout.map(subArray => subArray.map(
                name => (name ? new CorePiece({ name: name }) : null)
            ));
            this._topLeftBlack = false;
        }

        Object.seal(this);
    }

    get nRows() {return this._corePieces.length;}
    get nCols() {return this._corePieces[0].length;}

    // Get or set the core piece at the specified square. Null represents an emoty square.
    corePiece(row, col, newPiece) {
        if(this._corePieces[row][col] === undefined) {
            throw new Error(`Invalid row or column number: ${row} ${col}`)
        }

        if(newPiece !== undefined) {
            this._corePieces[row][col] = newPiece; 
        }

        return this._corePieces[row][col];
    }

    isBlack(row, col) {
        const asTopLeft = (row + col) % 2 === 0;
        return asTopLeft ? this._topLeftBlack : !this._topLeftBlack;
    }

   findCorePiecebyId(id) {
        for(let row = 0; row < this.nRows; ++row) {
            for(let col = 0; col < this.nCols; ++col) {
                const cp = this._corePieces[row][col];
                if(cp && cp.id === id) {
                    return {row:row, col:col, piece:cp};
                }
            }
        }
    
        return null;
    }
}

export {BoardLayout};