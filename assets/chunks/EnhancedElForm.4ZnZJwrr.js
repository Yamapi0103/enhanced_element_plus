import{h as L,y as j,P as Z,g,a3 as re,d as se,a4 as de,a5 as q,D as _,o as r,b as m,w as B,F as O,m as n,n as ue,r as A,M as R,E as z,c as T,t as H,a as Q,J as pe,a6 as me,e as ie,k as ce,a0 as ve,_ as ye}from"./framework.T2MPfnQk.js";import{_ as X}from"./EnhancedElForm.vue_vue_type_style_index_0_scoped_61e22f48_lang.Vm_MAv6r.js";import{E as _e}from"./index.jmOsIY2Q.js";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const Ve=i=>typeof i<"u";function be(i){return JSON.parse(JSON.stringify(i))}function fe(i,c,I,C={}){var x,w,f;const{clone:S=!1,passive:P=!1,eventName:h,deep:D=!1,defaultValue:J,shouldEmit:E}=C,a=re(),d=I||(a==null?void 0:a.emit)||((x=a==null?void 0:a.$emit)==null?void 0:x.bind(a))||((f=(w=a==null?void 0:a.proxy)==null?void 0:w.$emit)==null?void 0:f.bind(a==null?void 0:a.proxy));let y=h;c||(c="modelValue"),y=y||`update:${c.toString()}`;const v=s=>S?typeof S=="function"?S(s):be(s):s,$=()=>Ve(i[c])?v(i[c]):J,N=s=>{E?E(s)&&d(y,s):d(y,s)};if(P){const s=$(),U=L(s);let k=!1;return j(()=>i[c],F=>{k||(k=!0,U.value=v(F),Z(()=>k=!1))}),j(U,F=>{!k&&(F!==i[c]||D)&&N(F)},{deep:D}),U}else return g({get(){return $()},set(s){N(s)}})}const he={class:"footer-wrap"},Ee=se({__name:"EnhancedElForm",props:{modelValue:{},schema:{default:()=>[]},labelWidth:{default:""},canEditing:{type:Boolean},isInline:{type:Boolean},enterSearch:{type:Function,default:()=>{}},labelPosition:{default:"right"},disabled:{type:Boolean},alwaysEditableColumns:{default:()=>[]}},setup(i,{expose:c,emit:I}){const C=i,x=I,{schema:w,canEditing:f,labelWidth:S,isInline:P,enterSearch:h,labelPosition:D,disabled:J,alwaysEditableColumns:E}=de(C),a=fe(C,"modelValue",x),d=q(new Set),y=L(!1),v=L(),$=q({}),N=t=>t.render?t.render(a):"";E.value.forEach(t=>d.add(t));const s=(t,l)=>{const u=t==null?void 0:t.map(p=>p.prop),V=l.map(p=>p.prop);X.difference(u,V).forEach(p=>{delete a.value[p]})};j(()=>C.schema,(t,l=[])=>{s(l,t);for(let u=0;u<t.length;u++){const V=t[u],{prop:b,defaultValue:p=""}=V;a.value.hasOwnProperty(b)||(a.value[b]=p)}},{immediate:!0});const U=g(()=>f.value?w.value.map(l=>{const{prop:u,type:V}=l;if(!d.has(u)&&l.type!=="slot")return X.omit(l,"type");const b=async()=>{var p;if((p=l.attrs)==null||p.onBlur,V==="input"&&!E.value.includes(u))try{await G(u),d.delete(u)}catch(M){console.log(M)}};return l.attrs={...l.attrs,onBlur:b},l}):w.value),k=()=>{var t;y||(t=h.value)==null||t.call(h)},F=t=>{d.add(t),Z(()=>{var l;(l=$[t])==null||l.focus()})},ee=t=>{t?d.delete(t):(d.clear(),E.value.forEach(l=>d.add(l)))},le=(...t)=>{var l;return(l=v.value)==null?void 0:l.validate(...t)},te=(...t)=>{var l;return(l=v.value)==null?void 0:l.resetFields(...t)},G=(...t)=>{var l;return(l=v.value)==null?void 0:l.validateField(...t)};return c({editingColumn:d,clearEditingColumn:ee,validate:le,resetFields:te,validateField:G,scrollToField:t=>{var l;return(l=v.value)==null?void 0:l.scrollToField(t)},clearValidate:(...t)=>{var l;return(l=v.value)==null?void 0:l.clearValidate(...t)}}),(t,l)=>{const u=_("el-option"),V=_("el-select"),b=_("el-radio"),p=_("el-radio-group"),M=_("el-date-picker"),ae=_("el-input"),oe=_("EnhancedElForm",!0),ne=_("el-form-item");return r(),m(n(_e),{ref_key:"enhancedElFormRef",ref:v,class:"enhanced-el-form",inline:n(P),model:n(a),"label-width":n(S),disabled:n(J),"label-position":n(D),onKeyup:l[1]||(l[1]=ve(e=>typeof n(h)=="function"?k():()=>{},["enter"])),onCompositionstart:l[2]||(l[2]=e=>y.value=!0),onCompositionend:l[3]||(l[3]=e=>y.value=!1)},{default:B(()=>[(r(!0),T(O,null,z(U.value,e=>(r(),m(ne,{key:e.prop,rules:e.rules,label:e.label||"",prop:e.prop,class:ue(`clazz-${e.prop} ${n(f)&&!e.type?"curosr-pointer":""}`),onClick:W=>n(f)&&F(e.prop)},{default:B(()=>{var W,K;return[e.type==="slot"?A(t.$slots,`form-${e.prop}`,{key:0,config:e,isEditing:d.has(e.prop)},void 0,!0):typeof e.render=="function"?(r(),m(N,{key:1,render:e.render},null,8,["render"])):e.type==="select"?(r(),m(V,R({key:2},e.attrs?e.attrs:{},{modelValue:n(a)[e.prop],"onUpdate:modelValue":o=>n(a)[e.prop]=o,onChange:o=>e.change?e.change(o,n(a)):()=>{}}),{default:B(()=>[(r(!0),T(O,null,z(e.options,(o,Y)=>(r(),m(u,{key:Y,value:typeof o=="object"?o.value:o,label:typeof o=="object"?o.label:o},null,8,["value","label"]))),128))]),_:2},1040,["modelValue","onUpdate:modelValue","onChange"])):e.type==="radio"?(r(),m(p,{key:3,modelValue:n(a)[e.prop],"onUpdate:modelValue":o=>n(a)[e.prop]=o},{default:B(()=>[(r(!0),T(O,null,z(e.options,(o,Y)=>(r(),m(b,{key:Y,label:o.value},{default:B(()=>[Q(H(o.label),1)]),_:2},1032,["label"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue"])):e.type==="datepicker"?(r(),m(M,R({key:4,modelValue:n(a)[e.prop],"onUpdate:modelValue":o=>n(a)[e.prop]=o,"value-format":"YYYY-MM-DD"},e.attrs),null,16,["modelValue","onUpdate:modelValue"])):e.type==="input"?(r(),m(ae,R({key:5,ref_for:!0,ref:o=>$[e.prop]=o,modelValue:n(a)[e.prop],"onUpdate:modelValue":o=>n(a)[e.prop]=o},e.attrs),null,16,["modelValue","onUpdate:modelValue"])):e.type?(r(),m(pe(`el-${e.type}`),R({key:6,modelValue:n(a)[e.prop],"onUpdate:modelValue":o=>n(a)[e.prop]=o},e.attrs),null,16,["modelValue","onUpdate:modelValue"])):(r(),T(O,{key:7},[Q(H(((W=e.formater)==null?void 0:W.call(e,n(a)[e.prop]))||n(a)[e.prop]),1)],64)),typeof e.nestedSchema=="function"?(r(),m(oe,{key:8,schema:(K=e.nestedSchema)==null?void 0:K.call(e,n(a)[e.prop]),modelValue:n(a),"onUpdate:modelValue":l[0]||(l[0]=o=>me(a)?a.value=o:null)},null,8,["schema","modelValue"])):ie("",!0)]}),_:2},1032,["rules","label","prop","class","onClick"]))),128)),ce("div",he,[A(t.$slots,"footer",{},void 0,!0)])]),_:3},8,["inline","model","label-width","disabled","label-position"])}}}),$e=ye(Ee,[["__scopeId","data-v-61e22f48"]]);export{$e as E};
