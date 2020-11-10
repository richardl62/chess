type StateValue =  object;

class StateManager {
    private _states: Array<StateValue>;
    private _stateIndex: number;

    // clientSetState is NOT called the initialState.
    constructor(initialState: object) {
        this._states = [initialState];
        this._stateIndex = 0;
    }

    get canUndo() : boolean {return this._stateIndex > 0;}
    get canRedo() : boolean {return this._stateIndex + 1 < this._states.length;}

    get state() :StateValue {return this._states[this._stateIndex];}

    undo(): StateValue {
        if(!this.canUndo) {
            throw new Error("StateManager Cannot undo")
        }
        --this._stateIndex;
        return this.state;
    }

    redo() : StateValue {
        if(!this.canRedo) {
            throw new Error("StateManager Cannot redo")
        }
        ++this._stateIndex;
        return this.state;
    }

    restart() : StateValue {
        this._stateIndex = 0;
        return this.state;
    }

    setState(stateChange: StateValue) : void {
        //Merge the stateChange into the currents tate;
        const newState = {...this.state, ...stateChange};

        // Remove states afters the current state
        this._states = this._states.slice(0, this._stateIndex+1);
        this._states.push(newState);
        ++this._stateIndex;
    }
}

export default StateManager;