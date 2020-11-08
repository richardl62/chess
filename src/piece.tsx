import React from 'react';
import { useDrag } from 'react-dnd';
import { itemTypes } from './constants';
import { Game } from './game';
import { CorePiece } from './core-piece';

import SVGPiece from 'react-chess-pieces';

interface PieceProps {
  gameOptions: Game;
  corePiece: CorePiece;
}

const Piece : React.FC<PieceProps> = ({ corePiece, gameOptions }) => {

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