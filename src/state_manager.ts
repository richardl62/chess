import { equivalentState } from './tools';

type StateValue =  object;


interface ClientFunctions {
    getState: () => StateValue,
    setState: (s: StateValue) => void,
};

class StateManager {
    private _states: Array<StateValue>;
    private _stateIndex: number;
    private _clientFunctions: ClientFunctions;

    // clientSetState is NOT called the initialState.
    constructor(clientFunctions: ClientFunctions) {
        if (typeof clientFunctions.getState !== "function"
            || typeof clientFunctions.getState !== "function") {
            throw new Error("StateManager requires getState and setState functions");
        }

        this._states = [clientFunctions.getState()];
        this._stateIndex = 0;

        this._clientFunctions = clientFunctions;
    }

    get canUndo() : boolean {return this._stateIndex > 0;}
    get canRedo() : boolean {return this._stateIndex + 1 < this._states.length;}
    get state() :StateValue {return this._states[this._stateIndex];}

    _sanityCheck() : void {
        if(!equivalentState(this.state, this._clientFunctions.getState())) {
            throw new Error("StateManage out of sync with client");
        }
    }

    _setClientState() : void {
        this._clientFunctions.setState(this.state); 

        this._sanityCheck();
    }

    undo() : boolean {
        this._sanityCheck();

        //console.log("before undo: stateIndex=", this._stateIndex);
        const ok = this.canUndo;
        if(ok) {
            --this._stateIndex;
            this._setClientState(); 
        }
        return ok;
    }

    redo() : boolean {
        this._sanityCheck();

        //console.log("before redo: stateIndex=", this._stateIndex);
        const ok = this.canRedo;
        if(ok) {
            ++this._stateIndex;
            this._setClientState(); 
        }
        return ok;
    }

    setState(stateChange: StateValue) : void {
        this._sanityCheck();

        //Merge the stateChange into the currents tate;
        const newState = {...this.state, ...stateChange};

        // Remove states afters the current state
        this._states = this._states.slice(0, this._stateIndex+1);
        this._states.push(newState);
        ++this._stateIndex;

        if(this.state !== newState) {
            throw new Error("internal error in StateManager.setState");
        }

        this._setClientState();
    }
}

export default StateManager;