var n=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var i=Object.getOwnPropertyNames;var p=Object.prototype.hasOwnProperty;var u=(o,r)=>{for(var t in r)n(o,t,{get:r[t],enumerable:!0})},x=(o,r,t,c)=>{if(r&&typeof r=="object"||typeof r=="function")for(let e of i(r))!p.call(o,e)&&e!==t&&n(o,e,{get:()=>r[e],enumerable:!(c=f(r,e))||c.enumerable});return o};var g=o=>x(n({},"__esModule",{value:!0}),o);var s={};u(s,{core:()=>m});module.exports=g(s);function m(){return"core"}0&&(module.exports={core});