(this["webpackJsonpdraggable-tutorial"]=this["webpackJsonpdraggable-tutorial"]||[]).push([[0],{21:function(e,t,n){e.exports=n(28)},27:function(e,t,n){},28:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),o=n(15),i=n.n(o),c=n(8),l=n(32),s=n(30),u=n(17),p=(n(18),n(31)),h="kinght";function g(){var e=Object(p.a)({item:{type:h},collect:function(e){return{isDragging:!!e.isDragging()}}}),t=Object(c.a)(e,2),n=t[0].isDragging,r=t[1];return a.a.createElement("div",{className:"piece",ref:r,style:{opacity:n?.5:1,cursor:"move"}},"\u2658")}function f(e){var t=e.type;if(t===h)return a.a.createElement(g,null);if(t)throw new Error("Pieces other than knights are not yet supported");return null}var d={nRows:4,nCols:6,topLeftBlack:!1,squareIsBlack:function(e,t){var n=(e+t)%2===0;return this.topLeftBlack?n:!n}},m={knightPosition:[0,0],pieceType:function(e,t){return e===this.knightPosition[0]&&t===this.knightPosition[1]?h:null}},v=null;function k(e,t){m.knightPosition=[e,t],v(m)}function w(e){var t=e.black,n=e.children,r="square"+(t?" blackSquare":"");return a.a.createElement("div",{className:r},n)}function y(e){var t=e.layout,n=e.pieces,r=e.row,o=e.col,i=Object(l.a)({accept:h,drop:function(){return k(r,o)},collect:function(e){return{isOver:!!e.isOver()}}}),s=Object(c.a)(i,2)[1];return a.a.createElement("div",{ref:s,style:{position:"relative",width:"100%",height:"100%"}},a.a.createElement(w,{black:t.squareIsBlack(r,o)},a.a.createElement(f,{type:n.pieceType(r,o)})))}function b(e){for(var t=e.layout,n=e.pieces,r=t.nRows,o=t.nCols,i=[],c=0;c<r;++c)for(var l=0;l<o;++l)i.push(a.a.createElement(y,{index:i.length,key:[c,l],layout:t,pieces:n,row:c,col:l}));var p,h={display:"grid",gridTemplateColumns:"repeat(".concat(o,",50px)"),gridTemplateRows:"repeat(".concat(r,",50px)"),width:"fit-content"},g={};return p=u.a,a.a.createElement(s.a,{backend:p,opt:g},a.a.createElement("div",{className:"board",style:h},i))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(27);var E=document.getElementById("root");!function(e){if(v)throw new Error("Multiple observers not supported");(v=e)(m)}((function(e){i.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(b,{layout:d,pieces:e})),E)})),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[21,1,2]]]);
//# sourceMappingURL=main.29ed9fff.chunk.js.map