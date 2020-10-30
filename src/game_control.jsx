import React from 'react';
import layouts from './starting_layouts';

const layoutNames = Object.keys(layouts);

function GameControl({gameOptions}) {

    const currentLayout = gameOptions.boardLayout();

    const makeGameTypeItem = name => (
        <label key={name}>
            <input type="radio" name="game-type"
                onChange={() => gameOptions.boardLayout(name)}
                checked={currentLayout === name}
            />
            {layouts[name].displayName}
        </label>
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
        </div>
    );
}

export default GameControl;