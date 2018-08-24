!function(t){var i={};function e(s){if(i[s])return i[s].exports;var n=i[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,e),n.l=!0,n.exports}e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(e.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var n in t)e.d(s,n,function(i){return t[i]}.bind(null,n));return s},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,e,s){"use strict";s.r(e);const n=document.getElementById("canvas").getContext("2d");let h={x:void 0,y:void 0};window.addEventListener("mousemove",t=>{h.x=t.offsetX,h.y=t.offsetY});var o=0;var r=function(t,i,e,s,r){this.x=t,this.y=i,this.width=e,this.height=s,this.angle=0,this.color=r,this.update=function(){o=Math.atan2(h.y-this.y,h.x-this.x),this.angle=o,this.draw()},this.draw=function(){n.save(),n.translate(this.x,this.y),n.rotate(this.angle),n.beginPath(),n.fillStyle=this.color,n.shadowColor=this.color,n.shadowBlur=3,n.shadowOffsetX=0,n.shadowOffsetY=0,n.fillRect(0,-this.height/2,this.width,s),n.closePath(),n.restore()}};const a=document.getElementById("canvas"),l=a.getContext("2d");l.innerWidth=a.width,l.innerHeight=a.height;let d={x:window.innerWidth/2,y:window.innerHeight/2};const c=.08;var u=function(t,i,e,s,n,h,o,r){this.x=t,this.y=i,this.dx=e,this.dy=-s,this.radius=n,this.color=h,this.particleColors=r,this.source=o,this.timeToLive=a.height/(a.height+800),this.init=function(){this.x=Math.cos(this.source.angle)*this.source.width,this.y=Math.sin(this.source.angle)*this.source.width,this.x=this.x+a.width/2,this.y=this.y+a.height,d.x-a.width/2<0&&(this.dx=-this.dx),this.dy=8*Math.sin(this.source.angle),this.dx=8*Math.cos(this.source.angle)},this.update=function(){this.y+this.radius+this.dy>a.height?this.dy=-this.dy:this.dy+=c,this.x+=this.dx,this.y+=this.dy,this.draw(),this.timeToLive-=.01},this.draw=function(){l.save(),l.beginPath(),l.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),l.shadowColor=this.color,l.shadowBlur=5,l.shadowOffsetX=0,l.shadowOffsetY=0,l.fillStyle=this.color,l.fill(),l.closePath(),l.restore()},this.init()};const f=document.getElementById("canvas"),y=f.getContext("2d");var g=function(t,i,e,s,n,h){this.x=t,this.y=i,this.dx=e,this.dy=-s,this.radius=n,this.color=h,this.timeToLive=1.5,this.update=function(){this.y+this.radius+this.dy>f.height&&(this.dy=-this.dy),(this.x+this.radius+this.dx>f.width||this.x-this.radius+this.dx<0)&&(this.dx=-this.dx),this.x+=this.dx,this.y+=this.dy,this.draw(),this.timeToLive-=.01},this.draw=function(){y.save(),y.beginPath(),y.arc(this.x,this.y,6,0,2*Math.PI,!1),y.fillStyle=this.color,y.fill(),y.closePath(),y.restore()}};document.getElementById("canvas").getContext("2d");var p=class{constructor(t){this.particles=[],this.rings=[],this.source=t,this.init=function(){for(let t=0;t<15;t++){let i=8*Math.random()-3,e=8*Math.random()-3,s=["#CEC721","#D88A25","#C12929","#7A1FD8","#2781CE","#FFAC00","#9C081C","#FF002F","#150063","#0A02B8","#FF0D6B","#E80CD0","#C800FF","#7C0CE8","#460DFF"];this.particles.push(new g(this.source.x,this.source.y,i,e,8,s[t]))}},this.init(),this.upate=function(){for(let t=0;t<this.particles.length;t++)this.particles[t].update(),this.particles[t].timeToLive<0&&this.particles.splice(t,1);for(let t=0;t<this.rings.length;t++)this.rings[t].update(),this.rings[t].timeToLive<0&&this.rings.splice(i,1)}}};const w=document.getElementById("canvas"),x=w.getContext("2d");let C={x:void 0,y:void 0};function v(t,i,e,s){let n=e-t,h=s-i;return Math.sqrt(Math.pow(n,2)+Math.pow(h,2))}w.addEventListener("touchmove",function(t){t.preventDefault(),C.x=t.touches[0].pageX,C.y=t.touches[0].pageY});let m,F,E,b,M,B,D=!1;window.addEventListener("keydown",t=>{32===t.keyCode&&(D=!0)}),w.addEventListener("touchend",function(){D=!1}),window.addEventListener("mousedown",t=>{let i=w.getBoundingClientRect();C.x=t.clientX-i.left,C.y=t.clientY-i.top}),m=new r(w.width/2,w.height,40,20,"white"),F=[],E=[],b={cannonballColor:["#CEC721","#D88A25","#C12929","#7A1FD8","#2781CE","#FFAC00","#9C081C","#FF002F","#150063","#0A02B8","#FF0D6B","#E80CD0","#C800FF","#7C0CE8","#460DFF"],particleColors:["#CEC721","#D88A25","#C12929","#7A1FD8","#2781CE","#FFAC00","#9C081C","#FF002F","#150063","#0A02B8","#FF0D6B","#E80CD0","#C800FF","#7C0CE8","#460DFF"]},M=document.getElementById("cannon-shot"),function t(){window.requestAnimationFrame(t),x.fillStyle="rgba(18, 18, 18, 0.2)",x.fillRect(0,0,w.width,w.height),m.update();let i=Math.floor(Math.random()*b.length),e=b,s=b.cannonballColor[Math.floor(5*Math.random())];B=new u(C.x,C.y,2,2,5,s,m,e.particleColors[i]);for(let t=0;t<F.length;t++)F[t].update(),F[t].timeToLive<=0&&(E.push(new p(F[t])),F.splice(t,1));for(var n=0;n<E.length;n++){E[n].upate();let t=E[n].particles[0]||new g,i=t.x||0,e=t.y||0;t.color=B.color,E[n].particles.length<=0&&E.splice(n,1),v(i,e,C.x,C.y)<10&&(t.timeToLive=0,F.push(B))}if(!0===D){let t=document.getElementById("cannon-shot");t.playbackRate=5,t.play(),F.push(B),D=!1}}()}]);
//# sourceMappingURL=bundle.js.map