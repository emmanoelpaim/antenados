function calcSubtotal(ci){







    let t=ci.precoBase+ci.paoExtra;







    ci.adicionais.forEach(a=>t+=a.preco);







    return t;







}















function atualizarFab(){







    const total=carrinho.reduce((s,i)=>s+i.subtotal*i.qtd,0);







    const qtd=carrinho.reduce((s,i)=>s+i.qtd,0);







    const fab=document.getElementById('fab-carrinho');







    document.getElementById('badge-qtd').textContent=qtd;







    document.getElementById('fab-total').textContent='R$'+total.toFixed(2);







    fab.classList.toggle('hidden',qtd===0);







}















function animarBotao(itemId){







    const btn=document.querySelector('#item-card-'+itemId+' .btn-adicionar');







    if(!btn) return;







    btn.innerHTML='✓ Adicionado!';btn.style.background='#16a34a';







    clearTimeout(btn._t);btn._t=setTimeout(()=>{btn.innerHTML='<span>+</span> Adicionar ao pedido';btn.style.background='';},2000);







}















function abrirCarrinho(){







    renderCarrinho();







    document.getElementById('drawer').classList.add('open');







    document.getElementById('drawer-overlay').classList.add('open');







    preencherDosCookies();







}







function fecharCarrinho(){







    document.getElementById('drawer').classList.remove('open');







    document.getElementById('drawer-overlay').classList.remove('open');







}















function renderCarrinho(){







    const cont=document.getElementById('lista-carrinho');







    if(!carrinho.length){







        cont.innerHTML='<p style="text-align:center;color:var(--muted);padding:20px 0">Carrinho vazio!</p>';







    } else {







        cont.innerHTML=carrinho.map(ci=>renderItemCarrinho(ci)).join('');







    }







    document.getElementById('total-valor').textContent='R$ '+carrinho.reduce((s,i)=>s+i.subtotal*i.qtd,0).toFixed(2);







}















function renderItemCarrinho(ci){







    const temAdicionais=CATS_COM_ADICIONAIS.includes(ci.categoria);







    const temPao=CATS_COM_PAO.includes(ci.categoria);







    const temSalada=CATS_COM_SALADA.includes(ci.categoria);















    // Detalhes resumidos







    const detParts=[];







    if(ci.pao) detParts.push(`Pão ${ci.pao}${ci.paoExtra>0?' (+R$'+ci.paoExtra.toFixed(2)+')':''}`);







    if(ci.adicionais.length) detParts.push(`+${ci.adicionais.map(a=>a.nome).join(', ')}`);







    if(ci.salada.length) detParts.push(ci.salada.join(', '));















    // Seletor de pão







    const paoHtml=temPao?`







        <div class="opcao-titulo">🍞 Pão</div>







        <div class="pao-selector">







            ${OPCOES_PAO.map(p=>`







                <div class="pao-opt ${ci.pao===p.nome?'selected':''}" onclick="selecionarPaoCarrinho(${ci.id},'${p.nome}',${p.extra},this)">







                    ${p.nome}${p.extra>0?`<span class="pao-extra-label"> +R$${p.extra.toFixed(2)}</span>`:''}







                </div>`).join('')}







        </div>`:'';















    // Salada







    const saladaHtml=temSalada?`







        <div class="opcao-titulo">🥗 Salada</div>







        <div class="salada-checks">







            <div class="salada-check ${ci.salada.includes('Tomate')?'':'desmarcado'}" onclick="toggleSalada(${ci.id},'Tomate',this)">✓ Tomate</div>







            <div class="salada-check ${ci.salada.includes('Alface americana')?'':'desmarcado'}" onclick="toggleSalada(${ci.id},'Alface americana',this)">✓ Alface americana</div>







        </div>`:'';















    // Adicionais do banco







    const adicionaisCat=adicionaisDB.filter(a=>a.categorias.includes(ci.categoria));







    const addHtml=temAdicionais&&adicionaisCat.length?`







        <div class="opcao-titulo">➕ Adicionais (R$3,00 cada)</div>







        <div class="add-grid">







            ${adicionaisCat.map(a=>`







                <div class="add-chip ${ci.adicionais.find(x=>x.id==a.id)?'selected':''}"







                    onclick="toggleAdicionalCarrinho(${ci.id},${a.id},'${a.nome}',${a.preco},this)">







                    ${a.nome}<span class="add-chip-preco"> +R$${parseFloat(a.preco).toFixed(2)}</span>







                </div>`).join('')}







        </div>`:'';















    const temOpcoes=paoHtml||saladaHtml||addHtml;















    return`<div class="item-carrinho" id="cart-item-${ci.id}">







        <div class="item-carrinho-topo">







            <div class="item-carrinho-info">







                <div class="item-carrinho-nome">${ci.nome}${ci.tamanho?` <span style="font-size:.72rem;color:var(--muted)">(${ci.tamanho})</span>`:''}</div>







                ${detParts.length?`<div class="item-carrinho-det">${detParts.join(' · ')}</div>`:''}







                <div class="item-carrinho-ctrl">







                    <button class="btn-qtd" onclick="mudarQtd(${ci.id},-1)">−</button>







                    <span class="qtd-num">${ci.qtd}</span>







                    <button class="btn-qtd" onclick="mudarQtd(${ci.id},+1)">+</button>







                </div>







            </div>







            <div class="item-carrinho-preco">R$${(ci.subtotal*ci.qtd).toFixed(2)}</div>







        </div>







        ${temOpcoes?`<div class="item-opcoes">${paoHtml}${saladaHtml}${addHtml}







            <textarea class="obs-carrinho" rows="1" placeholder="Obs deste item (ex: sem cebola...)" oninput="salvarObs(${ci.id},this.value)">${ci.obs||''}</textarea>







        </div>`:''}







    </div>`;







}















