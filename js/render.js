function scrollParaGrupo(grupo, btn) {

    document.querySelectorAll('.cat-visual-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Se há texto na busca, prioriza esta categoria nos resultados (não faz scroll)
    const inp = document.getElementById('search-input');
    if(inp && inp.value.trim()){
        categoriaFiltroAtiva = secaoAlvoGrupo(grupo) || GRUPO_MAPA[grupo] || null;
        filtrarBusca(inp.value);
        return;
    }

    // Sem busca: comportamento normal (scroll ou irParaCategoria)
    if(modoHome){ irParaCategoria(grupo, btn); return; }

    categoriaFiltroAtiva = null;

    const catName = secaoAlvoGrupo(grupo);
    if (!catName) return;
    const el = document.getElementById('sec-' + catName.replace(/\s+/g, '-'));
    if (!el) return;
    const header = document.querySelector('header');
    const wrap   = document.getElementById('search-sticky-wrap');
    const offset = (header ? header.offsetHeight : 0) + (wrap ? wrap.offsetHeight : 0) + 6;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
}



// IDs e configuração do pódio — ajuste aqui para mudar os destaques



const PODIO_CFG = [



    { id: 245, pos: 2, medal: "🥈", emoji: "🍔" }, // Pão com Bolinho de Carne e Queijo



    { id: 208, pos: 1, medal: "🥇", emoji: "⭐" }, // Especial do Assis



    { id: 225, pos: 3, medal: "🥉", emoji: "🥟" }, // Coxinha com Catupiry



];







function renderPodio() {



    try {



        const wrap = document.getElementById("podio-wrap");



        if (!wrap) return;



        if (!todosItens.length) { setTimeout(renderPodio, 800); return; }



        const ordem = [2, 1, 3];



        const baseH = { 1: 36, 2: 26, 3: 18 };



        const html = ordem.map(function(pos) {



            const cfg = PODIO_CFG.find(function(p){ return p.pos === pos; });



            if (!cfg) return "";



            const item = todosItens.find(function(i){ return Number(i.id) === cfg.id; });



            if (!item) return "";



            const preco = Object.values(item.precos).find(function(v){ return v > 0; }) || 0;



            const precoFmt = "R$ " + preco.toFixed(2).replace(".", ",");



            let imgHtml;



            if (item.imagem) {



                imgHtml = '<img src="' + item.imagem + '" class="podio-img" alt="' + item.nome + '" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'">'



                        + '<span class="podio-icon" style="display:none">' + (cfg.emoji || CAT_EMOJI[item.categoria] || "🍽️") + '</span>';



            } else {



                imgHtml = '<span class="podio-icon">' + (cfg.emoji || CAT_EMOJI[item.categoria] || "🍽️") + '</span>';



            }



            const btnDisabled = item.disponibilidade ? "disabled" : "";



            const btnStyle = item.disponibilidade ? ' style="background:#9ca3af;cursor:not-allowed"' : "";



            const btnTxt = item.disponibilidade ? "⚠️ Indisponível" : "+ Adicionar";



            return '<div class="podio-item pos-' + pos + '">'



                + '<div class="podio-card-inner" onclick="adicionarItem(' + item.id + ')" style="cursor:pointer">'



                + '<span class="podio-medal">' + cfg.medal + '</span>'



                + imgHtml



                + '<div class="podio-nome">' + item.nome + '</div>'



                + '<div class="podio-preco">' + precoFmt + '</div>'



                + '<button class="btn-fav-add" ' + btnDisabled + btnStyle



                + ' onclick="event.stopPropagation();adicionarItem(' + item.id + ')">' + btnTxt + '</button>'



                + '</div>'



                + '<div class="podio-base" style="height:' + baseH[pos] + 'px">' + pos + '</div>'



                + '</div>';



        }).join("");



        wrap.innerHTML = html;



    } catch(e) { console.error("renderPodio erro:", e); }



}














function toggleReserva(ativo){







    document.getElementById('reserva-campos').classList.toggle('open',ativo);







    if(ativo){ gerarOpcoesDia(); }







    const lbl=document.getElementById('toggle-label');







    lbl.textContent=ativo?'Quero agendar!':'Pedido para agora';







    lbl.style.color=ativo?'var(--blue)':'var(--muted)';







}







function getReservaDados(){







    const ativo=document.getElementById('toggle-reserva').checked;







    if(!ativo) return{data:null,hora:null,label:null};







    const data=document.getElementById('reserva-data').value||null;







    const hora=document.getElementById('reserva-hora').value||null;







    return{data,hora,label:data?labelDia(data):null};







}















// ---- RENDER CARDÁPIO ----







function tamLabel(t){return{unico:'',p:'P',m:'M',g:'G',xg:'XG'}[t]||t;}







function getCategorias(){const p=new Set(todosItens.map(i=>i.categoria));return CATS_ORDEM.filter(c=>p.has(c));}







function renderTabs(){







    document.getElementById('cat-scroll').innerHTML=getCategorias().map((c,i)=>







        `<button class="cat-btn ${i===0?'active':''}" data-cat="${c}" onclick="scrollParaSecao('${c}',this)">${CAT_EMOJI[c]||''} ${c}</button>`







    ).join('');







}







function scrollParaSecao(cat,btn){







    document.querySelectorAll('.cat-btn').forEach(b=>b.classList.remove('active'));







    btn.classList.add('active');







    const inp=document.getElementById('search-input');







    if(inp.value){inp.value='';filtrarBusca('');}







    const el=document.getElementById('sec-'+cat.replace(/\s+/g,'-'));







    if(!el) return;







    const wrap=document.getElementById('search-sticky-wrap');







    window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-(wrap?wrap.offsetHeight+8:130),behavior:'smooth'});







}







