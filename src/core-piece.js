class CorePiece {
    constructor(name, id) {
      this.id = id;
      this.name = name;
      Object.freeze(this);
    }
  }
  
  class CorePieceFactory {
  
    constructor() {
      this._lastUsedId = 0;
    }
  
    // Input can be a piece to copy, the name of a piece or null
    make(input = null) {
  
      if (input === null) {
        return null;
      }
  
      if(input instanceof CorePiece) {
        return this.make(input.name);
      }
  
      ++this._lastUsedId;
  
      return new CorePiece(input, this._lastUsedId);
    }
  }

  export { CorePiece, CorePieceFactory }