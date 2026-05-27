function montarMensagemWhatsApp(opts) {
  const { nome, tel, locText, pagText, reserva, total, obs, carrinhoItens } = opts;
  let msg = `*LANCHONETE E PASTELARIA DO ASSIS*\n`;
  if (reserva.data && reserva.hora) {
    msg += `*📅 RESERVA — PEDIDO AGENDADO*\n`;
    msg += `*Para:* ${reserva.label} às ${reserva.hora}\n`;
  } else {
    msg += `*🛒 NOVO PEDIDO*\n`;
  }
  msg += `──────────────────────\n`;
  msg += `*Cliente:* ${nome}\n`;
  if (tel) msg += `*Telefone:* ${tel}\n`;
  msg += `*Local:* ${locText}\n`;
  msg += `*Pagamento:* ${pagText}\n`;
  msg += `──────────────────────\n*ITENS*\n\n`;
  carrinhoItens.forEach((ci, i) => {
    msg += `${i + 1}. *${ci.nome}*`;
    if (ci.tamanho) msg += ` (${ci.tamanho})`;
    msg += ` × ${ci.qtd} — R$ ${(ci.subtotal * ci.qtd).toFixed(2)}\n`;
    if (ci.pao) msg += `   🍞 Pão: ${ci.pao}\n`;
    if (ci.salada && ci.salada.length) msg += `   🥗 Salada: ${ci.salada.join(', ')}\n`;
    if (ci.adicionais && ci.adicionais.length) msg += `   ➕ ${ci.adicionais.map(a => a.nome).join(', ')}\n`;
    if (ci.obs) msg += `   📝 ${ci.obs}\n`;
  });
  msg += `──────────────────────\n*TOTAL: R$ ${total.toFixed(2)}*\n`;
  if (obs) msg += `\n📝 Obs geral: ${obs}\n`;
  if (reserva.data && reserva.hora) {
    msg += `\n⚠️ *PEDIDO RESERVADO PARA ${reserva.label.toUpperCase()} ÀS ${reserva.hora}*\n`;
  }
  msg += `──────────────────────\n_Pedido via cardápio digital_`;
  return msg;
}

function montarPayloadPedido(opts) {
  const { nome, tel, locDesc, reserva, total, obs, trocoVal } = opts;
  return {
    nome_cliente: nome,
    telefone_cliente: tel,
    tipo_local: tipoLocal,
    local_descricao: locDesc,
    pagamento: tipoPagamento === 'pix' ? 'PIX' : tipoPagamento === 'cartao' ? 'Cartão' : 'Dinheiro',
    troco: trocoVal ? parseFloat(trocoVal) : null,
    itens: carrinho.map(ci => ({
      nome: ci.nome,
      tamanho: ci.tamanho || '',
      qtd: ci.qtd,
      preco_unit: ci.subtotal,
      adicionais: Array.isArray(ci.adicionais) ? ci.adicionais.map(a => a.nome) : [],
      pao: ci.pao || '',
      salada: Array.isArray(ci.salada) ? ci.salada : [],
      obs: ci.obs || ''
    })),
    total,
    observacao: obs,
    reserva_data: reserva.data,
    reserva_hora: reserva.hora
  };
}

function aplicarPedidoWhatsApp(msg, payload) {
  urlWhatsAppPendente = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(msg)}`;
  dadosPedidoPendente = payload;
}
