import React from 'react';
import layouts from './starting_layouts';

const layoutNames = Object.keys(layouts);

function displayName(layoutName) {
    // replace '-' with non-breaking space
    return layouts[layoutName].displayName.replace("o", "&#8209;");
}

function GameControl({gameOptions}) {

    const currentLayout = gameOptions.boardLayout();

    const makeGameTypeItem = name => (
        <div key={name}>
            <input type="radio" name="game-type" id={name}
                onChange={() => gameOptions.boardLayout(name)}
                checked={currentLayout === name}
            />
            <label htmlFor={name} name="game-type">{displayName(name)}</label>
        </div>
    );

    return (
        <div className="game-control" >
            <div className="game-type">
                {layoutNames.map(makeGameTypeItem)}
            </div>

            <div className='buttons'>
                <button type='button' onClick={()=>gameOptions.restart()}>Restart</button>
                <button type='button' onClick={()=>gameOptions.clear()}> Clear</button>
                <button type='button' onClick={()=>gameOptions.flip()}>Flip</button>
            </div>

            <div className='buttons'>
                <button type='undo'
                    disabled={!gameOptions.canUndo}
                    onClick={() => gameOptions.undo()}>
                    Undo
                </button>

                <button type='redo'
                    disabled={!gameOptions.canRedo}
                    onClick={() => gameOptions.redo()}>
                    Redo
                </button>
            </div>
        </div>
    );
}

export default GameControl;