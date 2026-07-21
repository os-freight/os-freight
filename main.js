const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
if(toggle&&nav){
  toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
}

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const links=[...document.querySelectorAll('.main-nav a')];
const sections=[...document.querySelectorAll('main section[id],#top')];
const header=document.querySelector('.site-header');
const heroMedia=document.querySelector('.hero-media');
const progress=document.querySelector('.page-progress');

function onScroll(){
  const y=window.scrollY;
  header?.classList.toggle('scrolled',y>24);
  let current='top';
  for(const s of sections){if(y>=(s.offsetTop-160))current=s.id||'top';}
  links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${current}`));
  const max=document.documentElement.scrollHeight-window.innerHeight;
  if(progress)progress.style.width=`${max>0?(y/max)*100:0}%`;
  if(heroMedia&&window.innerWidth>780&&matchMedia('(prefers-reduced-motion: no-preference)').matches){
    heroMedia.style.transform=`scale(${1.04+Math.min(y,500)/10000}) translateY(${Math.min(y,500)*0.08}px)`;
  }
}
window.addEventListener('scroll',onScroll,{passive:true});
onScroll();

const counters=document.querySelectorAll('[data-count]');
const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  const el=entry.target; const target=Number(el.dataset.count||0); const suffix=target===100?'%':'';
  const start=performance.now(); const duration=800;
  function tick(now){const p=Math.min((now-start)/duration,1);el.textContent=Math.round(target*(1-Math.pow(1-p,3)))+suffix;if(p<1)requestAnimationFrame(tick)}
  requestAnimationFrame(tick); counterObserver.unobserve(el);
}),{threshold:.6});
counters.forEach(el=>counterObserver.observe(el));
