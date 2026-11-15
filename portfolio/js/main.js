(function(){
'use strict';
const S=window.SITE,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const chips=(a,c='')=>a&&a.length?`<div class="chips ${c}">${a.map(t=>`<span>${esc(t)}</span>`).join('')}</div>`:'';

/* ---------- render content from config ---------- */
$('#skillGrid').innerHTML=S.skills.map(([t,l],i)=>`<div class="cat rv" style="--i:${i}"><h3>${esc(t)}</h3>${chips(l)}</div>`).join('');
$('#coList').innerHTML=S.companies.map(c=>`<article class="co rv"><div class="logo"><img src="${esc(c.logo)}" alt="${esc(c.name)} logo" loading="lazy" width="380" height="285"></div><div><span class="role">${esc(c.role)}</span><span class="cat2">${esc(c.category)}</span><h3>${esc(c.headline)}</h3><p>${esc(c.desc)}</p><p class="inv">${esc(c.involvement)}</p>${chips(c.services,'sm')}${chips(c.tech,'sm')}</div></article>`).join('');
$('#timeline').insertAdjacentHTML('beforeend',S.companies.map(c=>`<li class="tl rv"><div class="lg"><img src="${esc(c.logo)}" alt="" loading="lazy" width="60" height="60"></div><div><h3>${esc(c.name)}</h3><p><b style="color:#fff;font-weight:500">${esc(c.role)}</b> · ${esc(c.category)}<br>${esc(c.desc)}</p></div></li>`).join(''));
$('#workGrid').innerHTML=S.projects.map((p,i)=>`<button class="work rv" data-i="${i}" aria-label="Open ${esc(p.title)} details"><div class="shot">${shot(p)}</div><div class="winfo"><small>${esc(p.category)}</small><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p></div></button>`).join('');
function shot(p){return `<div class="ph"><b>${esc(p.img)}</b>Screenshot placeholder<br>assets/projects/</div>`+(p.hasImage?`<img src="assets/projects/${esc(p.img)}" alt="${esc(p.title)} screenshot" loading="lazy">`:'')}
const L=S.links,so=[['LinkedIn',L.linkedin],['GitHub',L.github],['Fiverr',L.fiverr],['Instagram',L.instagram]];
$('#socials').innerHTML=so.map(([n,u])=>`<li>${u?`<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${n}</a>`:`<span>${n} · soon</span>`}</li>`).join('');
$('#mail').href='mailto:'+S.email;$('#mail').textContent=S.email;
if(S.showPhone)$('#phone').textContent=S.phone;
$('#yr').textContent=new Date().getFullYear();

/* ---------- project dialog ---------- */
const dlg=$('#pd');
$('#workGrid').addEventListener('click',e=>{const b=e.target.closest('.work');if(!b)return;const p=S.projects[+b.dataset.i];
 $('#pdBody').innerHTML=`<div class="pd"><div class="shot">${shot(p)}</div><div class="winfo"><small>${esc(p.category)}</small><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p><dl><dt>My contribution</dt><dd>${esc(p.contribution)}</dd><dt>Status</dt><dd>${esc(p.status)}</dd>${p.tech.length?`<dt>Technologies</dt><dd>${p.tech.map(esc).join(', ')}</dd>`:''}</dl>${p.url?`<a class="btn" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">Visit live site ↗</a>`:''}</div></div>`;
 setPlay(false);dlg.showModal();});
dlg.addEventListener('click',e=>{if(e.target===dlg||e.target.closest('.x'))dlg.close()});

/* ---------- reveal on scroll ---------- */
const rvIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rvIO.unobserve(e.target)}}),{threshold:.15});
$$('.rv').forEach((el,i)=>{el.style.setProperty('--i',el.style.getPropertyValue('--i')||(i%4));rvIO.observe(el)});

