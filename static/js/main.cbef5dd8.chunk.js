(this["webpackJsonpdraggable-tutorial"]=this["webpackJsonpdraggable-tutorial"]||[]).push([[0],{34:function(e,t,a){},35:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(22),o=a.n(c),i=a(3),l=a(4),u=a(14),s=a(12),d=a(26),f=function(){function e(t,a){if(Object(i.a)(this,e),!(t instanceof Array&&"boolean"===typeof a))throw new Error("Bad input to BoardLayout");this._corePieces=t,this._topLeftBlack=a,Object.seal(this)}return Object(l.a)(e,[{key:"copy",value:function(){return new e(this._corePieces.map((function(e){return Object(d.a)(e)})),this._topLeftBlack)}},{key:"corePiece",value:function(e,t,a){if(void 0===this._corePieces[e][t])throw new Error("Invalid row or column number: ".concat(e," ").concat(t));return void 0!==a&&(this._corePieces[e][t]=a),this._corePieces[e][t]}},{key:"isBlack",value:function(e,t){return(e+t)%2===0?this._topLeftBlack:!this._topLeftBlack}},{key:"findCorePiecebyId",value:function(e){for(var t=0;t<this.nRows;++t)for(var a=0;a<this.nCols;++a){var r=this._corePieces[t][a];if(r&&r.id===e)return{row:t,col:a,piece:r}}return null}},{key:"nRows",get:function(){return this._corePieces.length}},{key:"nCols",get:function(){return this._corePieces[0].length}}]),e}(),m=a(13),v=a(39),h="piece",p=a(38),b=a(23),k=a.n(b),y=["p","n","b","r","q","k"],g=["P","N","B","R","Q","K"],P=y.concat(g),w=function e(t,a){Object(i.a)(this,e),this.id=a,this.name=t,Object.freeze(this)},E=function(){function e(){Object(i.a)(this,e),this._lastUsedId=0}return Object(l.a)(e,[{key:"make",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(null===e)return null;if(e instanceof w)return this.make(e.name);if(!P.includes(e))throw new Error("CorePieceFactor.make() given unrecognised input: ".concat(e));return++this._lastUsedId,new w(e,this._lastUsedId)}}]),e}();function C(e){var t=e.corePiece,a=e.gameCallbacks,r=Object(p.a)({item:{type:h,id:t.id},collect:function(e){return{isDragging:!!e.isDragging()}},begin:function(){return a.dragStart(t.id)},end:function(e,r){return a.dragEnd(t.id,r.didDrop())}}),c=Object(m.a)(r,2),o=c[0].isDragging,i=c[1],l=o&&a.dragBehaviour(t.id).move;return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"piece-div",ref:i},l?null:n.a.createElement(k.a,{piece:t.name})))}var O=function(e){Object(u.a)(a,e);var t=Object(s.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){var e=this.props,t=e.black,a=e.children,r="square "+(t?"black-square":"white-square");return n.a.createElement("div",{className:r},a)}}]),a}(n.a.PureComponent);var B=function(e){var t=e.corePiece,a=e.gameCallbacks,r=e.isBlack,c=e.row,o=e.col,i=Object(v.a)({accept:h,drop:function(e){return a.movePiece(e.id,c,o)},collect:function(e){return{isOver:!!e.isOver()}}}),l=Object(m.a)(i,2)[1];return n.a.createElement("div",{ref:l,style:{position:"relative",width:"100%",height:"100%"}},n.a.createElement(O,{black:r},t?n.a.createElement(C,{corePiece:t,gameCallbacks:a}):null))};function _(e,t,a){var r=function(e){return a+"-"+e};t.push(n.a.createElement("div",{key:r("start")}));for(var c=0;c<e;++c)t.push(n.a.createElement("div",{key:r(c),className:"board-boarder"},String.fromCharCode(65+c)));t.push(n.a.createElement("div",{key:r("end")}))}function j(e,t,a,r){var c=function(e){return"r"+t+"-"+e};r.push(n.a.createElement("div",{key:c("start"),className:"board-boarder"},t+1));for(var o=0;o<e.nCols;++o)r.push(n.a.createElement(B,{index:o,key:c(o),corePiece:e.corePiece(t,o),gameCallbacks:a,isBlack:e.isBlack(t,o),row:t,col:o}));r.push(n.a.createElement("div",{key:c("end"),className:"board-boarder"},t+1))}function L(e){var t=e.layout,a=e.gameCallbacks,r=t.nRows,c=t.nCols,o=[];_(c,o,"top");for(var i=0;i<r;++i)j(t,i,a,o);_(c,o,"bottom");var l={display:"grid",gridTemplateColumns:"repeat(".concat(c+2,",auto)"),gridTemplateRows:"repeat(".concat(r+2,",auto)")};return n.a.createElement("div",{className:"board",style:l},o)}var N=a(37),I=a(25),S=[["r","n","b","q","k","b","n","r"],["p","p","p","p","p","p","p","p"],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],["P","P","P","P","P","P","P","P"],["R","N","B","Q","K","B","N","R"]];function R(e){var t=e.corePieces,a=e.gameCallbacks;return n.a.createElement("div",{className:"permanent-pieces"},t.map((function(e,t){return n.a.createElement("div",{className:"square",index:t,key:t},n.a.createElement(C,{corePiece:e,gameCallbacks:a}))})))}function q(e,t){var a=e.map((function(e){return e.map((function(e){return t.make(e)}))}));return new f(a,e.topLeftBlack)}S.topLeftBlack=!1,Object.freeze(S);var D=function(e){Object(u.a)(a,e);var t=Object(s.a)(a);function a(){var e;Object(i.a)(this,a),e=t.call(this);var r=new E;e._corePieceFactory=r,e.state={boardLayout:q(S,r)};var n=y.map((function(e){return r.make(e)})),c=g.map((function(e){return r.make(e)}));return e._OffBoardCorePieces={black:n,white:c,all:n.concat(c)},e._callbacks={movePiece:function(){var t;return(t=e).movePiece.apply(t,arguments)},dragEnd:function(){var t;return(t=e).dragEnd.apply(t,arguments)},dragStart:function(){var t;return(t=e).dragStart.apply(t,arguments)},dragBehaviour:function(){var t;return(t=e).dragBehaviour.apply(t,arguments)}},Object.freeze(e._OffBoardCorePieces),e}return Object(l.a)(a,[{key:"copyPiece",value:function(e){return this._corePieceFactory.make(e)}},{key:"movePiece",value:function(e,t,a){var r=this.state.boardLayout.copy(),n=r.findCorePiecebyId(e);if(n)t===n.row&&a===n.col||(r.corePiece(t,a,n.piece),r.corePiece(n.row,n.col,null));else{var c=this._OffBoardCorePieces.all.find((function(t){return t.id===e}));if(!c)throw new Error("Piece with id ".concat(e," not found"));r.corePiece(t,a,this.copyPiece(c))}this.setState({boardLayout:r})}},{key:"dragEnd",value:function(e,t){if(!t){var a=this.state.boardLayout.findCorePiecebyId(e);if(a){var r=this.state.boardLayout.copy();r.corePiece(a.row,a.col,null),this.setState({boardLayout:r})}}}},{key:"dragStart",value:function(e){}},{key:"dragBehaviour",value:function(e){var t=Boolean(this.state.boardLayout.findCorePiecebyId(e));return{move:t,copy:!t}}},{key:"render",value:function(){return n.a.createElement(N.a,{backend:I.a},n.a.createElement("div",{className:"game"},n.a.createElement(R,{corePieces:this._OffBoardCorePieces.black,gameCallbacks:this._callbacks}),n.a.createElement(L,{layout:this.state.boardLayout,gameCallbacks:this._callbacks}),n.a.createElement(R,{corePieces:this._OffBoardCorePieces.white,gameCallbacks:this._callbacks})))}}]),a}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(34);var F=document.getElementById("root");o.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(D,null)),F),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[35,1,2]]]);
//# sourceMappingURL=main.cbef5dd8.chunk.js.map