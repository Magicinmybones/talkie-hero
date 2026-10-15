(()=>{
  const btn=document.querySelector('.menu-btn'),sheet=document.getElementById('sheet');
  const items=()=>[...sheet.querySelectorAll('a')];
  const set=(open,{focus=true}={})=>{
    btn.setAttribute('aria-expanded',open);btn.setAttribute('aria-label',open?'Close menu':'Open menu');
    sheet.classList.toggle('open',open);
    if(open&&focus)requestAnimationFrame(()=>items()[0]?.focus());
  };
  btn.addEventListener('click',e=>{e.stopPropagation();set(btn.getAttribute('aria-expanded')!=='true',{focus:e.detail===0})});
  document.addEventListener('click',e=>{if(!sheet.contains(e.target))set(false)});
  sheet.addEventListener('click',e=>{if(e.target.closest('a'))set(false)});
  document.addEventListener('keydown',e=>{
    if(!sheet.classList.contains('open'))return;
    if(e.key==='Escape'){set(false);btn.focus();return}
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();const l=items(),i=l.indexOf(document.activeElement);
      l[(i+(e.key==='ArrowDown'?1:-1)+l.length)%l.length].focus()}
    if(e.key==='Tab'){const l=items();if(e.shiftKey&&document.activeElement===l[0]){e.preventDefault();btn.focus()}
      else if(!e.shiftKey&&document.activeElement===l[l.length-1]){set(false)}}
  });
})();
