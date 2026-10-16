(()=>{
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
const $=(s,r=document)=>[...r.querySelectorAll(s)];
// nav
const nav=$("#nav")[0],menu=$("#menu")[0],burger=$("#burger")[0];
addEventListener("scroll",()=>nav.classList.toggle("solid",scrollY>80),{passive:true});
burger.onclick=()=>{const o=menu.classList.toggle("open");burger.setAttribute("aria-expanded",o);burger.textContent=o?"Close":"Menu"};
if(reduce||!window.gsap)return;
gsap.registerPlugin(ScrollTrigger);
// smooth scroll synced with ScrollTrigger
const lenis=new Lenis({lerp:.09});
lenis.on("scroll",ScrollTrigger.update);
gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);
// split words
$("[data-split]").forEach(el=>{el.innerHTML=el.textContent.trim().split(/\s+/).map(w=>`<span class="w"><span>${w}</span></span>`).join(" ")});
$(".statement p").forEach(el=>{el.innerHTML=el.textContent.trim().split(/\s+/).map(w=>`<span>${w}</span>`).join(" ")});
// hero: one orchestrated load, then the photo shrinks into a frame as you scroll
if($(".hero")[0]){gsap.from(".hero h1 .w>span",{yPercent:110,duration:1.2,stagger:.07,ease:"expo.out",delay:.2});
gsap.from(".hero p,.hero .btns,.badge",{opacity:0,y:24,duration:1,stagger:.12,delay:.9});
const h=gsap.timeline({scrollTrigger:{trigger:".hero",start:"top top",end:"+=110%",pin:true,scrub:.6}});
h.to(".hero-copy,.badge",{opacity:0,y:-60,duration:.35},0)
 .to(".hero",{backgroundColor:"#f9f7f4",duration:.6},0)
 .to(".hero-media",{clipPath:"inset(16% 30% 16% 30% round 28px)",duration:1,ease:"power2.inOut"},0)
 .to(".hero-media img",{scale:1.15,duration:1},0);}
// statement: words light up as you read
gsap.to(".statement p span",{opacity:1,stagger:.1,ease:"none",scrollTrigger:{trigger:".statement p",start:"top 75%",end:"bottom 45%",scrub:true}});
// parallax
$("[data-speed]").forEach(el=>gsap.to(el,{yPercent:-parseFloat(el.dataset.speed),ease:"none",scrollTrigger:{trigger:el.parentElement,start:"top bottom",end:"bottom top",scrub:true}}));
// counters
$("[data-count]").forEach(el=>{const t=+el.dataset.count,o={v:0};ScrollTrigger.create({trigger:el,start:"top 85%",once:true,onEnter:()=>gsap.to(o,{v:t,duration:2,ease:"power3.out",onUpdate:()=>el.firstChild.nodeValue=Math.round(o.v)})})});
// headings rise
$("h2[data-split]").forEach(el=>gsap.from($(".w>span",el),{yPercent:110,stagger:.05,duration:1,ease:"expo.out",scrollTrigger:{trigger:el,start:"top 85%"}}));
// journey: pinned horizontal story on desktop
if($(".track")[0])ScrollTrigger.matchMedia({"(min-width:901px)":()=>{
 const tr=$(".track")[0],len=()=>tr.scrollWidth-innerWidth;
 gsap.to(tr,{x:()=>-len(),ease:"none",scrollTrigger:{trigger:".journey",pin:true,scrub:.8,end:()=>"+="+len(),invalidateOnRefresh:true}});
 gsap.to(".bar",{scaleX:1,ease:"none",scrollTrigger:{trigger:".journey",scrub:true,end:()=>"+="+len()}});
},"(max-width:900px)":()=>{$(".panel").forEach(p=>gsap.from(p,{opacity:0,y:40,scrollTrigger:{trigger:p,start:"top 85%"}}))}});
// voices drift
$(".v").forEach((c,i)=>gsap.from(c,{y:70+i*30,opacity:0,duration:1,ease:"expo.out",scrollTrigger:{trigger:c,start:"top 90%"}}));
// big CTA scales in, button pulls toward cursor
gsap.from(".cta h2",{scale:.8,opacity:0,ease:"none",scrollTrigger:{trigger:".cta",start:"top 80%",end:"top 20%",scrub:true}});
$(".mag").forEach(b=>{b.onmousemove=e=>{const r=b.getBoundingClientRect();gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.3,y:(e.clientY-r.top-r.height/2)*.3,duration:.4})};b.onmouseleave=()=>gsap.to(b,{x:0,y:0,duration:.6,ease:"elastic.out(1,.4)"})});
gsap.from(".ph h1 .w>span",{yPercent:110,duration:1.2,stagger:.07,ease:"expo.out",delay:.2});
gsap.from(".ph p",{opacity:0,y:24,duration:1,delay:.7});
$(".ph-img").forEach(el=>gsap.fromTo(el,{clipPath:"inset(18% 22% 18% 22% round 24px)"},{clipPath:"inset(0% 0% 0% 0% round 24px)",ease:"none",scrollTrigger:{trigger:el,start:"top 95%",end:"top 30%",scrub:true}}));
$(".ph-img img").forEach(el=>gsap.fromTo(el,{scale:1.25},{scale:1,ease:"none",scrollTrigger:{trigger:el,start:"top bottom",end:"bottom 30%",scrub:true}}));
const sv=$(".svc");matchMedia("(min-width:901px)").matches&&sv.forEach((c,i)=>{c.style.top=(96+i*14)+"px";if(sv[i+1])gsap.to(c,{scale:.94,ease:"none",scrollTrigger:{trigger:sv[i+1],start:"top 90%",end:"top 20%",scrub:true}})});
$(".tl").forEach(t=>{gsap.to(".tl-line",{scaleY:1,ease:"none",scrollTrigger:{trigger:t,start:"top 70%",end:"bottom 70%",scrub:true}});$("article",t).forEach(a=>gsap.from(a,{x:40,opacity:0,duration:.9,ease:"expo.out",scrollTrigger:{trigger:a,start:"top 85%"}}))});
$(".rank li,.vals div,.facts li,.info div").forEach(e=>gsap.from(e,{y:40,opacity:0,duration:.9,ease:"expo.out",scrollTrigger:{trigger:e,start:"top 92%"}}));
$("form.cf").forEach(f=>f.onsubmit=e=>{e.preventDefault();const b=$("button",f)[0];b.textContent="Sent. We'll reply within 24 hours.";f.reset()});
addEventListener("load",()=>ScrollTrigger.refresh());
})();
