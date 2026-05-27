let todosItens = [];







let adicionaisDB = []; // carregados do banco







let carrinho = [];







let tipoPagamento = 'pix';



let semTroco = false;







function ativarSemTroco(ativo){



    semTroco = ativo;



    const btn = document.getElementById('btn-sem-troco');



    const inp = document.getElementById('ped-troco');



    if(!btn) return;



    if(ativo){



        btn.style.background='#d4edda';btn.style.color='#155724';btn.style.borderColor='#a3d9a5';



        btn.innerHTML='✅ Não preciso de troco';



        if(inp){inp.value='';inp.disabled=true;inp.style.opacity='.5';}



    } else {



        btn.style.background='#f8f9fa';btn.style.color='#555';btn.style.borderColor='var(--border)';



        btn.innerHTML='💵 Não preciso de troco';



        if(inp){inp.disabled=false;inp.style.opacity='1';}



    }



}







function toggleSemTroco(){ ativarSemTroco(!semTroco); salvarEstado(); }







let tipoLocal = 'box';







let urlWhatsAppPendente = null;







let dadosPedidoPendente = null;








function setCookie(n,v,d=180){const e=new Date();e.setTime(e.getTime()+d*86400000);document.cookie=`${n}=${encodeURIComponent(v)};expires=${e.toUTCString()};path=/`;}







function getCookie(n){const v=document.cookie.match('(^|;)\\s*'+n+'\\s*=\\s*([^;]+)');return v?decodeURIComponent(v.pop()):'';}







function preencherDosCookies(){







    const nome=getCookie('assis_nome'),tel=getCookie('assis_tel');







    if(nome){document.getElementById('ped-nome').value=nome;document.getElementById('hint-nome').classList.add('show');}







    if(tel){document.getElementById('ped-tel').value=tel;document.getElementById('hint-tel').classList.add('show');}







}







function salvarCookies(){







    const n=document.getElementById('ped-nome').value.trim(),t=document.getElementById('ped-tel').value.trim();







    if(n)setCookie('assis_nome',n);if(t)setCookie('assis_tel',t);







}
// ---- PERSISTÊNCIA LOCAL (localStorage) ----

function salvarEstado(){
    try {
        const estado = {
            carrinho: carrinho,
            tipoLocal: tipoLocal,
            tipoPagamento: tipoPagamento,
            semTroco: semTroco,
            nome: document.getElementById('ped-nome') ? document.getElementById('ped-nome').value : '',
            tel: document.getElementById('ped-tel') ? document.getElementById('ped-tel').value : '',
            box: document.getElementById('ped-box') ? document.getElementById('ped-box').value : '',
            placa: document.getElementById('ped-placa') ? document.getElementById('ped-placa').value : '',
            troco: document.getElementById('ped-troco') ? document.getElementById('ped-troco').value : '',
            reservaAtiva: document.getElementById('toggle-reserva') ? document.getElementById('toggle-reserva').checked : false,
            reservaData: document.getElementById('reserva-data') ? document.getElementById('reserva-data').value : '',
            reservaHora: document.getElementById('reserva-hora') ? document.getElementById('reserva-hora').value : ''
        };
        localStorage.setItem('assis_pedido', JSON.stringify(estado));
    } catch(e) {}
}

function restaurarEstado(){
    try {
        const raw = localStorage.getItem('assis_pedido');
        if(!raw) return;
        const e = JSON.parse(raw);
        // Restaura carrinho
        if(e.carrinho && e.carrinho.length > 0){
            carrinho = e.carrinho;
            atualizarFab();
        }
        // Tipo de local
        if(e.tipoLocal) selecionarTipo(e.tipoLocal);
        // Pagamento
        if(e.tipoPagamento) selecionarPag(e.tipoPagamento);
        // Sem troco
        if(e.semTroco) ativarSemTroco(true);
        // Valor do troco
        if(e.troco){ const t=document.getElementById('ped-troco'); if(t) t.value=e.troco; }
        // Nome e telefone
        if(e.nome){ const el=document.getElementById('ped-nome'); if(el){ el.value=e.nome; const h=document.getElementById('hint-nome'); if(h) h.classList.add('show'); } }
        if(e.tel){ const el=document.getElementById('ped-tel'); if(el){ el.value=e.tel; const h=document.getElementById('hint-tel'); if(h) h.classList.add('show'); } }
        // Box e placa
        if(e.box){ const el=document.getElementById('ped-box'); if(el) el.value=e.box; }
        if(e.placa){ const el=document.getElementById('ped-placa'); if(el) el.value=e.placa; }
        // Reserva
        if(e.reservaAtiva){
            const tog=document.getElementById('toggle-reserva');
            if(tog){ tog.checked=true; toggleReserva(true); }
            if(e.reservaData){
                const s=document.getElementById('reserva-data');
                if(s){ s.value=e.reservaData; gerarHorarios(); }
            }
            if(e.reservaHora){
                setTimeout(function(){ const s=document.getElementById('reserva-hora'); if(s) s.value=e.reservaHora; }, 150);
            }
        }
        if(e.carrinho && e.carrinho.length > 0){
            console.log('[Carrinho restaurado] '+e.carrinho.length+' item(s)');
        }
    } catch(err) { console.warn('Erro ao restaurar estado:', err); }
}

function limparEstado() {
  try {
    localStorage.removeItem('assis_pedido');
  } catch (e) {}
}

function limparTudo() {
  limparEstado();
}