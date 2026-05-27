const CONFIG = {
  API: {
    cardapio: 'data/cardapio.json',
    adicionais: 'data/adicionais.json'
  },
  imageBaseUrl: 'https://lanchonetedoassis.com',
  whatsapp: '5551995794128',
  horarioAbertura: 4,
  horarioFechamentoSemana: 11,
  horarioFechamentoSab: 10.5
};

const WHATSAPP_NUM = CONFIG.whatsapp;
const HORARIO_ABERTURA = CONFIG.horarioAbertura;
const HORARIO_FECHAMENTO_SEMANA = CONFIG.horarioFechamentoSemana;
const HORARIO_FECHAMENTO_SAB = CONFIG.horarioFechamentoSab;
const HORARIO_FECHAMENTO = (new Date().getDay() === 6) ? HORARIO_FECHAMENTO_SAB : HORARIO_FECHAMENTO_SEMANA;















// Categorias que ganham adicionais







const CATS_COM_ADICIONAIS = ['Lanches','Pastel','Assados','Tapioca'];







// Categorias que ganham seletor de pão







const CATS_COM_PAO = ['Lanches'];







// Categorias que ganham checkboxes de salada







const CATS_COM_SALADA = ['Lanches'];















const OPCOES_PAO = [







    {id:'brioche', nome:'Brioche',  extra:0,    padrao:true},







    {id:'frances', nome:'Francês',  extra:0,    padrao:false},







    {id:'integral',nome:'Integral', extra:0,    padrao:false},







    {id:'caseiro', nome:'Caseiro',  extra:1.00, padrao:false},







];















