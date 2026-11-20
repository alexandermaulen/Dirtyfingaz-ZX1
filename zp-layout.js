(()=>{"use strict";
if(window.__zpLayoutLoaded)return;
const unit=document.querySelector("#unit"),mid=document.querySelector(".mid"),registryUrl="./zp-agent-registry.json";
if(!unit||!mid)return;
window.__zpLayoutLoaded=true;
const HOLD_MS=420,STORE_KEY="dirtyfingaz-zx1-layout-v3";
const defaults={sample:{left:"L1x",right:"R1x"},pattern:{left:"L1x",right:"R1x"},piano:{left:"L1x",right:"R1x"}};
const safeParse=value=>{try{return JSON.parse(value)}catch{return null}};
const emptyProfile=ctx=>({left:defaults[ctx]?.left||"L1x",right:defaults[ctx]?.right||"R1x",targets:{left:null,right:null}});
const readStore=()=>{try{
 const current=safeParse(localStorage.getItem(STORE_KEY));
 if(current&&current.version===3&&current.contextState)return current;
 const old=safeParse(localStorage.getItem("dirtyfingaz-zx1-layout-v2"))||safeParse(localStorage.getItem("dirtyfingaz-zx1-layout-v1")),contextState={};
 for(const [key,value] of Object.entries(old?.contextState||{})){
  if(!defaults[key])continue;
  contextState[key]={...emptyProfile(key),...value,targets:{...emptyProfile(key).targets,...(value?.targets||{})}};
 }
 return {version:3,contextState,lastContext:old?.lastContext||"sample"};
 }catch{return {version:3,contextState:{},lastContext:"sample"}}};
const store=readStore();
let registry=null,context="sample",activeSide="L",expanded=false,requestSequence=0;
const sideName=side=>side==="L"?"left":"right";
const groupsFor=side=>registry?.panelSystem?.panels?.[sideName(side)]||[];
const profileState=()=>{const base=emptyProfile(context),saved=store.contextState[context]||{};return {...base,...saved,targets:{...base.targets,...(saved.targets||{})}}};
const persist=()=>{try{store.version=3;store.lastContext=context;localStorage.setItem(STORE_KEY,JSON.stringify(store));return true}catch(error){console.warn("ZP target storage:",error);return false}};
const updateState=patch=>{const current=profileState();store.contextState[context]={...current,...patch,targets:{...current.targets,...(patch.targets||{})}};persist()};
const contextNow=()=>mid.classList.contains("piano-open")?(window.__zpPianoEncoderMode?"piano":"pattern"):"sample";
const selectedGroup=side=>{const state=profileState(),id=state[sideName(side)];return groupsFor(side).find(group=>group.id===id)||groupsFor(side)[0]||null};
const button=(label,cls="")=>{const element=document.createElement("button");element.type="button";element.textContent=label;if(cls)element.className=cls;return element};
const dock=document.createElement("section");dock.id="zp-panel-dock";dock.hidden=true;dock.setAttribute("aria-label","Panel de objetivos independientes Lx y Rx");mid.append(dock);
const emit=(name,detail)=>{window.dispatchEvent(new CustomEvent(name,{detail}));try{parent.postMessage({type:name,protocolVersion:1,source:"creator.ui",requestId:detail.requestId,timestamp:detail.timestamp,payload:detail},location.origin)}catch{}};
const targetAction=(side,option)=>registry?.panelSystem?.optionActions?.[context]?.[side]?.[option]||null;
const validActions=new Set(["trim.start","trim.end","pad-pitch","step","pitch","velocity","length"]);
function dispatchTarget(side,target){
 const detail={schemaVersion:2,requestId:"target-"+Date.now().toString(36)+"-"+(++requestSequence),side,context,group:target?.group||null,option:target?.option||null,action:target?.action||null,active:!!target?.action,padId:document.querySelector("#zp-pad-config")?.dataset.padId||null,timestamp:new Date().toISOString()};
 window.dispatchEvent(new CustomEvent("zp-encoder-target-change",{detail}));
}
function applyStoredTargets(){
 if(!registry)return;
 for(const side of ["L","R"]){
  const saved=profileState().targets[sideName(side)],group=selectedGroup(side),action=saved&&group?.id===saved.group&&targetAction(side,saved.option);
  const valid=typeof action==="string"&&validActions.has(action)&&action===saved.action;
  dispatchTarget(side,valid?saved:null);
 }
}
function resolveTarget(side,groupId,option){
 if(!["L","R"].includes(side)||!defaults[context])return null;
 const group=groupsFor(side).find(item=>item.id===groupId);if(!group)return null;
 const options=group.contexts?.[context]||group.options||[];if(!options.includes(option))return null;
 const action=targetAction(side,option);
 return typeof action==="string"&&validActions.has(action)?{group:group.id,option,action}:null;
}
function closeDock(){dock.hidden=true;expanded=false}
window.addEventListener("zp-context-exit",closeDock);
function renderDock(){
 const side=activeSide,groups=groupsFor(side),current=selectedGroup(side),saved=profileState().targets[sideName(side)];
 dock.dataset.side=side;dock.dataset.context=context;dock.replaceChildren();
 const head=document.createElement("div");head.className="zp-panel-head";
 const title=document.createElement("span");title.textContent=(side==="L"?"LEFT MASTER · Lx":"RIGHT MASTER · Rx")+" · "+context.toUpperCase();
 const close=button("×","zp-panel-close");close.setAttribute("aria-label","Cerrar panel");close.addEventListener("click",closeDock);head.append(title,close);
 const tabs=document.createElement("div");tabs.className="zp-panel-tabs";
 groups.forEach(group=>{const tab=button(group.label);tab.setAttribute("aria-pressed",String(group.id===current?.id));tab.addEventListener("click",()=>{
  const targets={...profileState().targets,[sideName(side)]:null};updateState({[sideName(side)]:group.id,targets});dispatchTarget(side,null);expanded=false;renderDock();
 });tabs.append(tab)});
 const label=document.createElement("div");label.className="zp-panel-context";
 label.textContent=(current?.id||"NO GROUP")+" · "+(expanded?"SECONDARY OPTIONS":saved?.group===current?.id?saved.option+" · TARGET ACTIVE":"NO TARGET ASSIGNED");
 const options=document.createElement("div");options.className="zp-panel-options";options.hidden=!expanded;
 (current?.contexts?.[context]||current?.options||[]).forEach(option=>{
  const action=targetAction(side,option),item=button(option),executable=typeof action==="string"&&validActions.has(action);
  item.disabled=!executable;item.title=executable?"Asignar "+action+" a "+side:"Informativo · sin operación integrada";item.setAttribute("aria-disabled",String(!executable));item.setAttribute("aria-pressed",String(saved?.group===current?.id&&saved?.option===option));
  item.addEventListener("click",()=>{
   if(!executable)return;const target=resolveTarget(side,current.id,option);if(!target)return;
   const targets={...profileState().targets,[sideName(side)]:target};updateState({targets});
   const detail={schemaVersion:2,requestId:"panel-"+Date.now().toString(36)+"-"+(++requestSequence),side,group:target.group,option:target.option,action:target.action,context,module:"Creator",padId:document.querySelector("#zp-pad-config")?.dataset.padId||null,timestamp:new Date().toISOString()};
   emit("zp-panel-option-select",detail);dispatchTarget(side,target);closeDock();
  });options.append(item);
 });
 const foot=document.createElement("div");foot.className="zp-panel-foot";foot.textContent=expanded?"TARGET EJECUTABLE · GIRA EL ENCODER PARA EDITAR":"MANTÉN Lx/Rx 420 ms PARA EXPANDIR";
 dock.append(head,tabs,label,options,foot);dock.hidden=false;
}
function openDock(side,expand){if(!registry||!defaults[context])return;activeSide=side;expanded=!!expand;renderDock()}
function bindEncoderHold(selector,side){
 const encoder=document.querySelector(selector);if(!encoder)return;let timer=null,start=null;
 const clear=()=>{if(timer)clearTimeout(timer);timer=null};
 encoder.addEventListener("pointerdown",event=>{clear();start={x:event.clientX,y:event.clientY};timer=setTimeout(()=>{const next=contextNow();if(!defaults[next])return;if(next!==context)setContext(next);openDock(side,true)},HOLD_MS)});
 encoder.addEventListener("pointermove",event=>{if(start&&Math.hypot(event.clientX-start.x,event.clientY-start.y)>9)clear()});
 const end=()=>{clear();start=null};encoder.addEventListener("pointerup",end);encoder.addEventListener("pointercancel",end);
 encoder.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();openDock(side,false)}});
}
function setContext(next){if(!defaults[next])return false;const changed=context!==next;context=next;persist();closeDock();if(changed&&registry)applyStoredTargets();return true}
function syncContext(){const next=contextNow();if(next!==context)setContext(next)}
document.addEventListener("click",event=>{if(!dock.hidden&&!dock.contains(event.target)&&!event.target.closest(".lx,.rx"))closeDock()});
document.addEventListener("zp-panel-context-change",syncContext);
document.querySelector("#scr")?.addEventListener("transitionend",syncContext);
const observer=new MutationObserver(syncContext);observer.observe(mid,{attributes:true,attributeFilter:["class"]});observer.observe(document.querySelector("#scr")||mid,{attributes:true,attributeFilter:["class"]});
bindEncoderHold(".lx","L");bindEncoderHold(".rx","R");
window.ZPLayout={openDock,setContext,getContext:()=>context,closeDock,getPanelState:()=>({...profileState(),targets:{...profileState().targets}}),getTargets:()=>({...profileState().targets}),resolveTarget,policy:{version:2,selection:"independent-per-encoder",contextual:true,unmapped:"informational-disabled"}};
setContext(contextNow());
fetch(registryUrl,{cache:"no-cache"}).then(response=>{if(!response.ok)throw new Error("REGISTRY_HTTP_"+response.status);return response.json()}).then(data=>{
 const panel=data?.panelSystem;if(panel?.version!=="2.0.0"||panel?.targetModel?.selection!=="independent-per-encoder")throw new Error("REGISTRY_TARGET_CONTRACT_UNSUPPORTED");
 registry=data;applyStoredTargets();if(!dock.hidden)renderDock();
}).catch(error=>console.warn("ZP panel registry unavailable:",error));
})();