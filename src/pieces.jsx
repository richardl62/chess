import React from 'react';
import { useDrag } from 'react-dnd';
import { itemTypes } from './constants';


import SVGPiece from 'react-chess-pieces';


class CorePiece {
  constructor(name, id) {
    this.id = id;
    this.name = name;
    Object.freeze(this);
  }
}

class CorePieceFactory {

  constructor() {
    this._lastUsedId = 0;
  }

  // Input can be a piece to copy, the name of a piece or null
  make(input = null) {

    if (input === null) {
      return null;
    }

    if(input instanceof CorePiece) {
      return this.make(input.name);
    }

    ++this._lastUsedId;

    return new CorePiece(input, this._lastUsedId);
  }
}

function Piece({ corePiece, gameOptions }) {

  const [{ isDragging }, drag ] = useDrag({
    item: {
      type: itemTypes.PIECE,
      id: corePiece.id,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => gameOptions.dragEnd(corePiece.id, monitor.didDrop()),
  });

  if (isDragging && gameOptions.dragBehaviour(corePiece.id).move) {
    /* Hide the original piece when moving */
    return null;
  }
  else {
    return (
      <div
        className='piece-div'
        ref={drag}
      >
        <SVGPiece piece={corePiece.name} />
      </div>
    );
  }
}

export { Piece, CorePieceFactory } 