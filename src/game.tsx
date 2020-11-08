// Information about games that is indepantant of rendering */

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BoardLayout } from './board_layout';
import { Board } from './board';
import { SimpleSquare } from './square'
import { CorePiece, CorePieceFactory, CorePieceId} from './core-piece';
import { Piece } from './piece';
import GameControl from './game_control';
import startingLayouts from './starting_layouts';
import { defaultLayoutName } from './starting_layouts';
import StateManager from './state_manager';

type BoardLayoutName = keyof typeof startingLayouts;

function RowOfPieces({ corePieces, gameOptions }: {
    corePieces: Array<CorePiece|null>,
    gameOptions: Game,
}) {
    return (
        <div className='row-of-pieces'>
            {corePieces.map(
                (cp, index) => (
                    <SimpleSquare key={index}>
                        {/* Kludge cp should never be null */}
                        { cp ? <Piece corePiece={cp} gameOptions={gameOptions} /> : null }
                    </SimpleSquare>
                )
            )}
        </div>
    );
}

interface PartialGameState {
    numberRowsFromTop?: boolean;
    layoutName?: BoardLayoutName;
    boardLayout?: BoardLayout;

    copyablePiecesTop?: Array<CorePiece|null>;
    copyablePiecesBottom?: Array<CorePiece|null>;
}

interface GameState {
    numberRowsFromTop: boolean;
    layoutName: BoardLayoutName;
    boardLayout: BoardLayout;

    copyablePiecesTop: Array<CorePiece|null>;
    copyablePiecesBottom: Array<CorePiece|null>;
}

function makeBoardState(name: BoardLayoutName, cpf: CorePieceFactory) {

    const makeCorePiece = (name: string | null) => (name ? cpf.make(name) : null);

    const layout = startingLayouts[name];
    if (!layout) {
        throw new Error(`Unrecognised layout name: ${name}`)
    }

    const pieces = layout.board.map((row: Array<string|null>) => row.map(makeCorePiece));

    return {
        copyablePiecesTop: layout.copyableTop.map(makeCorePiece),
        boardLayout: new BoardLayout(pieces, layout.topLeftBlack),
        copyablePiecesBottom: layout.copyableBottom.map(makeCorePiece),
        layoutName: name,
    };
}


interface GameProps {

}

class Game extends React.Component<GameProps, GameState> {
    private _corePieceFactory: CorePieceFactory;
    private stateManager: StateManager;

    constructor(props: GameProps) {
        super(props);

        let cpf = new CorePieceFactory();
        this._corePieceFactory = cpf;
        
        this.state = {
            ...makeBoardState(defaultLayoutName, cpf),
            numberRowsFromTop: false,
        };

        this.stateManager = new StateManager({
            getState: () => this.state,
            setState: state => this.setState(state),
        });
    }

    private doSetState(newState: PartialGameState) {
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
        return this.state.numberRowsFromTop;
    }

    setBoardLayout(layoutName: BoardLayoutName) {
        this.doSetState(makeBoardState(layoutName, this._corePieceFactory));

    }

    boardLayoutName() {
        return this.state.layoutName;
    }

    clear() {
        this.doSetState({
            boardLayout: this.state.boardLayout.copy().clearSquares()
        });
    }

    flip() {
        this.doSetState({
            boardLayout: this.state.boardLayout.copy().reserveRows(),
            copyablePiecesTop: this.state.copyablePiecesBottom,
            copyablePiecesBottom: this.state.copyablePiecesTop,
            numberRowsFromTop: !this.state.numberRowsFromTop,
        });
    }


    _findOffBoardPiece(pieceId: CorePieceId) {
        // Kludge: p should never be null
        let piece = this.state.copyablePiecesTop.find(p => p && p.id === pieceId);
        if (!piece) {
            piece = this.state.copyablePiecesBottom.find(p => p && p.id === pieceId);
        }

        return piece;
    }

    movePiece(pieceId: CorePieceId, row: number, col: number) {
        let newBoardLayout = this.state.boardLayout.copy();
        let doSetState = () => this.doSetState({ boardLayout: newBoardLayout, });


        const bp = newBoardLayout.findCorePiecebyId(pieceId);
        if (bp) {
            if (row !== bp.row || col !== bp.col) {
                newBoardLayout.setCorePiece(row, col, bp.piece);
                newBoardLayout.setCorePiece(bp.row, bp.col, null);
                doSetState();
            }
        } else {
            let obp = this._findOffBoardPiece(pieceId);

            if (!obp) {
                throw new Error(`Piece with id ${pieceId} not found`);
            }

            const copiedPiece = this._corePieceFactory.copy(obp);
            newBoardLayout.setCorePiece(row, col, copiedPiece);
            doSetState();
        }
    }

    dragEnd(pieceId: CorePieceId, dropped: boolean) {
        if (!dropped) {
            // The piece was dragged off the board. Now clear it.
            const bp = this.state.boardLayout.findCorePiecebyId(pieceId);
            if (bp) {
                let newBoardLayout = this.state.boardLayout.copy();
                newBoardLayout.setCorePiece(bp.row, bp.col, null);

                this.doSetState({
                    boardLayout: newBoardLayout,
                })
            }
        }
    }

    dragBehaviour(pieceId: CorePieceId) {
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
                        corePieces={this.state.copyablePiecesTop}
                        gameOptions={this}
                    />

                    <Board
                        layout={this.state.boardLayout}
                        gameOptions={this}
                    />

                    <RowOfPieces
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