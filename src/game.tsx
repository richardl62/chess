// Information about games that is indepantant of rendering */

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BoardLayout } from './board_layout';
import { Board } from './board';
import { SimpleSquare } from './square'
import { CorePieceFactory } from './core-piece';
import { Piece } from './piece';
import GameControl from './game_control';
import startingLayouts from './starting_layouts';
import { defaultLayoutName } from './starting_layouts';
import StateManager from './state_manager';

type KLUDGE = any;
function RowOfPieces({ corePieces, gameOptions }: {
    corePieces: KLUDGE,
    gameOptions: KLUDGE,
}) {
    return (
        <div className='row-of-pieces'>
            {corePieces.map(
                (cp: KLUDGE, index: number) => (
                    <SimpleSquare key={index}>
                        <Piece corePiece={cp} gameOptions={gameOptions} />
                    </SimpleSquare>
                )
            )}
        </div>
    );
}

function makeBoardState(name: string, cpf: KLUDGE) {

    const makeCorePiece = (name: string) => cpf.make(name);

    // @ts-ignore - temporary KLUDGE to help with transition to Typescript.
    const layout = startingLayouts[name];
    if (!layout) {
        throw new Error(`Unrecognised layout name: ${name}`)
    }

    const pieces = layout.board.map((row: KLUDGE) => row.map(makeCorePiece));

    return {
        copyablePiecesTop: layout.copyableTop.map(makeCorePiece),
        boardLayout: new BoardLayout(pieces, layout.topLeftBlack),
        copyablePiecesBottom: layout.copyableBottom.map(makeCorePiece),
        layoutName: name,
    };
}

class Game extends React.Component {
    private _corePieceFactory: KLUDGE;
    private stateManager: KLUDGE;

    constructor(props: KLUDGE) {
        super(props);

        let cpf = new CorePieceFactory();
        this._corePieceFactory = cpf;

        this.state = makeBoardState(defaultLayoutName, cpf);
        // @ts-ignore - temporary KLUDGE to help with transition to Typescript.
        this.state.numberRowsFromTop = false;

        this.stateManager = new StateManager({
            getState: () => this.state,
            setState: state => this.setState(state),
        });
    }

    doSetState(newState: KLUDGE) {
        this.stateManager.setState(newState);
    }

    undo() { return this.stateManager.undo(); }
    redo() { return this.stateManager.redo(); }
    restart() { this.stateManager.restart(); }

    get canUndo() { return this.stateManager.canUndo; }
    get canRedo() { return this.stateManager.canRedo; }

    componentDidMount() {
        document.title = 'Chess';
    }

    get numberRowsFromTop() {
        // @ts-ignore - temporary KLUDGE to help with transition to Typescript.
        return this.state.numberRowsFromTop;
    }
    boardLayout(layoutName: string) {

        if (layoutName !== undefined) {
            this.doSetState(makeBoardState(layoutName, this._corePieceFactory));
        }
        // @ts-ignore - temporary KLUDGE to help with transition to Typescript.
        return this.state.layoutName;
    }

    clear() {
        this.doSetState({
            // @ts-ignore - temporary KLUDGE to help with transition to Typescript.
            boardLayout: this.state.boardLayout.copy().clearSquares()
        });
    }

    flip() {
        this.doSetState({
            // @ts-ignore - temporary KLUDGE to help with transition to Typescript.

            boardLayout: this.state.boardLayout.copy().reserveRows(),
            // @ts-ignore - temporary KLUDGE to help with transition to Typescript.

            copyablePiecesTop: this.state.copyablePiecesBottom,
            // @ts-ignore - temporary KLUDGE to help with transition to Typescript.

            copyablePiecesBottom: this.state.copyablePiecesTop,
            // @ts-ignore - temporary KLUDGE to help with transition to Typescript.

            numberRowsFromTop: !this.state.numberRowsFromTop,
        });
    }


    _findOffBoardPiece(pieceId: KLUDGE) {
        // @ts-ignore - temporary KLUDGE to help with transition to Typescript.

        let piece = this.state.copyablePiecesTop.find(p => p.id === pieceId);
        if (!piece) {
            // @ts-ignore - temporary KLUDGE to help with transition to Typescript.

            piece = this.state.copyablePiecesBottom.find(p => p.id === pieceId);
        }

        return piece;
    }

    movePiece(pieceId: KLUDGE, row: number, col: number) {
        // @ts-ignore - temporary KLUDGE to help with transition to Typescript.
        let newBoardLayout = this.state.boardLayout.copy();
        let doSetState = () => this.doSetState({ boardLayout: newBoardLayout, });


        const bp = newBoardLayout.findCorePiecebyId(pieceId);
        if (bp) {
            if (row !== bp.row || col !== bp.col) {
                newBoardLayout.corePiece(row, col, bp.piece);
                newBoardLayout.corePiece(bp.row, bp.col, null);
                doSetState();
            }
        } else {
            let obp = this._findOffBoardPiece(pieceId);

            if (!obp) {
                throw new Error(`Piece with id ${pieceId} not found`);
            }

            const copiedPiece = this._corePieceFactory.copy(obp);
            newBoardLayout.corePiece(row, col, copiedPiece);
            doSetState();
        }
    }

    dragEnd(pieceId: KLUDGE, dropped: boolean) {
        if (!dropped) {
            // The piece was dragged off the board. Now clear it.
            // @ts-ignore - temporary KLUDGE to help with transition to Typescript.
            const bp = this.state.boardLayout.findCorePiecebyId(pieceId);
            if (bp) {
                // @ts-ignore - temporary KLUDGE to help with transition to Typescript.
                let newBoardLayout = this.state.boardLayout.copy();
                newBoardLayout.corePiece(bp.row, bp.col, null);

                this.doSetState({
                    boardLayout: newBoardLayout,
                })
            }
        }
    }

    dragBehaviour(pieceId: KLUDGE) {
        // @ts-ignore - temporary KLUDGE to help with transition to Typescript.
        const onBoard = Boolean(this.state.boardLayout.findCorePiecebyId(pieceId));

        return {
            move: onBoard,
            copy: !onBoard,
        };
    }

    renderMainGame() {
        return (
            <DndProvider backend={HTML5Backend}>
                <div className="game">

                    <RowOfPieces
                        // @ts-ignore - temporary KLUDGE to help with transition to Typescript.
                        corePieces={this.state.copyablePiecesTop}
                        gameOptions={this}
                    />

                    <Board
                        // @ts-ignore - temporary KLUDGE to help with transition to Typescript.
                        layout={this.state.boardLayout}
                        gameOptions={this}
                    />

                    <RowOfPieces
                        // @ts-ignore - temporary KLUDGE to help with transition to Typescript.
                        corePieces={this.state.copyablePiecesBottom}
                        gameOptions={this}
                    />
                </div>
            </DndProvider>
        )
    }

    render() {

        return (
            <>
                {this.renderMainGame()}
                <GameControl gameOptions={this} />
            </>

        )
    }
}

export { Game }
