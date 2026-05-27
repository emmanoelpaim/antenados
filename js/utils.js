function dataLocal(dt){ const d=dt||new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function labelDia(dateStr){







    const hoje=new Date();hoje.setHours(0,0,0,0);







    const amanha=new Date(hoje);amanha.setDate(amanha.getDate()+1);







    const d=new Date(dateStr+'T00:00:00');







    if(d.getTime()===hoje.getTime()) return 'Hoje';







    if(d.getTime()===amanha.getTime()) return 'Amanhã';







    const dias=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];







    return `${dias[d.getDay()]} ${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}`;







}







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







function getReservaDados(){







    const ativo=document.getElementById('toggle-reserva').checked;







    if(!ativo) return{data:null,hora:null,label:null};







    const data=document.getElementById('reserva-data').value||null;







    const hora=document.getElementById('reserva-hora').value||null;







    return{data,hora,label:data?labelDia(data):null};







}















// ---- RENDER CARDÁPIO ----







function tamLabel(t){return{unico:'',p:'P',m:'M',g:'G',xg:'XG'}[t]||t;}






function formatarPlaca(inp){let v=inp.value.toUpperCase().replace(/[^A-Z0-9]/g,'');if(v.length>7)v=v.slice(0,7);if(v.length>3&&/^[A-Z]{3}\d+$/.test(v))v=v.slice(0,3)+'-'+v.slice(3);inp.value=v;}







function formatarTel(inp){let v=inp.value.replace(/\D/g,'');if(v.length>11)v=v.slice(0,11);if(v.length>10)v=v.replace(/^(\d{2})(\d{5})(\d{4})$/,'($1) $2-$3');else if(v.length>6)v=v.replace(/^(\d{2})(\d{4})(\d+)$/,'($1) $2-$3');else if(v.length>2)v=v.replace(/^(\d{2})(\d+)$/,'($1) $2');inp.value=v;}







function semAcento(s){return (s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9 ]/g,' ');}







function fuzzyMatch(q,t){if(!q)return true;q=semAcento(q);t=semAcento(t);return t.includes(q)||q.split(' ').filter(Boolean).every(w=>t.includes(w));}

function secaoAlvoGrupo(grupo) {
    const lista = GRUPO_SECOES[grupo];
    if (lista) {
        for (const cat of lista) {
            if (document.getElementById('sec-' + cat.replace(/\s+/g, '-'))) return cat;
        }
    }
    return GRUPO_MAPA[grupo] || null;
}

function grupoDaSecao(cat) {
    for (const [grupo, secoes] of Object.entries(GRUPO_SECOES)) {
        if (secoes.includes(cat)) return grupo;
    }
    const entry = Object.entries(GRUPO_MAPA).find(([, v]) => v === cat);
    return entry ? entry[0] : null;
}