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
function gerarOpcoesDia(){







    const sel=document.getElementById('reserva-data');







    sel.innerHTML='<option value="">Selecione o dia</option>';







    const agora=new Date();







    const horaAtual=agora.getHours()+agora.getMinutes()/60;







    for(let i=0;i<=7;i++){







        const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()+i);







        if(d.getDay()===0) continue; // domingo fechado







        const fechHojeDia=(d.getDay()===6)?HORARIO_FECHAMENTO_SAB:HORARIO_FECHAMENTO_SEMANA;







        if(i===0 && horaAtual+1>=fechHojeDia) continue; // hoje sem horario disponivel







        const val=dataLocal(d);







        sel.innerHTML+=`<option value="${val}">${labelDia(val)}</option>`;







    }







    // Auto-selecionar primeiro dia disponivel







    if(sel.options.length>1) sel.selectedIndex=1;







    gerarHorarios();







}







function gerarHorarios(){







    const sel=document.getElementById('reserva-hora');







    sel.innerHTML='<option value="">Selecione</option>';







    const dataSel=document.getElementById('reserva-data').value;







    const agora=new Date();







    const hoje=dataLocal(agora);







    const eHoje=dataSel===hoje;







    const dataDt=dataSel?new Date(dataSel+'T00:00:00'):agora;







    const fechDia=(dataDt.getDay()===6)?HORARIO_FECHAMENTO_SAB:HORARIO_FECHAMENTO_SEMANA;







    const minHora=eHoje?(agora.getHours()+agora.getMinutes()/60+1):HORARIO_ABERTURA;







    let temHorario=false;







    for(let h=HORARIO_ABERTURA;h<=Math.ceil(fechDia);h++){







        const mins=['00','30'];







        mins.forEach(m=>{







            const hDecimal=h+parseInt(m)/60;







            if(hDecimal>fechDia) return;







            if(hDecimal<minHora) return;







            const hStr=String(h).padStart(2,'0');







            const val=hStr+':'+m;







            sel.innerHTML+='<option value="'+val+'">'+val+'</option>';







            temHorario=true;







        });







    }







    if(!temHorario) sel.innerHTML='<option value="">Sem horários disponíveis</option>';







}







function toggleReserva(ativo){







    document.getElementById('reserva-campos').classList.toggle('open',ativo);







    if(ativo){ gerarOpcoesDia(); }







    const lbl=document.getElementById('toggle-label');







    lbl.textContent=ativo?'Quero agendar!':'Pedido para agora';







    lbl.style.color=ativo?'var(--blue)':'var(--muted)';







}







function abrirConfirmacao(){







    const nome=document.getElementById('ped-nome').value.trim();







    const tel=document.getElementById('ped-tel').value.trim();







    if(!nome){alert('Por favor, informe seu nome!');return;}







    if(!carrinho.length){alert('Seu carrinho está vazio!');return;}







    const reserva=getReservaDados();







    if(document.getElementById('toggle-reserva').checked&&(!reserva.data||!reserva.hora)){







        alert('Selecione o dia e horário da reserva, ou desative a opção.');return;







    }







    // Box obrigatório



    if(tipoLocal==='box'&&!document.getElementById('ped-box').value.trim()){



        alert('Por favor, informe o número ou nome do seu Box! 📦');



        document.getElementById('ped-box').focus();



        return;



    }







    // Caminhão obrigatório



    if(tipoLocal==='caminhao'&&!document.getElementById('ped-placa').value.trim()){



        alert('Por favor, informe a placa do caminhão! 🚚');



        document.getElementById('ped-placa').focus();



        return;



    }







    // Troco obrigatório quando dinheiro



    if(tipoPagamento==='dinheiro'&&!semTroco&&!document.getElementById('ped-troco').value){



        alert('Informe o valor para troco ou toque em "Não preciso de troco" 💵');



        document.getElementById('ped-troco').focus();



        return;



    }







    salvarCookies();







    const locDesc=tipoLocal==='box'?document.getElementById('ped-box').value.trim():document.getElementById('ped-placa').value.trim();







    const locText=tipoLocal==='box'?(locDesc?'Box: '+locDesc:'Box'):(locDesc?'Caminhão: '+locDesc:'Caminhão');







    const trocoVal=document.getElementById('ped-troco').value;







    const pagText=tipoPagamento==='pix'?'PIX':tipoPagamento==='cartao'?'Cartão':



        (semTroco?'Dinheiro (sem troco)':trocoVal?'Dinheiro (troco p/ R$'+parseFloat(trocoVal).toFixed(2)+')':'Dinheiro');







    const total=carrinho.reduce((s,i)=>s+i.subtotal*i.qtd,0);







    const obs=document.getElementById('ped-obs').value.trim();















    // Badge de reserva na confirmação







    const badgeEl=document.getElementById('conf-reserva-badge');







    if(reserva.data&&reserva.hora){







        badgeEl.textContent=`📅 RESERVA: ${reserva.label} às ${reserva.hora}`;







        badgeEl.style.display='block';







    } else {







        badgeEl.style.display='none';







    }















    document.getElementById('conf-nome').textContent=nome;







    document.getElementById('conf-tel').textContent=tel||'—';







    document.getElementById('conf-local').textContent=locText;







    document.getElementById('conf-pag').textContent=pagText;







    document.getElementById('conf-total').textContent='R$ '+total.toFixed(2).replace('.',',');







    document.getElementById('conf-itens').innerHTML=carrinho.map(ci=>{







        const adds=ci.adicionais.length?` + ${ci.adicionais.map(a=>a.nome).join(', ')}`:''







        const pao=ci.pao?` | Pão ${ci.pao}`:''







        const salada=ci.salada.length?` | ${ci.salada.join(', ')}`:''







        return`<div class="conf-item">${ci.qtd}× ${ci.nome}${ci.tamanho?' ('+ci.tamanho+')':''}${pao}${salada}${adds} — R$${(ci.subtotal*ci.qtd).toFixed(2).replace('.',',')}</div>`;







    }).join('');















    const msg = montarMensagemWhatsApp({ nome, tel, locText, pagText, reserva, total, obs, carrinhoItens: carrinho });
    aplicarPedidoWhatsApp(msg, montarPayloadPedido({ nome, tel, locDesc, reserva, total, obs, trocoVal }));
    document.getElementById('conf-overlay').classList.add('open');




}







function fecharConfirmacao(){document.getElementById('conf-overlay').classList.remove('open');}















// ---- UTILS ----







function selecionarTipo(t){tipoLocal=t;['box','caminhao'].forEach(x=>document.getElementById('tipo-'+x).classList.toggle('sel',x===t));document.getElementById('campo-box').style.display=t==='box'?'block':'none';document.getElementById('campo-caminhao').style.display=t==='caminhao'?'block':'none';salvarEstado();}







function selecionarPag(t){



    tipoPagamento=t;



    ['pix','cartao','dinheiro'].forEach(x=>document.getElementById('pay-'+x).classList.toggle('sel',x===t));



    document.getElementById('campo-troco').style.display=t==='dinheiro'?'block':'none';



    document.getElementById('info-pix').style.display=t==='pix'?'block':'none';



    // Resetar troco ao trocar forma de pagamento



    if(t!=='dinheiro'){ ativarSemTroco(false); document.getElementById('ped-troco').value=''; }

    salvarEstado();



}





