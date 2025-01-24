import{h as z,y as j,P as q,g as A,a3 as Z,d as g,a4 as ee,a5 as G,D as y,o as r,b as p,w as U,F as I,m as n,n as le,r as te,M as N,E as Y,c as O,t as K,a as L,J as ae,a0 as oe,_ as ne}from"./framework.d3e9wyiU.js";import{_ as re}from"./EnhancedElForm.vue_vue_type_style_index_0_scoped_bddf29a0_lang.qRrHKohl.js";import{E as se}from"./index.SJefeE_9.js";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const de=u=>typeof u<"u";function ue(u){return JSON.parse(JSON.stringify(u))}function pe(u,i,R,E={}){var x,F,_;const{clone:C=!1,passive:J=!1,eventName:b,deep:B=!1,defaultValue:M,shouldEmit:V}=E,a=Z(),d=R||(a==null?void 0:a.emit)||((x=a==null?void 0:a.$emit)==null?void 0:x.bind(a))||((_=(F=a==null?void 0:a.proxy)==null?void 0:F.$emit)==null?void 0:_.bind(a==null?void 0:a.proxy));let c=b;i||(i="modelValue"),c=c||`update:${i.toString()}`;const m=s=>C?typeof C=="function"?C(s):ue(s):s,k=()=>de(u[i])?m(u[i]):M,D=s=>{V?V(s)&&d(c,s):d(c,s)};if(J){const s=k(),S=z(s);let f=!1;return j(()=>u[i],w=>{f||(f=!0,S.value=m(w),q(()=>f=!1))}),j(S,w=>{!f&&(w!==u[i]||B)&&D(w)},{deep:B}),S}else return A({get(){return k()},set(s){D(s)}})}const ie=g({__name:"EnhancedElForm",props:{modelValue:{},schema:{},labelWidth:{default:""},canEditing:{type:Boolean},isInline:{type:Boolean},enterSearch:{type:Function,default:()=>{}},labelPosition:{default:"right"},disabled:{type:Boolean},alwaysEditableColumns:{default:()=>[]}},emits:["update:modelValue"],setup(u,{expose:i,emit:R}){const E=u,x=R,{schema:F,canEditing:_,labelWidth:C,isInline:J,enterSearch:b,labelPosition:B,disabled:M,alwaysEditableColumns:V}=ee(E),a=pe(E,"modelValue",x),d=G(new Set),c=z(!1),m=z(),k=G({}),D=t=>t.render?t.render(a):"";V.value.forEach(t=>d.add(t)),j(()=>E.schema,t=>{if(t)for(let l=0;l<t.length;l++){const v=t[l],{prop:h,defaultValue:$=""}=v;a.value.hasOwnProperty(h)||(a.value[h]=$)}},{immediate:!0});const s=A(()=>_.value?F.value.map(l=>{const{prop:v,type:h}=l;if(!d.has(v)&&l.type!=="slot")return re.omit(l,"type");const $=()=>{var T;(T=l.attrs)==null||T.onBlur,h==="input"&&(V.value.includes(v)||d.delete(v))};return l.attrs={...l.attrs,onBlur:$},l}):F.value),S=()=>{var t;c||(t=b.value)==null||t.call(b)},f=t=>{d.add(t),q(()=>{var l;(l=k[t])==null||l.focus()})};return i({editingColumn:d,clearEditingColumn:t=>{t?d.delete(t):(d.clear(),V.value.forEach(l=>d.add(l)))},validate:(...t)=>{var l;return(l=m.value)==null?void 0:l.validate(...t)},resetFields:(...t)=>{var l;return(l=m.value)==null?void 0:l.resetFields(...t)},validateField:(...t)=>{var l;return(l=m.value)==null?void 0:l.validateField(...t)},scrollToField:t=>{var l;return(l=m.value)==null?void 0:l.scrollToField(t)},clearValidate:(...t)=>{var l;return(l=m.value)==null?void 0:l.clearValidate(...t)}}),(t,l)=>{const v=y("el-option"),h=y("el-select"),$=y("el-radio"),T=y("el-radio-group"),H=y("el-date-picker"),Q=y("el-input"),X=y("el-form-item");return r(),p(n(se),{ref_key:"enhancedElFormRef",ref:m,class:"enhanced-el-form",inline:n(J),model:n(a),"label-width":n(C),disabled:n(M),"label-position":n(B),onKeyup:l[0]||(l[0]=oe(e=>typeof n(b)=="function"?S():()=>{},["enter"])),onCompositionstart:l[1]||(l[1]=e=>c.value=!0),onCompositionend:l[2]||(l[2]=e=>c.value=!1)},{default:U(()=>[(r(!0),O(I,null,Y(s.value,e=>(r(),p(X,{key:e.prop,rules:e.rules,label:e.label||"",prop:e.prop,class:le(`clazz-${e.prop} ${n(_)&&!e.type?"curosr-pointer":""}`),onClick:P=>n(_)&&f(e.prop)},{default:U(()=>{var P;return[e.type==="slot"?te(t.$slots,`form-${e.prop}`,{key:0,config:e,isEditing:d.has(e.prop)},void 0,!0):typeof e.render=="function"?(r(),p(D,{key:1,render:e.render},null,8,["render"])):e.type==="select"?(r(),p(h,N({key:2},e.attrs?e.attrs:{},{modelValue:n(a)[e.prop],"onUpdate:modelValue":o=>n(a)[e.prop]=o,onChange:o=>e.change?e.change(o,n(a)):()=>{}}),{default:U(()=>[(r(!0),O(I,null,Y(e.options,(o,W)=>(r(),p(v,{key:W,value:typeof o=="object"?o.value:o,label:typeof o=="object"?o.label:o},null,8,["value","label"]))),128))]),_:2},1040,["modelValue","onUpdate:modelValue","onChange"])):e.type==="radio"?(r(),p(T,{key:3,modelValue:n(a)[e.prop],"onUpdate:modelValue":o=>n(a)[e.prop]=o},{default:U(()=>[(r(!0),O(I,null,Y(e.options,(o,W)=>(r(),p($,{key:W,label:o.value},{default:U(()=>[L(K(o.label),1)]),_:2},1032,["label"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue"])):e.type==="datepicker"?(r(),p(H,N({key:4,modelValue:n(a)[e.prop],"onUpdate:modelValue":o=>n(a)[e.prop]=o,"value-format":"YYYY-MM-DD"},e.attrs),null,16,["modelValue","onUpdate:modelValue"])):e.type==="input"?(r(),p(Q,N({key:5,ref_for:!0,ref:o=>k[e.prop]=o,modelValue:n(a)[e.prop],"onUpdate:modelValue":o=>n(a)[e.prop]=o},e.attrs),null,16,["modelValue","onUpdate:modelValue"])):e.type?(r(),p(ae(`el-${e.type}`),N({key:6,modelValue:n(a)[e.prop],"onUpdate:modelValue":o=>n(a)[e.prop]=o},e.attrs),null,16,["modelValue","onUpdate:modelValue"])):(r(),O(I,{key:7},[L(K(((P=e.formater)==null?void 0:P.call(e,n(a)[e.prop]))||n(a)[e.prop]),1)],64))]}),_:2},1032,["rules","label","prop","class","onClick"]))),128))]),_:3},8,["inline","model","label-width","disabled","label-position"])}}}),he=ne(ie,[["__scopeId","data-v-bddf29a0"]]);export{he as E};
