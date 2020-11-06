class CorePiece {
    name: string;
    id: number;

    constructor(name: string, id: number) {
      this.id = id;
      this.name = name;
      Object.freeze(this);
    }
  }
  
  class CorePieceFactory {
    private _lastUsedId: number;
    
    constructor() {
      this._lastUsedId = 0;
    }
  
    make(x: null) : null;
    make(name: string) : CorePiece;

    make(input: any) : any {
  
      if (input === null) {
        return null;
      }

      ++this._lastUsedId;
      return new CorePiece(input, this._lastUsedId);
    }

    copy(corePiece: CorePiece) {
      return this.make(corePiece.name);
    }
  }

  export { CorePiece, CorePieceFactory }