(this["webpackJsonpsnake-game"]=this["webpackJsonpsnake-game"]||[]).push([[0],{16:function(e,t,n){e.exports=n(39)},22:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(7),o=n.n(c),u=n(8),i=n(1),s=n(15),f=(n(20),["left","top","right","down"]),l={snake:[{x:6,y:5}],direct:"top",food:{},foodExist:!1,stop:!0},d=function(e){var t=e.direct,n=e.snake,a=n[0],r=a.x,c=a.y,o=f.indexOf(t);return o%2===0?r+=o-1:c+=o-2,[{x:r,y:c}].concat(Object(u.a)(n.slice(0,-1)))},m=function(e,t,n){var c=Object(a.createContext)();return{Context:c,Provider:function(o){var u=o.children,f=Object(a.useReducer)(e,n),l=Object(s.a)(f,2),d=l[0],m=l[1],E=Object(a.useMemo)((function(){return function(e,t,n){var a={},r=function(n){a[n]=function(){console.log("Actions Dispatch: ",n),e[n](t).apply(void 0,arguments)}};for(var c in e)r(c);return a}(t,m)}),[t,m]);return r.a.createElement(c.Provider,{value:Object(i.a)({state:d},E)},u)}}}((function(e,t){var n=t.type,a=t.payload;switch(n){case v.CHANGE_DIRECTION:return e.stop||(e.direct===a||2===Math.abs(f.indexOf(a)-f.indexOf(e.direct)))?e:Object(i.a)({},e,{direct:a});case v.MOVE:return Object(i.a)({},e,{snake:d(e)});case v.CREATE_FOOD:return Object(i.a)({},e,{food:p(e.snake),foodExist:!0});case v.EAT_FOOD:return Object(i.a)({},e,{},a,{snake:[].concat(Object(u.a)(e.snake),[a]),foodExist:!1});case v.STOP:return Object(i.a)({},e,{stop:!0});case v.RESET:return e.stop?Object(i.a)({},l,{stop:!1}):e;default:return e}}),{changeDirection:function(e){return function(t){e({type:v.CHANGE_DIRECTION,payload:f[t]})}},move:function(e){return function(){e({type:v.MOVE})}},createFood:function(e){return function(){e({type:v.CREATE_FOOD})}},eatFood:function(e){return function(t){e({type:v.EAT_FOOD,payload:t})}},setStop:function(e){return function(){e({type:v.STOP})}},reset:function(e){return function(){e({type:v.RESET})}}},l),E=m.Context,O=m.Provider,v={MOVE:"MOVE",CHANGE_DIRECTION:"CHANGE_DIRECTION",CREATE_FOOD:"CREATE_FOOD",EAT_FOOD:"EAT_FOOD",STOP:"STOP",RESET:"RESET"},p=function e(t){var n=Math.floor(14*Math.random()),a=Math.floor(11*Math.random());return t.some((function(e){return e.x===n&&e.y===a}))?e(t):{x:n,y:a}},b=(n(22),function(e,t){var n=Object(a.useRef)();Object(a.useEffect)((function(){n.current=e}),[e]),Object(a.useEffect)((function(){if(null!==t){var e=setInterval((function(){n.current()}),t);return function(){return clearInterval(e)}}}),[t])}),y=n(14),x=n.n(y),j={},C=function(e,t){var n=e.children,c=Object(a.useContext)(E),o=c.state,u=o.snake,i=o.foodExist,s=o.food,f=o.stop,l=c.changeDirection,d=c.move,m=c.createFood,O=c.eatFood,v=c.setStop,p=c.reset,y=Object(a.useRef)();Object(a.useImperativeHandle)(t,(function(){return{focus:function(){y.current.focus()}}})),Object(a.useEffect)((function(){var e=u.length;(u[0].x<0||u[0].y<0||u[0].x>13||u[0].y>10||u.length>=3&&-1!==x.a.findIndex(u.slice(1),u[0]))&&v(),i?u[0].x===s.x&&u[0].y===s.y&&O(j):m(),j=u[e-1]}),[u,i]);var C=Object(a.useCallback)((function(e){var t=e.keyCode;13===t&&p(),[37,38,39,40].includes(t)&&l(t-37)}),[]);return b(d,f?null:250),r.a.createElement("div",{id:"container",ref:y,tabIndex:"0",onKeyDown:C,className:"body"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"score"},"Your Score: ",u.length-1),n))};C.displayName="Container";var T=r.a.forwardRef(C),h=r.a.memo((function(e){var t=e.active,n=e.head,a=e.food;return r.a.createElement("div",{className:"cell ".concat(t?"active":""," ").concat(n?"head":""," ").concat(a?"food":"")})})),N=n(4),g=n.n(N),R=function(e){var t=e.yaxis,n=Object(a.useContext)(E).state,c=n.snake,o=n.food,u=Object(a.useMemo)((function(){return g()(14).map(function(e,t,n){return function(a){var c=e.filter((function(e){return e.y===n})).map((function(e){return e.x})).includes(a),o=e[0].y===n&&e[0].x===a,u=t.y===n&&t.x===a;return r.a.createElement(h,{key:a,active:c,head:o,food:u})}}(c,o,t))}),[c,o,t]);return r.a.createElement("div",{className:"row"},u)},k=0,D=function(e){var t=e.stop,n=e.onConfirm,a=0===k?{msg:"Welcome",btnTitle:"Start"}:{msg:"GameOver",btnTitle:"Reset"};return k++,t?r.a.createElement("div",{className:"msg"},r.a.createElement("div",{className:"msg-bg"}),r.a.createElement("div",null,r.a.createElement("div",{className:"msg-title"},a.msg),r.a.createElement("button",{onClick:n,className:"msg-btn"},a.btnTitle))):null};D.displayName="GameMsg";var A=r.a.memo(D),I=function(){var e=Object(a.useContext)(E),t=e.state.stop,n=e.reset,c=r.a.createRef();Object(a.useEffect)((function(){c.current.focus()}),[]);var o=function(e){return g()(e).map((function(e){return r.a.createElement(R,{key:e,yaxis:e})}))}(11);return r.a.createElement(T,{ref:c},r.a.createElement(A,{stop:t,onConfirm:n}),o)};o.a.render(r.a.createElement(O,null,r.a.createElement(I,null)),document.querySelector("#root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.05239380.chunk.js.map