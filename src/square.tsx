import React from 'react';
import { useDrop } from 'react-dnd';
import { itemTypes } from './constants';
import { Piece } from './piece';

class SimpleSquare extends React.PureComponent {
    render() {
        const { color, children } = this.props;

        let className = 'square';
        if (color) {
            if(color === 'black') {
                className += ' black-square';
            } else if(color === 'white') {
                className += ' white-square';
            } else {
                throw new Error(`Unrecognised square color: ${color}`)
            }
        }
        
        return (
            <div className='square-placeholder'>
                <div className={className}>
                    {children}
                </div>
           </div>
        );
    }
}

function DroppableSquare({ corePiece, gameOptions, color, row, col }) {
    const [, drop] = useDrop({
        accept: itemTypes.PIECE,
        drop: item => gameOptions.movePiece(item.id, row, col),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })
    return (
        <div ref={drop}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            <SimpleSquare color={color}>
                {corePiece ? <Piece corePiece={corePiece} gameOptions={gameOptions} /> : null}
            </SimpleSquare>

        </div>

    );
}

export {SimpleSquare, DroppableSquare};