function renderCardapio() {
    const main = document.getElementById('main-cardapio');
    main.innerHTML = getCategorias().map(cat => {
        const items = todosItens.filter(i => i.categoria === cat);
        if (!items.length) return '';
        const secId = 'sec-' + cat.replace(/\s+/g, '-');
        return `<section id="${secId}" class="secao" data-categoria="${cat}">
            <h2 class="secao-titulo">${CAT_EMOJI[cat] || ''} ${cat}</h2>
            <div class="carousel-wrap">
                <div class="carousel-track">${items.map(item => renderItem(item)).join('')}</div>
            </div>
        </section>`;
    }).join('');

    const q = (document.getElementById('search-input') || {}).value;
    if (q && q.trim()) aplicarFiltroBusca(q.trim());
}

function renderItem(item) {
    const tamanhos = Object.entries(item.precos).filter(([, v]) => v != null);
    const precosHtml = tamanhos.map(([tam, preco]) => {
        const label = tamLabel(tam);
        const sug = tam === 'g' ? '<span class="preco-sug">✨ Mais vantajoso</span>' : '';
        return `<div class="preco-linha">${label ? `<span class="tam-label">${label}</span>` : ''}<span class="preco-valor">R$${preco.toFixed(2)}</span>${sug}</div>`;
    }).join('');

    const descLimpa = (item.descricao || '').trim();
    const dispLine = item.disponibilidade
        ? '<div class="aviso-disp">⚠️ Confirmaremos disponibilidade pelo WhatsApp.</div>'
        : '';
    const nomeNorm = semAcento(item.nome);
    const imgBlock = item.imagem
        ? `<div class="item-img-top"><img src="${item.imagem}" alt="" loading="lazy"></div>`
        : `<div class="item-img-top"><div class="cat-icon-placeholder">${CAT_EMOJI[item.categoria] || '🍽️'}</div></div>`;
    const btnDisabled = item.disponibilidade ? ' disabled title="Produto sazonal — confirme disponibilidade"' : '';
    const btnStyle = item.disponibilidade ? ' style="background:#9ca3af;cursor:not-allowed"' : '';
    const btnLabel = item.disponibilidade ? 'Indisponível no momento' : 'Adicionar ao pedido';
    const btnIcon = item.disponibilidade ? '⚠️' : '+';

    return `<article class="item-card item-card--carousel" id="item-card-${item.id}" data-cat="${item.categoria}" data-nome-norm="${nomeNorm}">
        ${imgBlock}
        <div class="item-main">
            ${item.destaque ? '<span class="badge-destaque">★ Especial</span>' : ''}
            <div class="item-nome">${item.nome}</div>
            <div class="item-precos">${precosHtml}</div>
            ${descLimpa ? `<div class="item-desc-mini">${descLimpa.slice(0, 90)}</div>` : ''}
            ${dispLine}
        </div>
        <button type="button" class="btn-adicionar" onclick="adicionarItem(${item.id})"${btnStyle}${btnDisabled}>
            <span>${btnIcon}</span> ${btnLabel}
        </button>
    </article>`;
}