function selecionarPaoCarrinho(id, nomePao, extra, el){







    const ci=carrinho.find(i=>i.id===id);







    if(!ci) return;







    ci.pao=nomePao;ci.paoExtra=extra;







    ci.subtotal=calcSubtotal(ci);







    atualizarFab();

    salvarEstado();







    // Atualizar UI sem re-render completo







    const cartItem=document.getElementById('cart-item-'+id);







    if(cartItem){







        cartItem.querySelectorAll('.pao-opt').forEach(b=>b.classList.remove('selected'));







        el.classList.add('selected');







        atualizarPrecoCartItem(ci);







    }







}















function toggleSalada(id, item, el){







    const ci=carrinho.find(i=>i.id===id);







    if(!ci) return;







    const idx=ci.salada.indexOf(item);







    if(idx>-1){ci.salada.splice(idx,1);el.classList.add('desmarcado');}







    else{ci.salada.push(item);el.classList.remove('desmarcado');}







    atualizarDetalhes(ci);
    salvarEstado();







}















function toggleAdicionalCarrinho(id, addId, addNome, addPreco, el){







    const ci=carrinho.find(i=>i.id===id);







    if(!ci) return;







    const idx=ci.adicionais.findIndex(a=>a.id==addId);







    if(idx>-1){ci.adicionais.splice(idx,1);el.classList.remove('selected');}







    else{ci.adicionais.push({id:addId,nome:addNome,preco:parseFloat(addPreco)});el.classList.add('selected');}







    ci.subtotal=calcSubtotal(ci);







    atualizarFab();







    atualizarPrecoCartItem(ci);







    atualizarDetalhes(ci);
    salvarEstado();







}















function atualizarPrecoCartItem(ci){







    const el=document.querySelector(`#cart-item-${ci.id} .item-carrinho-preco`);







    if(el) el.textContent='R$'+(ci.subtotal*ci.qtd).toFixed(2);







    document.getElementById('total-valor').textContent='R$ '+carrinho.reduce((s,i)=>s+i.subtotal*i.qtd,0).toFixed(2);







    document.getElementById('fab-total').textContent='R$'+carrinho.reduce((s,i)=>s+i.subtotal*i.qtd,0).toFixed(2);







}















function atualizarDetalhes(ci){







    const el=document.querySelector(`#cart-item-${ci.id} .item-carrinho-det`);







    if(!el) return;







    const detParts=[];







    if(ci.pao) detParts.push(`Pão ${ci.pao}${ci.paoExtra>0?' (+R$'+ci.paoExtra.toFixed(2)+')':''}`);







    if(ci.adicionais.length) detParts.push(`+${ci.adicionais.map(a=>a.nome).join(', ')}`);







    if(ci.salada.length) detParts.push(ci.salada.join(', '));







    el.textContent=detParts.join(' · ');







}















function salvarObs(id,v){const i=carrinho.find(x=>x.id===id);if(i){i.obs=v.trim();salvarEstado();}}







function mudarQtd(id,d){







    const i=carrinho.findIndex(x=>x.id===id);







    carrinho[i].qtd+=d;







    if(carrinho[i].qtd<=0) carrinho.splice(i,1);







    atualizarFab();renderCarrinho();
    salvarEstado();







}















// ---- CONFIRMAÇÃO ----