const ITENS_PADRAO = [







  {id:1, nome:'Pão com Steak',              categoria:'Pão',    precos:{unico:14}, destaque:false},







  {id:2, nome:'Pão com 1 Linguiça',         categoria:'Pão',    precos:{unico:10}, destaque:false},







  {id:3, nome:'Pão com 2 Linguiças',        categoria:'Pão',    precos:{unico:15}, destaque:false},







  {id:4, nome:'Pão com Espeto e Queijo',    categoria:'Pão',    precos:{unico:16}, destaque:false},







  {id:5, nome:'Pão com Bolinho de Carne',   categoria:'Pão',    precos:{unico:16}, destaque:true},







  {id:6, nome:'Pão com 2 Ovos',             categoria:'Pão',    precos:{unico:10}, destaque:false},







  {id:7, nome:'Pão com Coxa e Sobrecoxa',   categoria:'Pão',    precos:{unico:18}, destaque:false},







  {id:8, nome:'Pão com Bife na Chapa',      categoria:'Pão',    precos:{unico:15}, destaque:false},







  {id:9, nome:'Pão com Bife, Queijo e Ovo', categoria:'Pão',    precos:{unico:20}, destaque:true},







  {id:10,nome:'Pão Especial',               categoria:'Pão',    precos:{unico:18}, destaque:true},







  {id:11,nome:'Pão Especial com Pizza',     categoria:'Pão',    precos:{unico:20}, destaque:false},







  {id:12,nome:'Pão Especial com Frango',    categoria:'Pão',    precos:{unico:20}, destaque:false},







  {id:13,nome:'X-Burguer',                  categoria:'Lanches',precos:{unico:12}, destaque:false},







  {id:14,nome:'X-Salada',                   categoria:'Lanches',precos:{unico:14}, destaque:true},







  {id:15,nome:'X-Calabresa',                categoria:'Lanches',precos:{unico:18}, destaque:false},







  {id:16,nome:'X-Bacon',                    categoria:'Lanches',precos:{unico:18}, destaque:false},







  {id:17,nome:'X-Egg',                      categoria:'Lanches',precos:{unico:18}, destaque:false},







  {id:18,nome:'X-Frango',                   categoria:'Lanches',precos:{unico:18}, destaque:false},







  {id:19,nome:'X-Assis · o original',       categoria:'Lanches',precos:{unico:27}, destaque:true},







  {id:20,nome:'X-Tudão',                    categoria:'Lanches',precos:{unico:30}, destaque:false},







  {id:21,nome:'Misto Quente',               categoria:'Lanches',precos:{unico:10}, destaque:false},







  {id:22,nome:'Queijo com 2 Ovos',          categoria:'Lanches',precos:{unico:15}, destaque:false},







  {id:23,nome:'Sanduíche Natural',          categoria:'Lanches',precos:{unico:15}, destaque:true},







  {id:24,nome:'Bauru',                      categoria:'Lanches',precos:{unico:13}, destaque:true},







  {id:25,nome:'Pastel de Carne',            categoria:'Pastel', precos:{p:7},      destaque:true},







  {id:26,nome:'Pastel de Queijo',           categoria:'Pastel', precos:{p:12,g:17},destaque:false},







  {id:27,nome:'Pastel de Frango e Catupiry',categoria:'Pastel', precos:{p:12,g:17},destaque:false},







  {id:28,nome:'Pastel de Pizza',            categoria:'Pastel', precos:{p:12,g:17},destaque:false},







  {id:29,nome:'Pastel de Frango e Cheddar', categoria:'Pastel', precos:{g:17},     destaque:true},







  {id:30,nome:'Pastel Especial',            categoria:'Pastel', precos:{unico:15}, destaque:true, descricao:'Carne moída 1ª · vinagrete seco · massa caseira'},







  {id:31,nome:'Pastel de Queijo e Carne',   categoria:'Pastel', precos:{unico:18}, destaque:false},







  {id:32,nome:'Pastel Especial da Casa',    categoria:'Pastel', precos:{unico:26}, destaque:true, descricao:'Receita exclusiva · pergunte ao atendente', disponibilidade:true},







  {id:33,nome:'Tapioca Frango e Catupiry',  categoria:'Tapioca',precos:{unico:20}, destaque:false},







  {id:34,nome:'Tapioca Frango e Cheddar',   categoria:'Tapioca',precos:{unico:20}, destaque:false},







  {id:35,nome:'Tapioca Frango e Queijo',    categoria:'Tapioca',precos:{unico:20}, destaque:false},







  {id:36,nome:'Tapioca Pizza',              categoria:'Tapioca',precos:{unico:20}, destaque:false},







  {id:37,nome:'Tapioca Calabresa e Queijo', categoria:'Tapioca',precos:{unico:20}, destaque:false},







  {id:38,nome:'Tapioca Carne e Queijo',     categoria:'Tapioca',precos:{unico:20}, destaque:false, disponibilidade:true},







  {id:39,nome:'Tapioca Banana Nevada',      categoria:'Tapioca',precos:{unico:25}, destaque:true,  disponibilidade:true},







  {id:40,nome:'Pão de Queijo',              categoria:'Assados',precos:{unico:5},  destaque:false},







  {id:41,nome:'Linguiça',                   categoria:'Assados',precos:{unico:6},  destaque:false},







  {id:42,nome:'Coxinha',                    categoria:'Assados',precos:{unico:10}, destaque:false, descricao:'Com Catupiry · Com Cheddar'},







  {id:43,nome:'Risólis / Croquete / Bolinho',categoria:'Assados',precos:{unico:10},destaque:true},







  {id:44,nome:'Espetinho de Frango',        categoria:'Assados',precos:{unico:10}, destaque:true,  disponibilidade:true},







  {id:45,nome:'Mini Pizza',                 categoria:'Assados',precos:{unico:10}, destaque:false},







  {id:46,nome:'Coxa / Sobrecoxa',           categoria:'Assados',precos:{unico:13}, destaque:false, disponibilidade:true},







  {id:47,nome:'Pão de Queijo Recheado Choc. Branco',categoria:'Doces',precos:{unico:10},destaque:true, disponibilidade:true},







  {id:48,nome:'Pão de Queijo Recheado Choc. Preto', categoria:'Doces',precos:{unico:10},destaque:true, disponibilidade:true},







  {id:49,nome:'Bolos',                      categoria:'Doces',  precos:{unico:12}, destaque:true,  disponibilidade:true},







  {id:50,nome:'Assado de Chocolate',        categoria:'Doces',  precos:{unico:10}, destaque:true,  disponibilidade:true},







  {id:51,nome:'Nutella',                    categoria:'Doces',  precos:{p:15,g:20},destaque:false},







  {id:52,nome:'Banana Nevada',              categoria:'Doces',  precos:{p:15,g:20},destaque:true},







  {id:53,nome:'Pingado',                    categoria:'Bebidas Quentes',precos:{m:6,g:7,xg:13},destaque:false},







  {id:54,nome:'Café',                       categoria:'Bebidas Quentes',precos:{m:6,g:7,xg:13},destaque:true},







  {id:55,nome:'Nescau',                     categoria:'Bebidas Quentes',precos:{m:6,g:7,xg:13},destaque:false},







  {id:56,nome:'Abacaxi com Hortelã',        categoria:'Sucos',  precos:{unico:15}, destaque:false, descricao:'Com leite ou água'},







  {id:57,nome:'Laranja',                    categoria:'Sucos',  precos:{unico:15}, destaque:false, descricao:'Com leite ou água'},







  {id:58,nome:'Maracujá',                   categoria:'Sucos',  precos:{unico:15}, destaque:false, descricao:'Com leite ou água'},







  {id:59,nome:'Morango',                    categoria:'Sucos',  precos:{unico:15}, destaque:false, descricao:'Com leite ou água'},







  {id:60,nome:'Detox do Assis 500ml',       categoria:'Sucos',  precos:{unico:15}, destaque:true,  disponibilidade:true, descricao:'Plano mensal a partir de R$12/un'},







  {id:61,nome:'Coco Verde 500ml',           categoria:'Sucos',  precos:{unico:15}, destaque:true,  disponibilidade:true},







  {id:62,nome:'Coca-Cola 2L',               categoria:'Bebidas Geladas',precos:{unico:20},destaque:false},







  {id:63,nome:'Coca-Cola 1L (Vidro)',       categoria:'Bebidas Geladas',precos:{unico:10},destaque:false},







  {id:64,nome:'Coca-Cola 600ml',            categoria:'Bebidas Geladas',precos:{unico:9}, destaque:false},







  {id:65,nome:'Coca 260ml',                 categoria:'Bebidas Geladas',precos:{unico:5}, destaque:false},







  {id:66,nome:'Refrigerante Lata',          categoria:'Bebidas Geladas',precos:{unico:7}, destaque:false},







  {id:67,nome:'Monster Energy 473ml',       categoria:'Bebidas Geladas',precos:{unico:17},destaque:true},







  {id:68,nome:'RedBull',                    categoria:'Bebidas Geladas',precos:{unico:17},destaque:false},







  {id:69,nome:'Água c/ ou s/ Gás',          categoria:'Bebidas Geladas',precos:{unico:5}, destaque:false},







  {id:70,nome:'Água 1,5 Litro',             categoria:'Bebidas Geladas',precos:{unico:10},destaque:false},







  {id:71,nome:'Whey',                       categoria:'Bebidas Geladas',precos:{unico:13},destaque:true, disponibilidade:true},







  {id:72,nome:'Água de Coco',               categoria:'Bebidas Geladas',precos:{unico:10},destaque:true, disponibilidade:true},







];















const CAT_EMOJI = {'Pão':'🍞','Lanches':'🍔','Pastel':'🥟','Tapioca':'🫔','Assados':'🍗','Doces':'🍰','Bebidas Quentes':'☕','Sucos':'🥤','Bebidas Geladas':'🧃'};







const CATS_ORDEM = ['Lanches','Salgados','Pastel','Tapioca','Assados','Doces','Bebidas','Bebidas Quentes','Sucos','Bebidas Geladas','Pão'];







const GRUPO_MAPA = {



    'lanches':  'Lanches',



    'salgados': 'Salgados',



    'doces':    'Doces',



    'bebidas':  'Bebidas',



    'quentes':  'Bebidas Quentes'
};

const GRUPO_SECOES = {
    lanches: ['Lanches'],
    salgados: ['Pastel', 'Tapioca', 'Assados', 'Salgados'],
    doces: ['Doces'],
    bebidas: ['Sucos', 'Bebidas Geladas', 'Bebidas'],
    quentes: ['Bebidas Quentes']
};
