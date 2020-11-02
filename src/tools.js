export function compatibleSubState(sub, full) {
    const keys =  Object.keys( sub );
    for(const key in keys) {
        if(sub[key] !== full[key]) {
            console.log(`sub[${key}] !== full[${key}]`, sub[key], full[key]);
            return false;
        } 
    }
    return true;
}

export function equivalentState(state1, state2) {
    if(Object.keys(state1).length !== Object.keys(state2).length) {
        console.log("States have different keys", Object.keys(state1), Object.keys(state2));
        return false;
    }

    return compatibleSubState(state1, state2);
}