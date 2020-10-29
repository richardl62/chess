(this.webpackJsonpchess=this.webpackJsonpchess||[]).push([[0],{35:function(e,t,a){},36:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(22),c=a.n(o),i=a(3),l=a(4),s=a(14),u=a(12),d=a(38),p=a(26),m=a(23),h=a(27),f=function(){function e(t,a){if(Object(i.a)(this,e),!(t instanceof Array&&"boolean"===typeof a))throw new Error("Bad input to BoardLayout");this._corePieces=t,this._topLeftBlack=a,Object.seal(this)}return Object(l.a)(e,[{key:"copy",value:function(){return new e(this._corePieces.map((function(e){return Object(h.a)(e)})),this._topLeftBlack)}},{key:"corePiece",value:function(e,t,a){if(void 0===this._corePieces[e][t])throw new Error("Invalid row or column number: ".concat(e," ").concat(t));return void 0!==a&&(this._corePieces[e][t]=a),this._corePieces[e][t]}},{key:"isBlack",value:function(e,t){return(e+t)%2===0?this._topLeftBlack:!this._topLeftBlack}},{key:"findCorePiecebyId",value:function(e){for(var t=0;t<this.nRows;++t)for(var a=0;a<this.nCols;++a){var n=this._corePieces[t][a];if(n&&n.id===e)return{row:t,col:a,piece:n}}return null}},{key:"clearSquares",value:function(){var e,t=Object(m.a)(this._corePieces);try{for(t.s();!(e=t.n()).done;){e.value.fill(null)}}catch(a){t.e(a)}finally{t.f()}return this}},{key:"reserveRows",value:function(){this._topLeftBlack=this.isBlack(this.nRows-1,0);for(var e=this._corePieces,t=0;t<this.nRows/2;++t)for(var a=this.nRows-(t+1),n=0;n<this.nCols;++n){var r=e[t][n];e[t][n]=e[a][n],e[a][n]=r}return this}},{key:"nRows",get:function(){return this._corePieces.length}},{key:"nCols",get:function(){return this._corePieces[0].length}}]),e}(),y=a(13),b=a(40),v="piece",P=a(39),k=a(24),g=a.n(k),w=function e(t,a){Object(i.a)(this,e),this.id=a,this.name=t,Object.freeze(this)},E=function(){function e(){Object(i.a)(this,e),this._lastUsedId=0}return Object(l.a)(e,[{key:"make",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null===e?null:e instanceof w?this.make(e.name):(++this._lastUsedId,new w(e,this._lastUsedId))}}]),e}();function O(e){var t=e.corePiece,a=e.gameOptions,n=Object(P.a)({item:{type:v,id:t.id},collect:function(e){return{isDragging:!!e.isDragging()}},end:function(e,n){return a.dragEnd(t.id,n.didDrop())}}),o=Object(y.a)(n,2),c=o[0].isDragging,i=o[1];return c&&a.dragBehaviour(t.id).move?null:r.a.createElement("div",{className:"piece-div",ref:i},r.a.createElement(g.a,{piece:t.name}))}var B=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){var e=this.props,t=e.color,a=e.children,n="square";if(t)if("black"===t)n+=" black-square";else{if("white"!==t)throw new Error("Unrecognised square color: ".concat(t));n+=" white-square"}return r.a.createElement("div",{className:"square-placeholder"},r.a.createElement("div",{className:n},a))}}]),a}(r.a.PureComponent);function L(e){var t=e.corePiece,a=e.gameOptions,n=e.color,o=e.row,c=e.col,i=Object(b.a)({accept:v,drop:function(e){return a.movePiece(e.id,o,c)},collect:function(e){return{isOver:!!e.isOver()}}}),l=Object(y.a)(i,2)[1];return r.a.createElement("div",{ref:l,style:{position:"relative",width:"100%",height:"100%"}},r.a.createElement(B,{color:n},t?r.a.createElement(O,{corePiece:t,gameOptions:a}):null))}function N(e,t,a){var n=function(e){return a+"-"+e};t.push(r.a.createElement("div",{key:n("start")}));for(var o=0;o<e;++o)t.push(r.a.createElement("div",{key:n(o),className:"board-boarder board-boarder-letter"},String.fromCharCode(65+o)));t.push(r.a.createElement("div",{key:n("end")}))}function j(e,t,a,n){var o=function(e){return"r"+t+"-"+e};n.push(r.a.createElement("div",{key:o("start"),className:"board-boarder board-boarder-number"},t+1));for(var c=0;c<e.nCols;++c){var i=e.isBlack(t,c)?"black":"white";n.push(r.a.createElement(L,{index:c,key:o(c),corePiece:e.corePiece(t,c),gameOptions:a,color:i,row:t,col:c}))}n.push(r.a.createElement("div",{key:o("end"),className:"board-boarder board-boarder-number"},t+1))}function _(e){var t=e.layout,a=e.gameOptions,n=t.nRows,o=t.nCols,c=[];N(o,c,"top");for(var i=0;i<n;++i)j(t,i,a,c);N(o,c,"bottom");var l={display:"grid",gridTemplateColumns:"repeat(".concat(o+2,",auto)"),gridTemplateRows:"repeat(".concat(n+2,",auto)")};return r.a.createElement("div",{className:"board",style:l},c)}var C={standard:{copyableTop:["p","n","b","r","q","k"],board:[["r","n","b","q","k","b","n","r"],["p","p","p","p","p","p","p","p"],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],["P","P","P","P","P","P","P","P"],["R","N","B","Q","K","B","N","R"]],topLeftBlack:!0,copyableBottom:["P","N","B","R","Q","K"],displayName:"Standard"},fiveASide:{copyableTop:["p","n","b","r","q","k"],board:[["r","n","b","q","k"],["p","p","p","p","p"],[null,null,null,null,null],[null,null,null,null,null],["P","P","P","P","P"],["R","N","B","Q","K"]],topLeftBlack:!0,copyableBottom:["P","N","B","R","Q","K"],displayName:"5-a-size"}},R=Object.keys(C);var S=function(e){var t=e.gameOptions,a=t.boardLayout();return r.a.createElement("div",{className:"game-control"},r.a.createElement("div",{className:"game-type"},R.map((function(e){return r.a.createElement("label",null,r.a.createElement("input",{type:"radio",name:"game-type",onChange:function(){return t.boardLayout(e)},checked:a===e}),C[e].displayName)}))),r.a.createElement("div",{className:"buttons"},r.a.createElement("button",{type:"button",onClick:function(){return t.restart()}},"Restart"),r.a.createElement("button",{type:"button",onClick:function(){return t.clear()}}," Clear"),r.a.createElement("button",{type:"button",onClick:function(){return t.flip()}},"Flip")))};function q(e){var t=e.corePieces,a=e.gameOptions;return r.a.createElement("div",{className:"row-of-pieces"},t.map((function(e,t){return r.a.createElement(B,{key:t},r.a.createElement(O,{corePiece:e,gameOptions:a}))})))}function I(e,t){var a=function(e){return t.make(e)},n=C[e];if(!n)throw new Error("Unrecognised layout name: ".concat(e));var r=n.board.map((function(e){return e.map(a)}));return{copyablePiecesTop:n.copyableTop.map(a),boardLayout:new f(r,n.topLeftBlack),copyablePiecesBottom:n.copyableBottom.map(a),layoutName:e}}var T=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(i.a)(this,a),e=t.call(this);var n=new E;return e._corePieceFactory=n,e.state=I("standard",n),e}return Object(l.a)(a,[{key:"boardLayout",value:function(e){return void 0!==e&&this.setState(I(e,this._corePieceFactory)),this.state.layoutName}},{key:"clear",value:function(){this.setState({boardLayout:this.state.boardLayout.copy().clearSquares()})}},{key:"flip",value:function(){this.setState({boardLayout:this.state.boardLayout.copy().reserveRows(),copyablePiecesTop:this.state.copyablePiecesBottom,copyablePiecesBottom:this.state.copyablePiecesTop})}},{key:"restart",value:function(){this.setState(I(this.state.layoutName,this._corePieceFactory))}},{key:"movePiece",value:function(e,t,a){var n=this.state.boardLayout.copy(),r=n.findCorePiecebyId(e);if(r)t===r.row&&a===r.col||(n.corePiece(t,a,r.piece),n.corePiece(r.row,r.col,null));else{var o=this.state.OffBoardCorePieces.white.find((function(t){return t.id===e}));if(o||(o=this.state.OffBoardCorePieces.black.find((function(t){return t.id===e}))),!o)throw new Error("Piece with id ".concat(e," not found"));var c=this._corePieceFactory.make(o);n.corePiece(t,a,c)}this.setState({boardLayout:n})}},{key:"dragEnd",value:function(e,t){if(!t){var a=this.state.boardLayout.findCorePiecebyId(e);if(a){var n=this.state.boardLayout.copy();n.corePiece(a.row,a.col,null),this.setState({boardLayout:n})}}}},{key:"dragBehaviour",value:function(e){var t=Boolean(this.state.boardLayout.findCorePiecebyId(e));return{move:t,copy:!t}}},{key:"renderMainGame",value:function(){return r.a.createElement(d.a,{backend:p.a},r.a.createElement("div",{className:"game"},r.a.createElement(q,{corePieces:this.state.copyablePiecesTop,gameOptions:this}),r.a.createElement(_,{layout:this.state.boardLayout,gameOptions:this}),r.a.createElement(q,{corePieces:this.state.copyablePiecesBottom,gameOptions:this})))}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,this.renderMainGame(),r.a.createElement(S,{gameOptions:this}))}}]),a}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(35);var F=document.getElementById("root");c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(T,null)),F),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[36,1,2]]]);
//# sourceMappingURL=main.90bb154b.chunk.js.map