(()=>{"use strict";
if(window.__zpLayoutLoaded)return;window.__zpLayoutLoaded=true;
const unit=document.querySelector("#unit"),mid=document.querySelector(".mid"),registryUrl="./zp-agent-registry.json";
if(!unit||!mid)return;
const HOLD_MS=420,STORE_KEY="dirtyfingaz-zx1-layout-v2";
const defaults={sample:{left:"L1x",right:"R1x"},pattern:{left:"L1x",right:"R1x"},piano:{left:"L1x",right:"R1x"},fx:{left:"L2x",right:"R3x"},master:{left:"L3x",right:"R3x"}};
const safeParse=value=>{try{return JSON.parse(value)}catch{return null}};
const readStore=()=>{try{const current=safeParse(localStorage.getItem(STORE_KEY));if(current&&current.version===2&&current.contextState)return current;const legacy=safeParse(localStorage.getItem("dirtyfingaz-zx1-layout-v1"));return {version:2,contextState:legacy?.contextState||{},lastContext:legacy?.lastContext||"sample"}}catch{return {version:2,contextState:{},lastContext:"sample"}}};
const store=readStore();
let registry=null,context="sample",activeSide="L",expanded=false;
const emit=(name,detail)=>{const packet={type:name,protocolVersion:1,source:"creator.ui",requestId:detail.requestId,timestamp:detail.timestamp,payload:detail};window.dispatchEvent(new CustomEvent(name,{detail}));try{parent.postMessage(packet,location.origin)}catch{}};
const persist=()=>{try{store.version=2;store.lastContext=context;localStorage.setItem(STORE_KEY,JSON.stringify(store));return true}catch(error){console.warn("ZP panel storage:",error);return false}};
const contextNow=()=>mid.classList.contains("piano-open")?"piano":document.querySelector("#scr")?.classList.contains("pr")?"pattern":"sample";
const profileState=()=>store.contextState[context]||{left:defaults[context]?.left||"L1x",right:defaults[context]?.right||"R1x"};
const updateState=patch=>{store.contextState[context]={...profileState(),...patch};persist()};
const sideName=side=>side==="L"?"left":"right";
const groupsFor=side=>registry?.panelSystem?.panels?.[sideName(side)]||[];
const selectedGroup=side=>{const state=profileState(),id=state[sideName(side)]||defaults[context]?.[sideName(side)];return groupsFor(side).find(group=>group.id===id)||groupsFor(side)[0]};
const button=(label,cls="")=>{const element=document.createElement("button");element.type="button";element.textContent=label;if(cls)element.className=cls;return element};
const dock=document.createElement("section");dock.id="zp-panel-dock";dock.hidden=true;dock.setAttribute("aria-label","Panel de controles contextuales");mid.append(dock);
function closeDock(){dock.hidden=true;expanded=false}
function renderDock(){
 const side=activeSide,groups=groupsFor(side),current=selectedGroup(side);
 dock.dataset.side=side;dock.replaceChildren();
 const head=document.createElement("div");head.className="zp-panel-head";
 const title=document.createElement("span");title.textContent=(side==="L"?"LEFT MASTER":"RIGHT MASTER")+" · "+context.toUpperCase();
 const close=button("×","zp-panel-close");close.setAttribute("aria-label","Cerrar panel");close.addEventListener("click",closeDock);head.append(title,close);
 const tabs=document.createElement("div");tabs.className="zp-panel-tabs";
 groups.forEach(group=>{const tab=button(group.label);tab.setAttribute("aria-pressed",String(group.id===current?.id));tab.addEventListener("click",()=>{updateState({[sideName(side)]:group.id});expanded=false;renderDock()});tabs.append(tab)});
 const label=document.createElement("div");label.className="zp-panel-context";label.textContent=(current?.id||"NO GROUP")+" · "+(expanded?"SECONDARY OPTIONS":"SELECTED GROUP");
 const options=document.createElement("div");options.className="zp-panel-options";options.hidden=!expanded;
 const contextual=current?.contexts?.[context]||current?.options||[];
 contextual.forEach(option=>{const item=button(option);item.addEventListener("click",()=>{const timestamp=new Date().toISOString(),requestId="panel-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,8);const detail={schemaVersion:1,requestId,side,group:current.id,option,context,module:"Creator",padId:document.querySelector("#zp-pad-config")?.dataset.padId||null,timestamp};emit("zp-panel-option-select",detail);closeDock()});options.append(item)});
 const foot=document.createElement("div");foot.className="zp-panel-foot";foot.textContent=expanded?"SELECCIÓN CONTEXTUAL · SIN COMANDO DE MOTOR":"MANTÉN Lx/Rx 420 ms PARA EXPANDIR";
 dock.append(head,tabs,label,options,foot);dock.hidden=false;
}
function openDock(side,expand){activeSide=side;expanded=!!expand;renderDock()}
function bindEncoderHold(selector,side){
 const encoder=document.querySelector(selector);if(!encoder)return;
 let timer=null,start=null;
 const clear=()=>{if(timer)clearTimeout(timer);timer=null};
 encoder.addEventListener("pointerdown",event=>{clear();start={x:event.clientX,y:event.clientY};timer=setTimeout(()=>{const ctx=contextNow();if(ctx==="sample"||(side==="L"&&ctx!=="pattern"&&ctx!=="piano"))return;openDock(side,true)},HOLD_MS)});
 encoder.addEventListener("pointermove",event=>{if(start&&Math.hypot(event.clientX-start.x,event.clientY-start.y)>9)clear()});
 const end=()=>{clear();start=null};
 encoder.addEventListener("pointerup",end);encoder.addEventListener("pointercancel",end);
 encoder.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();openDock(side,false)}});
}
function setContext(next){if(!defaults[next])return;context=next;persist();closeDock()}
function syncContext(){const next=contextNow();if(next!==context)setContext(next)}
document.addEventListener("click",event=>{if(!dock.hidden&&!dock.contains(event.target)&&!event.target.closest(".lx,.rx"))closeDock()});
document.addEventListener("zp-panel-context-change",syncContext);
document.querySelector("#scr")?.addEventListener("transitionend",syncContext);
const observer=new MutationObserver(syncContext);observer.observe(mid,{attributes:true,attributeFilter:["class"]});observer.observe(document.querySelector("#scr")||mid,{attributes:true,attributeFilter:["class"]});
bindEncoderHold(".lx","L");bindEncoderHold(".rx","R");
window.ZPLayout={openDock,setContext,getContext:()=>context,closeDock,getPanelState:()=>({...profileState()}),policy:{status:"fixed",editing:false}};
setContext(contextNow());
fetch(registryUrl,{cache:"no-cache"}).then(response=>{if(!response.ok)throw new Error("REGISTRY_HTTP_"+response.status);return response.json()}).then(data=>{registry=data;if(!dock.hidden)renderDock()}).catch(error=>console.warn("ZP panel registry unavailable:",error));
})();