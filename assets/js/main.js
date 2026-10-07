(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  menu?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.classList.toggle('active', open);
    menu.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
    nav?.classList.remove('open'); menu?.classList.remove('active'); menu?.setAttribute('aria-expanded','false');
  }));
  const slides=[...document.querySelectorAll('.hero-slide')], dots=document.querySelector('.hero-pagination');
  if (slides.length && dots) {
    let current=0,timer;
    slides.forEach((_,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`Slide ${i+1}`);b.onclick=()=>show(i,true);dots.appendChild(b)});
    function show(i,restart=false){current=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle('active',n===current));[...dots.children].forEach((b,n)=>b.classList.toggle('active',n===current));if(restart)start()}
    function start(){clearInterval(timer);timer=setInterval(()=>show(current+1),5000)}
    document.querySelector('.hero-prev,.hero-nav.prev')?.addEventListener('click',()=>show(current-1,true));
    document.querySelector('.hero-next,.hero-nav.next')?.addEventListener('click',()=>show(current+1,true));
    show(0);start();
  }
  document.querySelectorAll('.media-carousel').forEach(carousel => {
    const track=carousel.querySelector('.media-track'), items=[...(track?.querySelectorAll('figure')||[])], dots=carousel.querySelector('.media-dots');
    if(!track||items.length<2||!dots)return;
    let index=0,timer;
    items.forEach((_,n)=>{const b=document.createElement('button');b.type='button';b.onclick=()=>{index=n;render();restart()};dots.appendChild(b)});
    function render(){track.style.transform=`translate3d(-${index*100}%,0,0)`;[...dots.children].forEach((b,n)=>b.classList.toggle('active',n===index))}
    function restart(){clearInterval(timer);timer=setInterval(()=>{index=(index+1)%items.length;render()},4000)}
    render();restart();
  });
})();