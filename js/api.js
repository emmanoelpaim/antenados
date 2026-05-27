function normalizarItem(i){
  const img=i.imagem;
  if(img&&!/^https?:/.test(img)) i={...i,imagem:CONFIG.imageBaseUrl+img};
  return i;
}

async function carregarDoServidor(){







    document.getElementById('main-cardapio').innerHTML='<div style="text-align:center;padding:60px 20px;color:var(--muted)"><div style="font-size:2rem;margin-bottom:12px">⏳</div><p>Carregando cardápio...</p></div>';







    // Carregar adicionais do banco







    try{







        const r=await fetch(CONFIG.API.adicionais);







        if(r.ok){const d=await r.json();if(d.sucesso) adicionaisDB=d.adicionais;}







    }catch(e){console.warn('Adicionais: usando fallback');}







    // Fallback adicionais







    if(!adicionaisDB.length){







        adicionaisDB=[







            {id:1,nome:'Bacon',preco:'3.00',categorias:'Lanches,Pastel,Assados,Tapioca'},







            {id:2,nome:'Catupiry',preco:'3.00',categorias:'Lanches,Pastel,Assados,Tapioca'},







            {id:3,nome:'Frango desfiado',preco:'3.00',categorias:'Lanches,Pastel,Assados,Tapioca'},







            {id:4,nome:'Queijo',preco:'3.00',categorias:'Lanches,Pastel,Assados,Tapioca'},







            {id:5,nome:'Presunto',preco:'3.00',categorias:'Lanches,Pastel,Assados,Tapioca'},







            {id:6,nome:'Calabresa',preco:'3.00',categorias:'Lanches,Pastel,Assados,Tapioca'},







            {id:7,nome:'Cheddar',preco:'3.00',categorias:'Lanches,Pastel,Assados,Tapioca'},







            {id:8,nome:'Tomate',preco:'3.00',categorias:'Lanches,Pastel,Assados,Tapioca'},







            {id:9,nome:'Ovo',preco:'3.00',categorias:'Lanches,Pastel,Assados,Tapioca'},







        ];







    }







    // Carregar cardápio







    try{







        const r=await fetch(CONFIG.API.cardapio);







        if(!r.ok) throw new Error();







        const d=await r.json();







        if(!d.sucesso) throw new Error();







        todosItens=d.itens.filter(i=>i.status==="ativo").map(normalizarItem);







    }catch(e){







        todosItens=ITENS_PADRAO;







        console.warn('Cardápio: usando dados locais');







    }







    renderTabs();renderCardapio();







    document.querySelectorAll('.secao').forEach(s=>observer.observe(s));







    renderPodio();

    restaurarEstado();







}
