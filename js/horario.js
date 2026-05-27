function ajustarCatScroll(){
    const w = document.getElementById('search-sticky-wrap');
    if(!w) return;
    const banner = document.getElementById('banner-horario');
    w.style.top = (banner ? banner.offsetHeight : 0) + 'px';
}







window.addEventListener('resize',ajustarCatScroll);















function verificarModoReserva() {



    const agora = new Date();



    const dia = agora.getDay(); // 0=Dom,6=Sab



    const hora = agora.getHours() + agora.getMinutes()/60;



    const foraHorario = dia === 0 || (dia === 6 && hora >= 10.5) || (dia !== 6 && dia !== 0 && (hora >= 11 || hora < 4));



    if (!foraHorario) return;



    // Ativar modo reserva



    const toggle = document.getElementById('toggle-reserva');



    if (toggle && !toggle.checked) { toggle.checked = true; toggleReserva(true); }



    // Banner informativo



    const banner = document.createElement('div');



    banner.style.cssText = 'background:#fff3cd;border-bottom:2px solid #ffc107;padding:10px 16px;text-align:center;font-size:.82rem;color:#856404;font-weight:600;position:sticky;top:0;z-index:150;font-family:Barlow,sans-serif;';



    banner.innerHTML = '<div class="container">📅 Fora do horário de atendimento — pedidos apenas como <strong>reserva</strong></div>';



    banner.id = 'banner-horario';
    document.body.insertBefore(banner, document.body.firstChild);
    // Recalcula o top do search-sticky-wrap para ficar abaixo do banner
    setTimeout(ajustarCatScroll, 0);



    // Impedir desativar reserva fora do horário



    if (toggle) toggle.addEventListener('change', function() { if(!this.checked){ this.checked=true; toggleReserva(true); } });
}

const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const cat=e.target.id.replace('sec-','').replace(/-/g,' ');document.querySelectorAll('.cat-btn').forEach(b=>b.classList.toggle('active',b.dataset.cat===cat));const grupo=grupoDaSecao(cat);if(grupo){document.querySelectorAll('.cat-visual-btn').forEach(b=>b.classList.remove('active'));document.querySelector('.cat-visual-btn[data-grupo="'+grupo+'"]')?.classList.add('active');}}});},{threshold:.3,rootMargin:'-160px 0px -55% 0px'});













