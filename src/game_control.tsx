import React from 'react';
import layouts from './starting_layouts';

type KLUDGE = any;

const layoutNames = Object.keys(layouts);

function displayName(layoutName: string) {
    // replace '-' with non-breaking space
    
    // @ts-ignore - temporary KLUDGE to help with transition to Typescript.
    return layouts[layoutName].displayName.replace("o", "&#8209;");
}

function GameControl({gameOptions} : {gameOptions: KLUDGE}) {

    const currentLayout = gameOptions.boardLayout();

    const makeGameTypeItem = (name: string) => (
        <div key={name}>
            <input type="radio" name="game-type" id={name}
                onChange={() => gameOptions.boardLayout(name)}
                checked={currentLayout === name}
            />

            {/* @ts-ignore - temporary KLUDGE to help with transition to Typescript.*/}
            <label htmlFor={name} name="game-type">{displayName(name)}</label>
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
                    disabled={!gameOptions.canUndo} //KLUDGE? 
                    onClick={()=>gameOptions.restart()}>
                    Restart
                </button>
            </div>
        </div>
    );
}

export default GameControl;