function aplicarFiltroBusca(q) {
    const main = document.getElementById('main-cardapio');
    const resDiv = document.getElementById('resultados-busca');
    const normalizado = semAcento(q);
    let total = 0;
    const secoes = Array.from(main.querySelectorAll('.secao'));

    if (categoriaFiltroAtiva) {
        secoes.sort((a, b) => {
            const ca = a.dataset.categoria;
            const cb = b.dataset.categoria;
            if (ca === categoriaFiltroAtiva) return -1;
            if (cb === categoriaFiltroAtiva) return 1;
            return CATS_ORDEM.indexOf(ca) - CATS_ORDEM.indexOf(cb);
        });
        secoes.forEach(s => main.appendChild(s));
    }

    secoes.forEach(sec => {
        let visiveis = 0;
        sec.querySelectorAll('.item-card').forEach(card => {
            const nome = card.dataset.nomeNorm || semAcento(card.querySelector('.item-nome')?.textContent || '');
            const ok = fuzzyMatch(normalizado, nome);
            card.classList.toggle('item-card--hidden', !ok);
            if (ok) visiveis++;
        });
        sec.classList.toggle('secao--hidden', visiveis === 0);
        total += visiveis;
    });

    resDiv.style.display = 'block';
    if (total === 0) {
        resDiv.innerHTML = '<div class="busca-resumo busca-resumo--vazio">😕 Nenhum resultado para "<strong>' + q + '</strong>"</div>';
        return;
    }
    let html = '<div class="busca-resumo">' + total + ' resultado' + (total > 1 ? 's' : '') + ' para "<strong>' + q + '</strong>"';
    if (categoriaFiltroAtiva) {
        html += ' · <span style="color:var(--blue);font-weight:600">' + categoriaFiltroAtiva + ' em destaque</span>';
    }
    html += '</div>';
    resDiv.innerHTML = html;
}

function restaurarVisibilidadeCardapio() {
    const main = document.getElementById('main-cardapio');
    main.querySelectorAll('.item-card--hidden').forEach(c => c.classList.remove('item-card--hidden'));
    main.querySelectorAll('.secao--hidden').forEach(s => s.classList.remove('secao--hidden'));
    const ordem = getCategorias();
    const secoes = Array.from(main.querySelectorAll('.secao'));
    secoes.sort((a, b) => ordem.indexOf(a.dataset.categoria) - ordem.indexOf(b.dataset.categoria));
    secoes.forEach(s => main.appendChild(s));
}


// ---- CARRINHO ----






let modoHome = false;
let categoriaFiltroAtiva = null; // categoria priorizada na busca







function irParaCategoria(grupo, btn) {







    modoHome = false;







    document.getElementById('resultados-busca').style.display = 'none';







    document.getElementById('main-cardapio').style.display = 'block';







    // Acionar o botao da barra de categorias







    document.querySelectorAll('.cat-visual-btn[data-grupo]').forEach(b=>b.classList.remove('active'));







    document.querySelectorAll(`.cat-visual-btn[data-grupo="${grupo}"]`).forEach(b=>b.classList.add('active'));







    setTimeout(()=>{ const catName=secaoAlvoGrupo(grupo); if(!catName) return;







        const el=document.getElementById('sec-'+catName.replace(/\s+/g,'-'));







        if(!el) return;







        const header=document.querySelector('header');







        const wrap=document.getElementById('search-sticky-wrap');







        const offset=(header?header.offsetHeight:0)+(wrap?wrap.offsetHeight:0)+6;







        window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-offset,behavior:'smooth'});







    },100);







}







function voltarHome() {
    categoriaFiltroAtiva=null;







    modoHome = false;







    document.getElementById('resultados-busca').style.display = 'none';







    document.getElementById('main-cardapio').style.display = 'block';







    document.getElementById('search-input').value = '';







    document.getElementById('search-clear').style.display = 'none';







    window.scrollTo({top: 0, behavior: 'smooth'});







}







function executarBusca() {
    const inp = document.getElementById('search-input');
    if (inp) { inp.focus(); filtrarBusca(inp.value); }
}

function filtrarBusca(q) {
    const clr = document.getElementById('search-clear');
    if (clr) clr.style.display = q ? 'flex' : 'none';
    const favSec = document.querySelector('.favoritos-section');
    const main = document.getElementById('main-cardapio');
    const resDiv = document.getElementById('resultados-busca');
    const termo = (q || '').trim();

    if (!termo) {
        categoriaFiltroAtiva = null;
        document.querySelectorAll('.cat-visual-btn').forEach(b => b.classList.remove('active'));
        if (favSec) favSec.style.display = '';
        resDiv.style.display = 'none';
        resDiv.innerHTML = '';
        main.style.display = 'block';
        restaurarVisibilidadeCardapio();
        if (modoHome) { voltarHome(); return; }
        return;
    }

    modoHome = false;
    if (favSec) favSec.style.display = 'none';
    main.style.display = 'block';
    aplicarFiltroBusca(termo);
}

function limparBusca() {
    categoriaFiltroAtiva = null;
    document.getElementById('search-input').value = '';
    filtrarBusca('');
    document.getElementById('search-clear').style.display = 'none';
}







function abrirSaberMais(btn){document.getElementById('modal-nome').textContent=btn.dataset.nome;document.getElementById('modal-desc').textContent=btn.dataset.desc;document.getElementById('modal-saber-mais').classList.add('open');}







function fecharModal(e){if(e.target===document.getElementById('modal-saber-mais'))document.getElementById('modal-saber-mais').classList.remove('open');}





















