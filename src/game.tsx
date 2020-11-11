// Information about games that is indepantant of rendering */

import React, { useState, useEffect, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BoardLayout } from './board_layout';
import { Board } from './board';
import { SimpleSquare } from './square'
import { CorePiece, CorePieceFactory, CorePieceId } from './core-piece';
import { Piece } from './piece';
import GameControl from './game_control';
import startingLayouts from './starting_layouts';
import { defaultLayoutName } from './starting_layouts';
import StateManager from './state_manager';
// import { equivalentState } from './tools'

type BoardLayoutName = keyof typeof startingLayouts;

function RowOfPieces({ corePieces, gameOptions }: {
    corePieces: Array<CorePiece | null>,
    gameOptions: any, // KLUDGE
}) {
    return (
        <div className='row-of-pieces'>
            {corePieces.map(
                (cp, index) => (
                    <SimpleSquare key={index}>
                        {/* Kludge cp should never be null */}
                        { cp ? <Piece corePiece={cp} gameOptions={gameOptions} /> : null}
                    </SimpleSquare>
                )
            )}
        </div>
    );
}


function makeBoardState(name: BoardLayoutName, cpf: CorePieceFactory) {

    const makeCorePiece = (name: string | null) => (name ? cpf.make(name) : null);

    const layout = startingLayouts[name];
    if (!layout) {
        throw new Error(`Unrecognised layout name: ${name}`)
    }

    const pieces = layout.board.map((row: Array<string | null>) => row.map(makeCorePiece));

    return {
        copyablePiecesTop: layout.copyableTop.map(makeCorePiece),
        boardLayout: new BoardLayout(pieces, layout.topLeftBlack),
        copyablePiecesBottom: layout.copyableBottom.map(makeCorePiece),
        layoutName: name,
    };
}


const Game : React.FC = () => {

    let corePieceFactory = useRef(new CorePieceFactory()).current;

    useEffect(() => {document.title = 'Chess'}, []);

    const [gameState, setGameState] = useState(makeBoardState(defaultLayoutName, corePieceFactory));
        
    const [reverseRowOrder, setReverseRowOrder] = useState(false);
    

    let gameStateManager = useRef(new StateManager(gameState)).current;

    const findOffBoardPiece = (pieceId: CorePieceId) => {
        // Kludge: p should never be null
        let piece = gameState.copyablePiecesTop.find(p => p && p.id === pieceId);
        if (!piece) {
            piece = gameState.copyablePiecesBottom.find(p => p && p.id === pieceId);
        }

        return piece;
    }

    const doSetGameState = (newState: Object) => {

        // if(!equivalentState(gameState, gameStateManager.gameState)) {
        //     console.log("gameState", gameState, "tateManager.gameState", gameStateManager.gameState);
        //     throw new Error("StateManager out of sync with client");
        // }
    
        gameStateManager.setState(newState);
        setGameState(gameStateManager.state);
    }
    

    const gameControl = {

        canUndo: gameStateManager.canUndo,
        canRedo: gameStateManager.canRedo,

        undo: () => { setGameState(gameStateManager.undo());},
        redo: () => { setGameState(gameStateManager.redo());},
        restart: () => { setGameState(gameStateManager.restart());},

        reverseRowOrder: reverseRowOrder,

        setBoardLayout: (layoutName: BoardLayoutName) => {
            doSetGameState(makeBoardState(layoutName, corePieceFactory));
        },

        boardLayoutName: () => gameState.layoutName,


        clear: () => {
            doSetGameState({
                boardLayout: gameState.boardLayout.copy().clearSquares()
            });
        },

        flip: () => {
            setReverseRowOrder(!reverseRowOrder);
        },

        movePiece: (pieceId: CorePieceId, row: number, col: number) => {
            let newBoardLayout = gameState.boardLayout.copy();

            const bp = newBoardLayout.findCorePiecebyId(pieceId);
            if (bp) {
                if (row !== bp.row || col !== bp.col) {
                    newBoardLayout.setCorePiece(row, col, bp.piece);
                    newBoardLayout.setCorePiece(bp.row, bp.col, null);
                    doSetGameState({ boardLayout: newBoardLayout, });
                }
            } else {
                let obp = findOffBoardPiece(pieceId);

                if (!obp) {
                    throw new Error(`Piece with id ${pieceId} not found`);
                }

                const copiedPiece = corePieceFactory.copy(obp);
                newBoardLayout.setCorePiece(row, col, copiedPiece);
                doSetGameState({ boardLayout: newBoardLayout, });
            }
        },

        dragEnd: (pieceId: CorePieceId, dropped: boolean) => {
            if (!dropped) {
                // The piece was dragged off the board. Now clear it.
                const bp = gameState.boardLayout.findCorePiecebyId(pieceId);
                if (bp) {
                    let newBoardLayout = gameState.boardLayout.copy();
                    newBoardLayout.setCorePiece(bp.row, bp.col, null);

                    doSetGameState({
                        boardLayout: newBoardLayout,
                    })
                }
            }
        },

        dragBehaviour: (pieceId: CorePieceId) => {
            const onBoard = Boolean(gameState.boardLayout.findCorePiecebyId(pieceId));

            return {
                move: onBoard,
                copy: !onBoard,
            };
        },
    }

    const copyablePieces = (showAtTop: boolean) => {
        const top = reverseRowOrder ? !showAtTop : showAtTop;

        return top ? gameState.copyablePiecesTop : gameState.copyablePiecesBottom;
    }

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <div className="game">

                    <RowOfPieces
                        corePieces={copyablePieces(true)}
                        gameOptions={gameControl}
                    />

                    <Board
                        layout={gameState.boardLayout}
                        gameOptions={gameControl}
                    />

                    <RowOfPieces
                        corePieces={copyablePieces(false)}
                        gameOptions={gameControl}
                    />
                </div>
            </DndProvider>
            <GameControl gameOptions={gameControl} />
        </>
    );
}

export { Game }