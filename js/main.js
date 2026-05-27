document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('btn-conf-whats').addEventListener('click',()=>{
    if(!urlWhatsAppPendente){
      alert('Erro interno: reabra o carrinho e tente novamente.');
      return;
    }
    limparEstado();
    carrinho=[];
    window.location.href=urlWhatsAppPendente;
  });
  gerarOpcoesDia();
  gerarHorarios();
  preencherDosCookies();
  carregarDoServidor();
  ajustarCatScroll();
  verificarModoReserva();
});