/* ---------- sections, dots, nav, progress ---------- */
const secs=$$('.scene');let idx=0;
$('#dots').innerHTML=secs.map((s,i)=>`<li><a href="#${s.id}" aria-label="${s.dataset.label}" title="${s.dataset.label}"></a></li>`).join('');
const dots=$$('#dots a'),links=$$('#menu a');
const secIO=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;idx=secs.indexOf(e.target);
 dots.forEach((d,i)=>d.classList.toggle('act',i===idx));links.forEach(a=>a.classList.toggle('act',a.hash==='#'+e.target.id));sched()}),{rootMargin:'-45% 0px -45% 0px'});
secs.forEach(s=>secIO.observe(s));
const tl=$('#timeline'),bar=$('#bar i');
let tick=false;addEventListener('scroll',()=>{if(tick)return;tick=true;requestAnimationFrame(()=>{tick=false;
 const h=document.documentElement;bar.style.width=(scrollY/(h.scrollHeight-innerHeight||1)*100)+'%';
 const r=tl.getBoundingClientRect();tl.style.setProperty('--p',Math.max(0,Math.min(100,(innerHeight*.6-r.top)/r.height*100))+'%')})},{passive:true});
const burger=$('#burger'),menu=$('#menu');
burger.addEventListener('click',()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
menu.addEventListener('click',e=>{if(e.target.tagName==='A'){menu.classList.remove('open');burger.setAttribute('aria-expanded',false)}});
$('#top').addEventListener('click',()=>{setPlay(false);go(0)});

/* ---------- autoplay presentation controller ---------- */
let playing=false,timer;
const playBtn=$('#play');
function go(i){secs[Math.max(0,Math.min(secs.length-1,i))].scrollIntoView({behavior:RM?'auto':'smooth'})}
function sched(){clearTimeout(timer);if(!playing||idx>=secs.length-1)return;
 const w=secs[idx].innerText.split(/\s+/).length;timer=setTimeout(()=>{if(playing&&!dlg.open)go(idx+1)},Math.min(16000,6500+w*110))}
function setPlay(v){playing=v;playBtn.textContent=v?'❚❚':'▶';playBtn.setAttribute('aria-label',v?'Pause presentation':'Play presentation');v?sched():clearTimeout(timer)}
playBtn.addEventListener('click',()=>setPlay(!playing));
$('#prev').addEventListener('click',()=>{setPlay(false);go(idx-1)});
$('#next').addEventListener('click',()=>{setPlay(false);go(idx+1)});
['wheel','touchstart','keydown'].forEach(ev=>addEventListener(ev,()=>{if(playing)setPlay(false)},{passive:true}));
$$('#dots a,#menu a,.cta a').forEach(a=>a.addEventListener('click',()=>setPlay(false)));

/* ---------- intro sequence ---------- */
const hero=$('#hero'),hName=$('#hName'),hIntro=$('#hIntro');let skipped=false;
async function type(el,txt,sp){if(RM||skipped){el.textContent=txt;return}el.classList.add('typing');el.textContent='';
 for(const ch of txt){if(skipped)break;el.textContent+=ch;await sleep(sp+Math.random()*25)}el.textContent=txt;el.classList.remove('typing')}
const w=ms=>skipped?Promise.resolve():sleep(ms);
function finish(){skipped=true;hName.classList.remove('typing');hIntro.classList.remove('typing');hName.textContent='DHRUBAJYOTI SHARMA';hIntro.textContent=S.intro;hero.classList.add('s1','s2','s3','s4','s5');$('#skipIntro').hidden=true}
$('#skipIntro').addEventListener('click',()=>{finish();setPlay(false)});
async function intro(){
 if(RM){finish();return}
 await w(400);hero.classList.add('s1');await w(900);hero.classList.add('s2');await w(1500);
 await type(hName,'DHRUBAJYOTI SHARMA',65);if(skipped)return;
 hero.classList.add('s3');await w(500);await type(hIntro,S.intro,32);if(skipped)return;
 await w(300);hero.classList.add('s4');await w(900);hero.classList.add('s5');$('#skipIntro').hidden=true;
 await w(3500);if(!skipped&&idx===0&&scrollY<80)setPlay(true)}
addEventListener('load',()=>setTimeout(()=>{$('#loader').classList.add('out');intro()},RM?0:700));
setTimeout(()=>{$('#loader').classList.add('out')},4000);

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
