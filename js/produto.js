function mostrarAvisoSazonalidade(nomeItem, onConfirmar) {



    const ov = document.createElement('div');



    ov.className = 'sazon-overlay';



    ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:600;display:flex;align-items:flex-end;justify-content:center;';



    ov.innerHTML = '<div style="background:#fff;border-radius:20px 20px 0 0;padding:24px 20px 32px;width:100%;max-width:480px;">'



        + '<div style="font-family:Barlow Condensed,sans-serif;font-size:1.2rem;font-weight:900;color:#92600a;margin-bottom:6px;">Produto com Alta Saida</div>'



        + '<p style="font-size:.85rem;color:#78350f;line-height:1.5;margin-bottom:16px;">Este produto tem disponibilidade limitada. Se nao estiver disponivel, confirmaremos pelo WhatsApp.</p>'



        + '<div style="display:flex;gap:8px;">'



        + '<button onclick="this.closest(\'.sazon-overlay\').remove()" style="flex:1;padding:12px;border:1.5px solid #ddd;border-radius:10px;background:#fff;cursor:pointer;font-size:.88rem;">Cancelar</button>'



        + '<button id="btn-ok-sazon" style="flex:1.6;padding:12px;background:#0D2B8C;color:#fff;border:none;border-radius:10px;cursor:pointer;font-size:.88rem;font-weight:700;">Adicionar mesmo assim</button>'



        + '</div></div>';



    document.body.appendChild(ov);



    ov.querySelector('#btn-ok-sazon').onclick = () => { ov.remove(); onConfirmar(); };



    ov.onclick = e => { if(e.target===ov) ov.remove(); };



}







function adicionarItem(itemId){







    const item=todosItens.find(i=>i.id===itemId);







    if(!item) return;



    if(item.disponibilidade){ mostrarAvisoSazonalidade(item.nome, ()=>_adicionarItemCore(itemId)); return; }



    _adicionarItemCore(itemId);



}



function _adicionarItemCore(itemId){







    const item=todosItens.find(i=>i.id===itemId);







    if(!item) return;







    const tamanho=Object.keys(item.precos)[0];







    const preco=item.precos[tamanho]||0;







    const temOpcoes=CATS_COM_ADICIONAIS.includes(item.categoria)||CATS_COM_PAO.includes(item.categoria);















    // Verifica se já existe item idêntico sem personalização







    const chave=`${itemId}_${tamanho}_base`;







    const ex=carrinho.find(c=>c.chave===chave&&!c.personalizado);







    if(ex&&!temOpcoes){ex.qtd++;atualizarFab();animarBotao(itemId);salvarEstado();return;}















    carrinho.push({







        id:Date.now(),







        chave,







        itemId,







        nome:item.nome,







        categoria:item.categoria,







        tamanho:tamLabel(tamanho),







        tamanhoKey:tamanho,







        precoBase:preco,







        pao: CATS_COM_PAO.includes(item.categoria) ? 'Brioche' : null,







        paoExtra: 0,







        adicionais:[],







        salada: CATS_COM_SALADA.includes(item.categoria) ? ['Tomate','Alface americana'] : [],







        obs:'',







        subtotal:preco,







        qtd:1,







        personalizado:temOpcoes,







    });







    atualizarFab();







    animarBotao(itemId);

    salvarEstado();








    // Abre carrinho automaticamente para itens com opções







    if(temOpcoes){







        setTimeout(()=>{abrirCarrinho();},300);







    }







}













