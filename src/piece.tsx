import React from 'react';
import { useDrag } from 'react-dnd';
import { itemTypes } from './constants';

// @ts-ignore - temporary KLUDGE to help with transition to Typescript.
import SVGPiece from 'react-chess-pieces';

type KLUDGE = any;

function Piece({ corePiece, gameOptions } : {
  corePiece: KLUDGE, gameOptions: KLUDGE, 
  }) {

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

export { Piece } 