const UN={1:"Intro & Web Basics",2:"Routing & Jinja2",3:"Forms & Requests",4:"Database & SQLAlchemy",5:"Auth & Sessions",6:"REST API & Deployment"};
const QB=window.QB||[];QB.forEach((q,i)=>q.id=i);
const $=s=>document.querySelector(s);
const esc=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/`([^`]+)`/g,"<code>$1</code>");
const sh=a=>a.map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
let st={u:{},w:[]},S=null,tm=null;
try{st=JSON.parse(localStorage.getItem("flaskmcq"))||st}catch(e){}
const save=()=>{try{localStorage.setItem("flaskmcq",JSON.stringify(st))}catch(e){}};
const pct=(c,t)=>t?Math.round(c/t*100):null;
const verdict=p=>p>=80?["Exam Ready","var(--ok)"]:p>=60?["Revise More","#fbbf24"]:["Weak - study again","var(--no)"];
function home(){clearInterval(tm);let C=0,T=0;
 const cards=Object.keys(UN).map(u=>{const s=st.u[u]||{c:0,t:0},p=pct(s.c,s.t);C+=s.c;T+=s.t;const n=QB.filter(q=>q.u==u).length;
  return `<div class="g"><h2>Unit ${u}: ${UN[u]}</h2><div class="mu">${n} questions | ${p===null?"not attempted":p+"% accuracy"}</div><div class="bar"><i style="width:${p||0}%"></i></div><button class="p" onclick="startUnit(${u})">Practice</button></div>`}).join("");
 const rp=pct(C,T),v=rp===null?null:verdict(rp);
 $("#app").innerHTML=`<h1>Flask VAC 227862 - MCQ Practice</h1><div class="g"><div class="mu">Readiness</div>${v?`<div class="big" style="color:${v[1]}">${rp}%</div><div>${v[0]} (${C}/${T} correct overall)</div>`:`<div>Take a test to see your readiness score.</div>`}
 <p><button class="p" onclick="startMock()">Full mock test (${Math.min(30,QB.length)} Qs, 30 min)</button> <button onclick="startWeak()">Retry my wrong answers (${st.w.length})</button> <button onclick="if(confirm('Reset all progress?')){st={u:{},w:[]};save();home()}">Reset</button></p></div><div class="grid">${cards}</div>`}
function startUnit(u){run(sh(QB.filter(q=>q.u==u)),0)}
function startMock(){run(sh(QB).slice(0,30),30)}
function startWeak(){const l=QB.filter(q=>st.w.includes(q.id));if(!l.length)return alert("No wrong answers saved yet.");run(sh(l),0)}
function run(l,mins){S={l:l.map(q=>({q,o:sh(q.o.map((t,k)=>({t,e:q.e[k],ok:k==q.a})))})),i:0,r:[],end:mins?Date.now()+mins*6e4:0};
 clearInterval(tm);if(mins)tm=setInterval(tick,1000);show()}
function tick(){const L=S.end-Date.now();if(L<=0){clearInterval(tm);return finish()}const e=$("#tm");if(e)e.textContent=Math.floor(L/6e4)+":"+String(Math.floor(L%6e4/1e3)).padStart(2,"0")}
function show(){const x=S.l[S.i],q=x.q;
 $("#app").innerHTML=`<div class="top"><button onclick="if(confirm('Quit this test?'))home()">Exit</button><span class="mu">Question ${S.i+1} of ${S.l.length}</span><b id="tm"></b></div>
 <div class="g"><span class="tag">Unit ${q.u} | ${q.l}</span><h2 style="margin-top:10px">${esc(q.q)}</h2><div id="ops">${x.o.map((o,k)=>`<button class="o" onclick="pick(${k})">${esc(o.t)}</button>`).join("")}</div><div id="nx"></div></div>`;if(S.end)tick()}
function pick(k){const x=S.l[S.i];if(S.r[S.i]!==undefined)return;const good=x.o[k].ok;S.r[S.i]=good;
 document.querySelectorAll(".o").forEach((b,j)=>{const o=x.o[j];b.className="o "+(o.ok?"ok":j==k?"no":"");
  b.innerHTML=`${esc(o.t)}<div class="ex">${o.ok?"Sahi: ":"Galat: "}${esc(o.e)}</div>`});
 $("#nx").innerHTML=`<p><b style="color:${good?"var(--ok)":"var(--no)"}">${good?"Correct!":"Wrong - read why below"}</b></p><button class="p" onclick="next()">${S.i+1<S.l.length?"Next":"Finish"}</button>`}
function next(){S.i++;S.i<S.l.length?show():finish()}
function finish(){clearInterval(tm);let c=0;const per={};
 S.l.forEach((x,i)=>{const u=x.q.u,ok=S.r[i]===true;per[u]=per[u]||{c:0,t:0};per[u].t++;if(ok){per[u].c++;c++;st.w=st.w.filter(id=>id!=x.q.id)}else if(!st.w.includes(x.q.id))st.w.push(x.q.id);
  const s=st.u[u]=st.u[u]||{c:0,t:0};s.t++;if(ok)s.c++});save();
 const p=pct(c,S.l.length),v=verdict(p);
 $("#app").innerHTML=`<div class="g"><div class="mu">Result</div><div class="big" style="color:${v[1]}">${p}%</div><div>${c}/${S.l.length} correct - ${v[0]}</div></div>
 <div class="g"><h2>Unit-wise</h2>${Object.keys(per).map(u=>{const q=pct(per[u].c,per[u].t);return `<div>Unit ${u}: ${UN[u]} - ${per[u].c}/${per[u].t}<div class="bar"><i style="width:${q}%"></i></div></div>`}).join("")}</div>
 <button class="p" onclick="home()">Home</button> <button onclick="startWeak()">Retry wrong answers</button>`}
home();
