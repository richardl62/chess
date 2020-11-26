(this.webpackJsonpchess=this.webpackJsonpchess||[]).push([[0],{39:function(e,t,a){},40:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(24),i=a.n(r),c=a(42),s=a(30),l=a(7),u=a(2),d=a(4),h=a(25),f=a(31),p=a(44),b="piece",y=a(43),m=a(26),v=a.n(m),k=function(e){var t=e.corePiece,a=e.boardControl,n=Object(y.a)({item:{type:b,id:t.id},collect:function(e){return{isDragging:!!e.isDragging()}},end:function(e,n){return a.dragEnd(t.id,n.didDrop())}}),r=Object(l.a)(n,2),i=r[0].isDragging,c=r[1];return i&&a.dragBehaviour(t.id).move?null:o.a.createElement("div",{className:"piece-div",ref:c},o.a.createElement(v.a,{piece:t.name}))},g=function(e){Object(h.a)(a,e);var t=Object(f.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){var e=this.props.color,t=this.props.children,a="square";if(e)if("black"===e)a+=" black-square";else{if("white"!==e)throw new Error("Unrecognised square color: ".concat(e));a+=" white-square"}return o.a.createElement("div",{className:"square-placeholder"},o.a.createElement("div",{className:a},t))}}]),a}(o.a.PureComponent);function P(e){var t=e.corePiece,a=e.boardControl,n=e.color,r=e.row,i=e.col,c=Object(p.a)({accept:b,drop:function(e){return a.movePiece(e.id,r,i)},collect:function(e){return{isOver:!!e.isOver()}}}),s=Object(l.a)(c,2)[1];return o.a.createElement("div",{ref:s,style:{position:"relative",width:"100%",height:"100%"}},o.a.createElement(g,{color:n},t?o.a.createElement(k,{corePiece:t,boardControl:a}):null))}function w(e,t,a){var n=function(e){return a+"-"+e};t.push(o.a.createElement("div",{key:n("start")}));for(var r=0;r<e;++r)t.push(o.a.createElement("div",{key:n(r),className:"board-boarder board-boarder-letter"},String.fromCharCode(65+r)));t.push(o.a.createElement("div",{key:n("end")}))}function E(e,t,a,n){var r=function(e){return"r"+t+"-"+e},i=function(a){return o.a.createElement("div",{key:r(a),className:"board-boarder board-boarder-number"},e.nRows-t)},c=function(n){return o.a.createElement(P,{key:r(n),corePiece:e.corePiece(t,n),boardControl:a,color:e.isBlack(t,n)?"black":"white",row:t,col:n})};n.push(i("start"));for(var s=0;s<e.nCols;++s)n.push(c(s));n.push(i("end"))}function C(e){var t=e.boardControl,a=e.displayOptions,n=t.boardLayout,r=n.nRows,i=n.nCols,c=[];w(i,c,"top");for(var s=0;s<r;++s){E(n,a.reverseBoardRows?r-1-s:s,t,c)}w(i,c,"bottom");var l={display:"grid",gridTemplateColumns:"repeat(".concat(i+2,",auto)"),gridTemplateRows:"repeat(".concat(r+2,",auto)")};return o.a.createElement("div",{className:"board",style:l},c)}function B(e){var t=e.corePieces,a=e.boardControl;return o.a.createElement("div",{className:"row-of-pieces"},t.map((function(e,t){return o.a.createElement(g,{key:t},o.a.createElement(k,{corePiece:e,boardControl:a}))})))}var O={standard:{copyableTop:["p","n","b","r","q","k"],board:[["r","n","b","q","k","b","n","r"],["p","p","p","p","p","p","p","p"],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],["P","P","P","P","P","P","P","P"],["R","N","B","Q","K","B","N","R"]],topLeftBlack:!1,copyableBottom:["P","N","B","R","Q","K"],displayName:"Standard"},fiveASide:{copyableTop:["p","n","b","r","q","k"],board:[["r","n","b","q","k"],["p","p","p","p","p"],[null,null,null,null,null],[null,null,null,null,null],["P","P","P","P","P"],["R","N","B","Q","K"]],topLeftBlack:!1,copyableBottom:["P","N","B","R","Q","K"],displayName:"5-a-side"},test:{copyableTop:["p"],board:[["p"],[null],["P"]],topLeftBlack:!1,copyableBottom:["P"],displayName:"test"}},R=Object.keys(O);var _=function(e){var t=e.boardControl,a=e.displayOptions,n=t.boardLayoutName;return o.a.createElement("div",{className:"game-control"},o.a.createElement("div",{className:"game-type"},R.map((function(e){return o.a.createElement("div",{key:e},o.a.createElement("input",{type:"radio",name:"game-type",id:e,onChange:function(){return t.setBoardLayout(e)},checked:n===e}),o.a.createElement("label",{htmlFor:e},O[e].displayName.replace("o","&#8209;")))}))),o.a.createElement("div",{className:"buttons"},o.a.createElement("button",{type:"button",onClick:function(){return t.clear()}}," Clear"),o.a.createElement("button",{type:"button",onClick:function(){return a.flipRowOrder()}},"Flip")),o.a.createElement("div",{className:"buttons"},o.a.createElement("button",{type:"button",disabled:!t.canUndo,onClick:function(){return t.undo()}},"Undo"),o.a.createElement("button",{type:"button",disabled:!t.canRedo,onClick:function(){return t.redo()}},"Redo"),o.a.createElement("button",{type:"button",disabled:!t.canUndo,onClick:function(){return t.restart()}},"Restart")))},j=a(28),S=a(15),L=function(){function e(t,a){if(Object(u.a)(this,e),this._corePieces=void 0,this._topLeftBlack=void 0,!(t instanceof Array&&"boolean"===typeof a))throw new Error("Bad input to BoardLayout");this._corePieces=t,this._topLeftBlack=a,Object.seal(this)}return Object(d.a)(e,[{key:"copy",value:function(){return new e(this._corePieces.map((function(e){return Object(S.a)(e)})),this._topLeftBlack)}},{key:"sanityCheckRowCol",value:function(e,t){if(void 0===this._corePieces[e][t])throw new Error("Invalid row or column number: ".concat(e," ").concat(t))}},{key:"setCorePiece",value:function(e,t,a){this.sanityCheckRowCol(e,t),this._corePieces[e][t]=a}},{key:"corePiece",value:function(e,t){return this.sanityCheckRowCol(e,t),this._corePieces[e][t]}},{key:"isBlack",value:function(e,t){return(e+t)%2===0?this._topLeftBlack:!this._topLeftBlack}},{key:"findCorePiecebyId",value:function(e){for(var t=0;t<this.nRows;++t)for(var a=0;a<this.nCols;++a){var n=this._corePieces[t][a];if(n&&n.id===e)return{row:t,col:a,piece:n}}return null}},{key:"clearSquares",value:function(){var e,t=Object(j.a)(this._corePieces);try{for(t.s();!(e=t.n()).done;){e.value.fill(null)}}catch(a){t.e(a)}finally{t.f()}return this}},{key:"reserveRows",value:function(){this._topLeftBlack=this.isBlack(this.nRows-1,0);for(var e=this._corePieces,t=0;t<this.nRows/2;++t)for(var a=this.nRows-(t+1),n=0;n<this.nCols;++n){var o=e[t][n];e[t][n]=e[a][n],e[a][n]=o}return this}},{key:"nRows",get:function(){return this._corePieces.length}},{key:"nCols",get:function(){return this._corePieces[0].length}}]),e}(),N=a(21),M=function(){function e(t){Object(u.a)(this,e),this._states=void 0,this._stateIndex=void 0,this._states=[t],this._stateIndex=0}return Object(d.a)(e,[{key:"undo",value:function(){if(!this.canUndo)throw new Error("StateManager Cannot undo");return--this._stateIndex,this.state}},{key:"redo",value:function(){if(!this.canRedo)throw new Error("StateManager Cannot redo");return++this._stateIndex,this.state}},{key:"restart",value:function(){return this._stateIndex=0,this.state}},{key:"setState",value:function(e){this._states=this._states.slice(0,this._stateIndex+1),this._states.push(Object(N.a)(Object(N.a)({},this.state),e)),++this._stateIndex}},{key:"canUndo",get:function(){return this._stateIndex>0}},{key:"canRedo",get:function(){return this._stateIndex+1<this._states.length}},{key:"state",get:function(){return this._states[this._stateIndex]}}]),e}(),I=function e(t,a){Object(u.a)(this,e),this.name=void 0,this.id=void 0,this.id=a,this.name=t,Object.freeze(this)},U=function(){function e(){Object(u.a)(this,e),this._lastUsedId=void 0,this._lastUsedId=0}return Object(d.a)(e,[{key:"make",value:function(e){return++this._lastUsedId,new I(e,this._lastUsedId)}},{key:"copy",value:function(e){return this.make(e.name)}}]),e}();function G(e,t){var a=function(e){return t.make(e)},n=function(e){return e?t.make(e):null},o=O[e];if(!o)throw new Error("Unrecognised layout name: ".concat(e));var r=o.board.map((function(e){return e.map(n)}));return{copyablePiecesTop:o.copyableTop.map(a),boardLayout:new L(r,o.topLeftBlack),copyablePiecesBottom:o.copyableBottom.map(a),layoutName:e}}var q=function(){function e(t,a,n){Object(u.a)(this,e),this.stateManager=void 0,this.setGameState=void 0,this.corePieceFactory=void 0,this.stateManager=t,this.setGameState=a,this.corePieceFactory=n}return Object(d.a)(e,[{key:"doSetGameState",value:function(e){this.stateManager.setState(e),this.setGameState(this.stateManager.state)}},{key:"undo",value:function(){this.setGameState(this.stateManager.undo())}},{key:"redo",value:function(){this.setGameState(this.stateManager.redo())}},{key:"restart",value:function(){this.setGameState(this.stateManager.restart())}},{key:"setBoardLayout",value:function(e){this.doSetGameState(G(e,this.corePieceFactory))}},{key:"clear",value:function(){this.doSetGameState({boardLayout:this.stateManager.state.boardLayout.copy().clearSquares()})}},{key:"movePiece",value:function(e,t,a){var n=this,o=this.stateManager.state.boardLayout.copy(),r=o.findCorePiecebyId(e);if(r)t===r.row&&a===r.col||(o.setCorePiece(t,a,r.piece),o.setCorePiece(r.row,r.col,null),this.doSetGameState({boardLayout:o}));else{var i=function(e){var t=n.stateManager.state.copyablePiecesTop.find((function(t){return t&&t.id===e}));return t||(t=n.stateManager.state.copyablePiecesBottom.find((function(t){return t&&t.id===e}))),t}(e);if(!i)throw new Error("Piece with id ".concat(e," not found"));var c=this.corePieceFactory.copy(i);o.setCorePiece(t,a,c),this.doSetGameState({boardLayout:o})}}},{key:"dragEnd",value:function(e,t){if(!t){var a=this.stateManager.state.boardLayout.findCorePiecebyId(e);if(a){var n=this.stateManager.state.boardLayout.copy();n.setCorePiece(a.row,a.col,null),this.doSetGameState({boardLayout:n})}}}},{key:"dragBehaviour",value:function(e){var t=Boolean(this.stateManager.state.boardLayout.findCorePiecebyId(e));return{move:t,copy:!t}}},{key:"canUndo",get:function(){return this.stateManager.canUndo}},{key:"canRedo",get:function(){return this.stateManager.canRedo}},{key:"copyablePiecesTop",get:function(){return this.stateManager.state.copyablePiecesTop}},{key:"copyablePiecesBottom",get:function(){return this.stateManager.state.copyablePiecesBottom}},{key:"boardLayout",get:function(){return this.stateManager.state.boardLayout}},{key:"boardLayoutName",get:function(){return this.stateManager.state.layoutName}}]),e}();var T=a(29),x=function(){function e(t,a){Object(u.a)(this,e),this.reverseBoardRows=void 0,this.setReverseBoardRows=void 0,this.reverseBoardRows=t,this.setReverseBoardRows=a}return Object(d.a)(e,[{key:"flipRowOrder",value:function(){this.setReverseBoardRows(!this.reverseBoardRows)}}]),e}();a(39);var F=function(){var e=function(){var e=Object(n.useRef)(new U).current,t=Object(n.useState)(G("standard",e)),a=Object(l.a)(t,2),o=a[0],r=a[1],i=Object(n.useRef)(new M(o)).current;return new q(i,r,e)}(),t=Object(T.a)(x,Object(S.a)(Object(n.useState)(!1))),a=function(a){var n="top"===a;return t.reverseBoardRows&&(n=!n),n?e.copyablePiecesTop:e.copyablePiecesBottom};return o.a.createElement(o.a.Fragment,null,o.a.createElement(c.a,{backend:s.a},o.a.createElement("div",{className:"game"},o.a.createElement(B,{corePieces:a("top"),boardControl:e}),o.a.createElement(C,{boardControl:e,displayOptions:t}),o.a.createElement(B,{corePieces:a("bottom"),boardControl:e}))),o.a.createElement(_,{boardControl:e,displayOptions:t}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var D=document.getElementById("root");function K(){return Object(n.useEffect)((function(){document.title="Chess"}),[]),o.a.createElement(F,null)}i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(K,null)),D),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[40,1,2]]]);
//# sourceMappingURL=main.a1a1c4a3.chunk.js.map