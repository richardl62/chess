import React from 'react';
import layouts from './starting_layouts';
import { Game } from './game'

type LayoutKey = keyof typeof layouts;
const layoutNames = Object.keys(layouts) as Array<LayoutKey>; // Kludge?

function displayName(layoutName: LayoutKey) {
    // replace '-' with non-breaking space
    return layouts[layoutName].displayName.replace("o", "&#8209;");
}

interface GameControlProps {
    gameOptions: Game,
};

const GameControl : React.FC<GameControlProps>  = ({gameOptions}) => {
    const currentLayout = gameOptions.boardLayoutName();

    const makeGameTypeItem = (name: LayoutKey) => (
        <div key={name}>
            <input type="radio" name="game-type" id={name}
                onChange={() => gameOptions.setBoardLayout(name)}
                checked={currentLayout === name}
            />

            <label htmlFor={name}>{displayName(name)}</label>
        </div>
    );

    return (
        <div className="game-control" >
            <div className="game-type">
                {layoutNames.map(makeGameTypeItem)}
            </div>

            <div className='buttons'>
                <button type='button' onClick={()=>gameOptions.clear()}> Clear</button>
                <button type='button' onClick={()=>gameOptions.flip()}>Flip</button>
            </div>

            <div className='buttons'>
                <button type='button'
                    disabled={!gameOptions.canUndo}
                    onClick={() => gameOptions.undo()}>
                    Undo
                </button>

                <button type='button'
                    disabled={!gameOptions.canRedo}
                    onClick={() => gameOptions.redo()}>
                    Redo
                </button>

                <button type='button'
                    disabled={!gameOptions.canUndo} //Kludge? 
                    onClick={()=>gameOptions.restart()}>
                    Restart
                </button>
            </div>
        </div>
    );
}


export default GameControl;
