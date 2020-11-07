import React from 'react';
import { useDrop } from 'react-dnd';
import { itemTypes } from './constants';
import { Piece } from './piece';

type KLUDGE = any;

interface Props {
    color?: 'black' | 'white';
}

class SimpleSquare extends React.PureComponent<Props> {
    render() {
        const color = this.props.color;
        const children = this.props.children;

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

function DroppableSquare(options:
    {
        corePiece: KLUDGE,
        gameOptions: KLUDGE,
        color: 'black' | 'white',
        row: number,
        col: number,
    }) {

    const { corePiece, gameOptions, color, row, col} = options;

    const [, drop] = useDrop({
        accept: itemTypes.PIECE,
        drop: (item: KLUDGE) => gameOptions.movePiece(item.id, row, col),
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