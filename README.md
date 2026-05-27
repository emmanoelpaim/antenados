# Cardápio digital – Antenados

Réplica organizada do cardápio da Lanchonete e Pastelaria do Assis em HTML, CSS e JavaScript vanilla, com dados em JSON local.

## Executar localmente

O `fetch` dos JSON exige um servidor HTTP (não abra só o `index.html` pelo explorador de arquivos).

```bash
npx serve .
```

Abra o endereço exibido no terminal (ex.: `http://localhost:3000`).

Alternativa:

```bash
python -m http.server 8080
```

## Estrutura

| Pasta / arquivo | Função |
|-----------------|--------|
| `index.html` | Página do cardápio |
| `css/` | Estilos (variables, base, layout, components) |
| `js/config.js` | Rotas da API, WhatsApp, horários, constantes |
| `js/api.js` | Carrega `data/cardapio.json` e `data/adicionais.json` |
| `js/` (demais) | Cardápio, carrinho, checkout, WhatsApp |
| `data/cardapio.json` | Itens do cardápio |
| `data/adicionais.json` | Adicionais |

## Rotas de API (JSON)

Definidas em `js/config.js`:

- `CONFIG.API.cardapio` → `data/cardapio.json`
- `CONFIG.API.adicionais` → `data/adicionais.json`

Substitua esses arquivos pelos seus exports completos; o formato deve seguir `data/README.md`.

## Configuração

Em `js/config.js`:

- `CONFIG.whatsapp` – número com DDI (sem `+`)
- `CONFIG.imageBaseUrl` – prefixo das URLs de imagem do cardápio
- Horários de abertura/fechamento (modo reserva fora do expediente)

## Fluxo do pedido

1. Carrega cardápio e adicionais dos JSON  
2. Cliente monta o carrinho  
3. Preenche dados e revisa na tela de confirmação  
4. Abre o WhatsApp com a mensagem formatada (sem salvar no servidor)
