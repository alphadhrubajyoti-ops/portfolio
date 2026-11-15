(function(){
'use strict';
const S=window.SITE,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const chips=(a,c='')=>a&&a.length?`<div class="chips ${c}">${a.map(t=>`<span>${esc(t)}</span>`).join('')}</div>`:'';
const root=document.documentElement;

/* ---------- render content from config ---------- */
function shot(p){return `<div class="ph"><b>${esc(p.img)}</b>Screenshot placeholder<br>assets/projects/</div>`+(p.hasImage?`<img src="assets/projects/${esc(p.img)}" alt="${esc(p.title)} screenshot" loading="lazy">`:'')}
$('#skillGrid').innerHTML=S.skills.map(([t,l],i)=>`<div class="cat rv" style="--i:${i}"><h3>${esc(t)}</h3>${chips(l)}</div>`).join('');
/* one slide per company */
$('#journey').insertAdjacentHTML('beforebegin',S.companies.map((c,i)=>`<section id="${i?'co-'+(i+1):'companies'}" class="scene" data-label="${esc(c.name)}"><div class="wrap"><p class="eyebrow mono rv">03 — Companies &amp; Products · ${i+1}/${S.companies.length}</p><article class="co${i%2?' alt':''} rv"><div class="logo"><img src="${esc(c.logo)}" alt="${esc(c.name)} logo" width="380" height="285"></div><div><span class="role">${esc(c.role)}</span><span class="cat2">${esc(c.category)}</span><h3>${esc(c.headline)}</h3><p>${esc(c.desc)}</p><p class="inv">${esc(c.involvement)}</p>${chips(c.services,'sm')}${chips(c.tech,'sm')}</div></article></div></section>`).join(''));
$('#timeline').insertAdjacentHTML('beforeend',S.companies.map(c=>`<li class="tl rv"><div class="lg"><img src="${esc(c.logo)}" alt="" loading="lazy" width="60" height="60"></div><div><h3>${esc(c.name)}</h3><p><b style="color:#fff;font-weight:500">${esc(c.role)}</b> · ${esc(c.category)}<br>${esc(c.desc)}</p></div></li>`).join(''));
/* works split across slides so every page fits the screen */
(function(){const per=innerWidth>900?3:2,N=S.projects.length,ns=Math.ceil(N/per),base=Math.floor(N/ns),ex=N%ns;let k=0,h='';
 for(let s=0;s<ns;s++){const len=base+(s<ex?1:0);
  const cards=S.projects.slice(k,k+len).map((p,j)=>`<button class="work rv" data-i="${k+j}" aria-label="Open ${esc(p.title)} details"><div class="shot">${shot(p)}</div><div class="winfo"><small>${esc(p.category)}</small><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p></div></button>`).join('');k+=len;
  h+=`<section id="${s?'works-'+(s+1):'works'}" class="scene" data-label="Works"><div class="wrap"><p class="eyebrow mono rv">05 — Selected Works · ${s+1}/${ns}</p><h2 class="big rv">Websites I've <em>built.</em></h2><div class="works" style="--n:${len}">${cards}</div></div></section>`}
 $('#vision').insertAdjacentHTML('beforebegin',h)})();
const L=S.links,so=[['LinkedIn',L.linkedin],['GitHub',L.github],['Fiverr',L.fiverr],['Instagram',L.instagram]];
$('#socials').innerHTML=so.map(([n,u])=>`<li>${u?`<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${n}</a>`:`<span>${n} · soon</span>`}</li>`).join('');
$('#mail').href='mailto:'+S.email;$('#mail').textContent=S.email;
if(S.showPhone)$('#phone').textContent=S.phone;
$('#yr').textContent=new Date().getFullYear();

/* ---------- project dialog ---------- */
const dlg=$('#pd');
document.addEventListener('click',e=>{const b=e.target.closest('.work');if(!b)return;const p=S.projects[+b.dataset.i];
 $('#pdBody').innerHTML=`<div class="pd"><div class="shot">${shot(p)}</div><div class="winfo"><small>${esc(p.category)}</small><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p><dl><dt>My contribution</dt><dd>${esc(p.contribution)}</dd><dt>Status</dt><dd>${esc(p.status)}</dd>${p.tech.length?`<dt>Technologies</dt><dd>${p.tech.map(esc).join(', ')}</dd>`:''}</dl>${p.url?`<a class="btn" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">Visit live site ↗</a>`:''}</div></div>`;
 dlg.showModal()});
dlg.addEventListener('click',e=>{if(e.target===dlg||e.target.closest('.x'))dlg.close()});
dlg.addEventListener('close',()=>sched());

/* ---------- reveal on scroll ---------- */
const rvIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rvIO.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach((el,i)=>{el.style.setProperty('--i',el.style.getPropertyValue('--i')||(i%4));rvIO.observe(el)});

/* ---------- sections, dots, nav ---------- */
const secs=$$('.scene'),last=secs.length-1,tl=$('#timeline'),bar=$('#bar i'),journey=$('#journey');
let idx=0,deck=false,playing=!RM,introDone=RM,timer,lock=false;
$('#dots').innerHTML=secs.map(s=>`<li><a href="#${s.id}" aria-label="${esc(s.dataset.label)}" title="${esc(s.dataset.label)}"></a></li>`).join('');
const dots=$$('#dots a'),links=$$('#menu a'),playBtn=$('#play'),skipS=$('#skipSlides');
function mark(){dots.forEach((d,i)=>d.classList.toggle('act',i===idx));
 const id=secs[idx].id,grp=id.startsWith('co-')?'companies':id.startsWith('works')?'works':id;
 links.forEach(a=>a.classList.toggle('act',a.hash==='#'+grp));
 if(deck)bar.style.width=(idx/last*100)+'%'}
const secIO=new IntersectionObserver(es=>es.forEach(e=>{if(deck||!e.isIntersecting)return;idx=secs.indexOf(e.target);mark()}),{rootMargin:'-45% 0px -45% 0px'});
secs.forEach(s=>secIO.observe(s));
let tick=false;addEventListener('scroll',()=>{if(deck||tick)return;tick=true;requestAnimationFrame(()=>{tick=false;
 bar.style.width=(scrollY/(root.scrollHeight-innerHeight||1)*100)+'%';
 const r=tl.getBoundingClientRect();tl.style.setProperty('--p',Math.max(0,Math.min(100,(innerHeight*.6-r.top)/r.height*100))+'%')})},{passive:true});
const burger=$('#burger'),menu=$('#menu');
burger.addEventListener('click',()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
$('#top').addEventListener('click',()=>{deck?show(0):scrollTo({top:0})});

/* ---------- slideshow controller ---------- */
function layout(){secs.forEach((s,i)=>{s.classList.toggle('cur',i===idx);s.classList.toggle('before',i<idx);s.inert=deck&&i!==idx})}
function show(i){i=Math.max(0,Math.min(last,i));const first=!deck||i!==idx||!secs[i].classList.contains('cur');idx=i;layout();mark();
 const c=secs[idx];if(first)c.scrollTop=0;$$('.rv',c).forEach(el=>el.classList.add('in'));
 tl.style.setProperty('--p',c===journey?'100%':'0%');
 if(idx>0&&!introDone){finish()}
 sched()}
function sched(){clearTimeout(timer);if(!deck||!playing||dlg.open)return;
 if(idx===0&&!introDone)return;
 if(idx===last){timer=setTimeout(()=>{if(deck&&playing)exitDeck(last)},3500);return}
 const c=secs[idx],w=c.innerText.split(/\s+/).length,over=Math.max(0,c.scrollHeight/c.clientHeight-1)*4500;
 const t=idx===0?1800:Math.min(14000,3200+w*55+over);
 timer=setTimeout(()=>{if(deck&&playing&&!dlg.open)show(idx+1)},t)}
function setPlay(v){playing=v;playBtn.textContent=v?'❚❚':'▶';playBtn.setAttribute('aria-label',v?'Pause presentation':(deck?'Play presentation':'Replay slideshow'));v?sched():clearTimeout(timer)}
function enterDeck(i){deck=true;root.classList.add('deck','nt');scrollTo({top:0,behavior:'instant'});skipS.hidden=false;show(i);
 requestAnimationFrame(()=>requestAnimationFrame(()=>root.classList.remove('nt')))}
function exitDeck(i){clearTimeout(timer);const t=secs[i];deck=false;root.classList.remove('deck');secs.forEach(s=>{s.classList.remove('cur','before');s.inert=false});
 scrollTo({top:i?t.offsetTop:0,behavior:'instant'});idx=i;mark();skipS.hidden=true;setPlay(false);playBtn.setAttribute('aria-label','Replay slideshow');
 bar.style.width=(scrollY/(root.scrollHeight-innerHeight||1)*100)+'%';tl.style.setProperty('--p','0%');dispatchEvent(new Event('scroll'))}
function step(d){if(lock)return;if(d>0&&idx===last){exitDeck(idx);return}if(d<0&&idx===0)return;lock=true;setTimeout(()=>lock=false,800);show(idx+d)}
function canScroll(c,dy){return c.scrollHeight>c.clientHeight+4&&(dy>0?c.scrollTop+c.clientHeight<c.scrollHeight-4:c.scrollTop>4)}
addEventListener('wheel',e=>{if(!deck||dlg.open||Math.abs(e.deltaY)<8)return;if(canScroll(secs[idx],e.deltaY))return;e.preventDefault();step(e.deltaY>0?1:-1)},{passive:false});
let ty=null,tt=0;
addEventListener('touchstart',e=>{ty=e.touches[0].clientY;tt=secs[idx].scrollTop},{passive:true});
addEventListener('touchend',e=>{if(!deck||dlg.open||ty===null)return;const dy=ty-e.changedTouches[0].clientY;ty=null;
 if(Math.abs(dy)<60||Math.abs(secs[idx].scrollTop-tt)>2)return;step(dy>0?1:-1)},{passive:true});
addEventListener('keydown',e=>{if(!deck||dlg.open||/INPUT|TEXTAREA|SELECT|BUTTON|A/.test(e.target.tagName))return;const k=e.key;
 if(k==='ArrowDown'||k==='PageDown'||k===' '){e.preventDefault();step(1)}else if(k==='ArrowUp'||k==='PageUp'){e.preventDefault();step(-1)}else if(k==='Home')show(0)});
playBtn.addEventListener('click',()=>{if(deck){setPlay(!playing)}else{enterDeck(idx>=last?0:idx);setPlay(true)}});
$('#prev').addEventListener('click',()=>deck?step(-1):secs[Math.max(0,idx-1)].scrollIntoView({behavior:RM?'auto':'smooth'}));
$('#next').addEventListener('click',()=>deck?step(1):secs[Math.min(last,idx+1)].scrollIntoView({behavior:RM?'auto':'smooth'}));
skipS.addEventListener('click',()=>exitDeck(idx));
$$('#dots a,#menu a,.cta a,.brand').forEach(a=>a.addEventListener('click',e=>{menu.classList.remove('open');burger.setAttribute('aria-expanded',false);
 if(!deck)return;const i=secs.findIndex(s=>'#'+s.id===a.hash);if(i<0)return;e.preventDefault();show(i)}));
if(RM){playBtn.hidden=true;skipS.hidden=true}

/* ---------- intro sequence (fast) ---------- */
const hero=$('#hero'),hName=$('#hName'),hIntro=$('#hIntro');let skipped=false;
async function type(el,txt,sp){if(RM||skipped){el.textContent=txt;return}el.classList.add('typing');el.textContent='';
 for(const ch of txt){if(skipped)break;el.textContent+=ch;await sleep(sp+Math.random()*14)}el.textContent=txt;el.classList.remove('typing')}
const w=ms=>skipped?Promise.resolve():sleep(ms);
function finish(){skipped=true;introDone=true;hName.classList.remove('typing');hIntro.classList.remove('typing');hName.textContent='DHRUBAJYOTI SHARMA';hIntro.textContent=S.intro;hero.classList.add('s1','s2','s3','s4','s5');$('#skipIntro').hidden=true;sched()}
$('#skipIntro').addEventListener('click',finish);
async function intro(){
 if(RM){finish();return}
 await w(250);hero.classList.add('s1');await w(500);hero.classList.add('s2');await w(900);
 await type(hName,'DHRUBAJYOTI SHARMA',36);if(skipped)return;
 hero.classList.add('s3');await w(200);await type(hIntro,S.intro,15);if(skipped)return;
 await w(150);hero.classList.add('s4');await w(500);hero.classList.add('s5');$('#skipIntro').hidden=true;
 await w(1100);if(!skipped){introDone=true;sched()}}
const hashTarget=location.hash&&secs.find(s=>'#'+s.id===location.hash);
if(!RM&&!hashTarget)enterDeck(0);else{skipS.hidden=true;playing=false;if(hashTarget){finish()}}
addEventListener('load',()=>setTimeout(()=>{$('#loader').classList.add('out');if(!skipped)intro()},RM?0:450));
setTimeout(()=>{$('#loader').classList.add('out')},3500);

/* ---------- cursor, glow, magnetic buttons ---------- */
if(FINE){const cur=$('#cur'),g=$('#glow');let x=0,y=0,cx=0,cy=0;
 addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;cur.classList.add('on');g.style.setProperty('--mx',x+'px');g.style.setProperty('--my',y+'px')},{passive:true});
 (function f(){cx+=(x-cx)*.2;cy+=(y-cy)*.2;cur.style.transform=`translate(${cx}px,${cy}px)`;requestAnimationFrame(f)})();
 document.addEventListener('pointerover',e=>cur.classList.toggle('big',!!e.target.closest('a,button,.work')));
 if(!RM)$$('.mag').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.3}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')})}

/* ---------- light particles (desktop only, paused when tab hidden) ---------- */
if(!RM&&innerWidth>900){const c=$('#fx'),t=c.getContext('2d');let W,H,run=true;
 const rs=()=>{W=c.width=innerWidth;H=c.height=innerHeight};rs();addEventListener('resize',rs);
 const P=Array.from({length:45},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.3+.3,v:Math.random()*.15+.03,a:Math.random()*.4+.1}));
 document.addEventListener('visibilitychange',()=>{run=!document.hidden;if(run)draw()});
 function draw(){if(!run)return;t.clearRect(0,0,W,H);for(const p of P){p.y-=p.v;if(p.y<-5){p.y=H+5;p.x=Math.random()*W}t.fillStyle=`rgba(190,205,230,${p.a})`;t.beginPath();t.arc(p.x,p.y,p.r,0,6.3);t.fill()}requestAnimationFrame(draw)}draw()}

/* ---------- contact form ---------- */
const form=$('#form'),fm=$('#fmsg');
form.addEventListener('submit',async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(form));let ok=true;
 $$('input,textarea',form).forEach(i=>{const bad=!i.value.trim()||(i.type==='email'&&!/^\S+@\S+\.\S+$/.test(i.value));i.classList.toggle('bad',bad);if(bad)ok=false});
 fm.className='';if(!ok){fm.className='err';fm.textContent='Please fill in every field with valid details.';return}
 if(!S.formEndpoint){fm.className='err';fm.textContent='The contact form is not connected yet. Please email me at '+S.email+'.';return}
 const btn=$('button',form);btn.disabled=true;btn.textContent='Sending…';
 try{const r=await fetch(S.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(d)});if(!r.ok)throw 0;fm.className='ok';fm.textContent='Thank you. Your message has been sent.';form.reset()}
 catch(_){fm.className='err';fm.textContent='Something went wrong. Please try again or email me directly.'}
 btn.disabled=false;btn.textContent='Send message'});
})();
