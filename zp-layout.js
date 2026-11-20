(()=>{"use strict";
if(window.__zpLayoutLoaded)return;
const unit=document.querySelector("#unit"),mid=document.querySelector(".mid"),registryUrl="./zp-agent-registry.json";
if(!unit||!mid)return;
window.__zpLayoutLoaded=true;
const HOLD_MS=420,STORE_KEY="dirtyfingaz-zx1-layout-v3";
const defaults={sample:{left:"L1x",right:"R1x"},pattern:{left:"L1x",right:"R1x"},piano:{left:"L1x",right:"R1x"}};
const defaultShiftPrecision={sample:10,pattern:10,piano:50};
const safeParse=value=>{try{return JSON.parse(value)}catch{return null}};
const emptyProfile=ctx=>({left:defaults[ctx]?.left||"L1x",right:defaults[ctx]?.right||"R1x",targets:{left:null,right:null},released:false});
const readStore=()=>{try{
 const current=safeParse(localStorage.getItem(STORE_KEY));
 if(current&&current.version===3&&current.contextState)return {...current,shiftPrecision:{...defaultShiftPrecision,...(current.shiftPrecision||{})}};
 const old=safeParse(localStorage.getItem("dirtyfingaz-zx1-layout-v2"))||safeParse(localStorage.getItem("dirtyfingaz-zx1-layout-v1")),contextState={};
 for(const [key,value] of Object.entries(old?.contextState||{})){
  if(!defaults[key])continue;
  contextState[key]={...emptyProfile(key),...value,targets:{...emptyProfile(key).targets,...(value?.targets||{})}};
 }
 return {version:3,contextState,lastContext:old?.lastContext||"sample",shiftPrecision:{...defaultShiftPrecision}};
 }catch{return {version:3,contextState:{},lastContext:"sample"}}};
const store=readStore();
let registry=null,context="sample",activeSide="L",expanded=false,requestSequence=0,clearSnapshot=null;
const shiftSpeed={L:0,R:0};
const sideName=side=>side==="L"?"left":"right";
const groupsFor=side=>registry?.panelSystem?.panels?.[sideName(side)]||[];
const profileState=()=>{const base=emptyProfile(context),saved=store.contextState[context]||{};return {...base,...saved,targets:{...base.targets,...(saved.targets||{})}}};
const persist=()=>{try{store.version=3;store.lastContext=context;store.shiftPrecision={...defaultShiftPrecision,...(store.shiftPrecision||{})};localStorage.setItem(STORE_KEY,JSON.stringify(store));return true}catch(error){console.warn("ZP target storage:",error);return false}};
const updateState=patch=>{const current=profileState();store.contextState[context]={...current,...patch,targets:{...current.targets,...(patch.targets||{})}};persist()};
const contextNow=()=>mid.classList.contains("piano-open")?(window.__zpPianoEncoderMode?"piano":"pattern"):"sample";
const selectedGroup=side=>{const state=profileState(),id=state[sideName(side)];return groupsFor(side).find(group=>group.id===id)||groupsFor(side)[0]||null};
const button=(label,cls="")=>{const element=document.createElement("button");element.type="button";element.textContent=label;if(cls)element.className=cls;return element};
const dock=document.createElement("section");dock.id="zp-panel-dock";dock.hidden=true;dock.setAttribute("aria-label","Panel de objetivos independientes Lx y Rx");mid.append(dock);
const scr=document.querySelector("#scr");
const lcdTools=document.createElement("div");lcdTools.className="zp-lcd-tools";lcdTools.setAttribute("aria-label","Herramientas de encoder");
const clearButton=button("Ø","zp-lcd-tool zp-clear-target");clearButton.setAttribute("aria-label","CLEAR TARGET · liberar Lx y Rx");clearButton.title="CLEAR TARGET · BOTH";
const shiftButton=button("S","zp-lcd-tool zp-shift-config");shiftButton.setAttribute("aria-label","Configurar precisión SHIFT");shiftButton.setAttribute("aria-expanded","false");
const shiftPanel=document.createElement("div");shiftPanel.className="zp-shift-panel";shiftPanel.hidden=true;
const shiftLabel=document.createElement("label"),shiftName=document.createElement("span"),shiftOutput=document.createElement("output"),shiftRange=document.createElement("input"),shiftNote=document.createElement("small");
shiftName.textContent="SHIFT PRECISION";shiftRange.type="range";shiftRange.min="10";shiftRange.max="50";shiftRange.step="5";shiftRange.setAttribute("aria-label","Sensibilidad de SHIFT, porcentaje");shiftNote.textContent="ADAPTIVE · GIRO";shiftLabel.append(shiftName,shiftOutput);shiftPanel.append(shiftLabel,shiftRange,shiftNote);lcdTools.append(clearButton,shiftButton);scr?.append(lcdTools,shiftPanel);
const emit=(name,detail)=>{window.dispatchEvent(new CustomEvent(name,{detail}));try{parent.postMessage({type:name,protocolVersion:1,source:"creator.ui",requestId:detail.requestId,timestamp:detail.timestamp,payload:detail},location.origin)}catch{}};
const targetAction=(side,option)=>registry?.panelSystem?.optionActions?.[context]?.[side]?.[option]||null;
const syncToolbar=()=>{const state=profileState(),released=!!state.released;clearButton.classList.toggle("is-cleared",released);clearButton.setAttribute("aria-pressed",String(released));clearButton.title=released?"CLEAR TARGET · RESTAURAR Lx + Rx":"CLEAR TARGET · BOTH";clearButton.setAttribute("aria-label",released?"Restaurar objetivos Lx y Rx":"Liberar objetivos Lx y Rx");const value=Number(store.shiftPrecision?.[context]??defaultShiftPrecision[context]);shiftRange.value=String(Math.max(10,Math.min(50,value)));shiftOutput.textContent=shiftRange.value+"%";};
const resetShiftGesture=side=>{if(side==="L"||side==="R")shiftSpeed[side]=0};
const getAdaptiveShiftRatio=(side,delta,elapsed)=>{if(side!=="L"&&side!=="R")return .1;const maximum=Math.max(.1,Math.min(.5,Number(store.shiftPrecision?.[context]??defaultShiftPrecision[context])/100)),minimum=.1,speed=Math.abs(Number(delta)||0)/Math.max(1,Number(elapsed)||16),previous=shiftSpeed[side],relative=previous>0?Math.max(0,Math.min(1,speed/previous)):1,ratio=minimum+(maximum-minimum)*relative;shiftSpeed[side]=previous>0?previous*.75+speed*.25:speed;return Math.max(minimum,Math.min(maximum,ratio))};
function toggleClearTargets(){
 const state=profileState();
 if(!state.released){
  clearSnapshot={context,groups:{left:state.left,right:state.right},targets:{left:state.targets.left,right:state.targets.right}};
  updateState({targets:{left:null,right:null},released:true});dispatchTarget("L",null,true);dispatchTarget("R",null,true);
 }else{
  const snapshot=clearSnapshot;
  if(!snapshot){updateState({targets:{left:null,right:null},released:false});dispatchTarget("L",null,false);dispatchTarget("R",null,false);syncToolbar();return true}
  if(snapshot.context!==context||snapshot.groups.left!==state.left||snapshot.groups.right!==state.right)return false;
  const valid=side=>{const saved=snapshot.targets[sideName(side)];if(!saved)return true;const resolved=resolveTarget(side,saved.group,saved.option);return !!resolved&&resolved.action===saved.action};
  if(!valid("L")||!valid("R")){clearSnapshot=null;return false}
  updateState({targets:snapshot.targets,released:false});dispatchTarget("L",snapshot.targets.left,false);dispatchTarget("R",snapshot.targets.right,false);clearSnapshot=null;
 }
 syncToolbar();if(!dock.hidden)renderDock();return true;
}
clearButton.addEventListener("click",event=>{event.stopPropagation();toggleClearTargets()});
shiftButton.addEventListener("click",event=>{event.stopPropagation();shiftPanel.hidden=!shiftPanel.hidden;shiftButton.setAttribute("aria-expanded",String(!shiftPanel.hidden))});
shiftPanel.addEventListener("click",event=>event.stopPropagation());
shiftRange.addEventListener("input",()=>{store.shiftPrecision={...defaultShiftPrecision,...(store.shiftPrecision||{}),[context]:Number(shiftRange.value)};persist();syncToolbar()});
const validActions=new Set(["trim.start","trim.end","pad-pitch","step","pitch","velocity","length"]);
function dispatchTarget(side,target,released=false){
 const detail={schemaVersion:2,requestId:"target-"+Date.now().toString(36)+"-"+(++requestSequence),side,context,group:target?.group||null,option:target?.option||null,action:target?.action||null,active:!!target?.action,released:!!released,padId:document.querySelector("#zp-pad-config")?.dataset.padId||null,timestamp:new Date().toISOString()};
 window.dispatchEvent(new CustomEvent("zp-encoder-target-change",{detail}));
}
function applyStoredTargets(){
 if(!registry)return;
 const state=profileState();
 for(const side of ["L","R"]){
  if(state.released){dispatchTarget(side,null,true);continue}
  const saved=state.targets[sideName(side)],group=selectedGroup(side),action=saved&&group?.id===saved.group&&targetAction(side,saved.option);
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
  clearSnapshot=null;const targets={...profileState().targets,[sideName(side)]:null};updateState({[sideName(side)]:group.id,targets,released:false});dispatchTarget(side,null,false);syncToolbar();expanded=false;renderDock();
 });tabs.append(tab)});
 const label=document.createElement("div");label.className="zp-panel-context";
 label.textContent=profileState().released?"BOTH TARGETS RELEASED":(current?.id||"NO GROUP")+" · "+(expanded?"SECONDARY OPTIONS":saved?.group===current?.id?saved.option+" · TARGET ACTIVE":"NO TARGET ASSIGNED");
 const options=document.createElement("div");options.className="zp-panel-options";options.hidden=!expanded;
 (current?.contexts?.[context]||current?.options||[]).forEach(option=>{
  const action=targetAction(side,option),item=button(option),executable=typeof action==="string"&&validActions.has(action);
  item.disabled=!executable;item.title=executable?"Asignar "+action+" a "+side:"Informativo · sin operación integrada";item.setAttribute("aria-disabled",String(!executable));item.setAttribute("aria-pressed",String(saved?.group===current?.id&&saved?.option===option));
  item.addEventListener("click",()=>{
   if(!executable)return;const target=resolveTarget(side,current.id,option);if(!target)return;
   clearSnapshot=null;const targets={...profileState().targets,[sideName(side)]:target};updateState({targets,released:false});syncToolbar();
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
function setContext(next){if(!defaults[next])return false;const changed=context!==next;if(changed){clearSnapshot=null;shiftSpeed.L=0;shiftSpeed.R=0;shiftPanel.hidden=true;shiftButton.setAttribute("aria-expanded","false")}context=next;persist();syncToolbar();closeDock();if(changed&&registry)applyStoredTargets();return true}
function syncContext(){const next=contextNow();if(next!==context)setContext(next)}
document.addEventListener("click",event=>{if(!dock.hidden&&!dock.contains(event.target)&&!event.target.closest(".lx,.rx"))closeDock()});
document.addEventListener("zp-panel-context-change",syncContext);
document.querySelector("#scr")?.addEventListener("transitionend",syncContext);
const observer=new MutationObserver(syncContext);observer.observe(mid,{attributes:true,attributeFilter:["class"]});observer.observe(document.querySelector("#scr")||mid,{attributes:true,attributeFilter:["class"]});
bindEncoderHold(".lx","L");bindEncoderHold(".rx","R");
window.ZPLayout={openDock,setContext,getContext:()=>context,closeDock,toggleClearTargets,getAdaptiveShiftRatio,resetShiftGesture,getShiftPrecision:()=>Number(store.shiftPrecision?.[context]??defaultShiftPrecision[context]),getPanelState:()=>({...profileState(),targets:{...profileState().targets}}),getTargets:()=>({...profileState().targets}),resolveTarget,policy:{version:3,selection:"independent-per-encoder",clearTarget:"both-toggle-context-safe",shift:"adaptive-configurable",unmapped:"informational-disabled"}};
setContext(contextNow());syncToolbar();
fetch(registryUrl,{cache:"no-cache"}).then(response=>{if(!response.ok)throw new Error("REGISTRY_HTTP_"+response.status);return response.json()}).then(data=>{
 const panel=data?.panelSystem;if(panel?.version!=="2.0.0"||panel?.targetModel?.selection!=="independent-per-encoder")throw new Error("REGISTRY_TARGET_CONTRACT_UNSUPPORTED");
 registry=data;applyStoredTargets();if(!dock.hidden)renderDock();
}).catch(error=>console.warn("ZP panel registry unavailable:",error));
})();