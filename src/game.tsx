// Information about games that is indepantant of rendering */

import React, { useState } from 'react';
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

let corePieceFactory = new CorePieceFactory();
let untypedStateManager: any;  //KLUDGE

const Game : React.FC = () => {

    const [state, setReactState] = useState({
        ...makeBoardState(defaultLayoutName, corePieceFactory),
        numberRowsFromTop: false,
    });

    if(!untypedStateManager) {
        untypedStateManager = new StateManager(state);
    }
    let stateManager: StateManager<typeof state> = untypedStateManager;

    // componentDidMount() {
    //     document.title = 'Chess';
    // }

    const findOffBoardPiece = (pieceId: CorePieceId) => {
        // Kludge: p should never be null
        let piece = state.copyablePiecesTop.find(p => p && p.id === pieceId);
        if (!piece) {
            piece = state.copyablePiecesBottom.find(p => p && p.id === pieceId);
        }

        return piece;
    }

    const doSetState = (newState: Object) => {

        // if(!equivalentState(state, stateManager.state)) {
        //     console.log("state", state, "tateManager.state", stateManager.state);
        //     throw new Error("StateManager out of sync with client");
        // }
    
        stateManager.setState(newState);
        setReactState(stateManager.state);
    }
    

    const gameControl = {

        canUndo: stateManager.canUndo,
        canRedo: stateManager.canRedo,

        undo: () => { setReactState(stateManager.undo());},
        redo: () => { setReactState(stateManager.redo());},
        restart: () => { setReactState(stateManager.restart());},

        numberRowsFromTop: state.numberRowsFromTop,

        setBoardLayout: (layoutName: BoardLayoutName) => {
            doSetState(makeBoardState(layoutName, corePieceFactory));
        },

        boardLayoutName: () => state.layoutName,


        clear: () => {
            doSetState({
                boardLayout: state.boardLayout.copy().clearSquares()
            });
        },

        flip: () => {
            doSetState({
                boardLayout: state.boardLayout.copy().reserveRows(),
                copyablePiecesTop: state.copyablePiecesBottom,
                copyablePiecesBottom: state.copyablePiecesTop,
                numberRowsFromTop: !state.numberRowsFromTop,
            });
        },

        movePiece: (pieceId: CorePieceId, row: number, col: number) => {
            let newBoardLayout = state.boardLayout.copy();

            const bp = newBoardLayout.findCorePiecebyId(pieceId);
            if (bp) {
                if (row !== bp.row || col !== bp.col) {
                    newBoardLayout.setCorePiece(row, col, bp.piece);
                    newBoardLayout.setCorePiece(bp.row, bp.col, null);
                    doSetState({ boardLayout: newBoardLayout, });
                }
            } else {
                let obp = findOffBoardPiece(pieceId);

                if (!obp) {
                    throw new Error(`Piece with id ${pieceId} not found`);
                }

                const copiedPiece = corePieceFactory.copy(obp);
                newBoardLayout.setCorePiece(row, col, copiedPiece);
                doSetState({ boardLayout: newBoardLayout, });
            }
        },

        dragEnd: (pieceId: CorePieceId, dropped: boolean) => {
            if (!dropped) {
                // The piece was dragged off the board. Now clear it.
                const bp = state.boardLayout.findCorePiecebyId(pieceId);
                if (bp) {
                    let newBoardLayout = state.boardLayout.copy();
                    newBoardLayout.setCorePiece(bp.row, bp.col, null);

                    doSetState({
                        boardLayout: newBoardLayout,
                    })
                }
            }
        },

        dragBehaviour: (pieceId: CorePieceId) => {
            const onBoard = Boolean(state.boardLayout.findCorePiecebyId(pieceId));

            return {
                move: onBoard,
                copy: !onBoard,
            };
        },
    }

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <div className="game">

                    <RowOfPieces
                        corePieces={state.copyablePiecesTop}
                        gameOptions={gameControl}
                    />

                    <Board
                        layout={state.boardLayout}
                        gameOptions={gameControl}
                    />

                    <RowOfPieces
                        corePieces={state.copyablePiecesBottom}
                        gameOptions={gameControl}
                    />
                </div>
            </DndProvider>
            <GameControl gameOptions={gameControl} />
        </>
    );
}

export { Game }