# Contrato dos arquivos JSON

## `cardapio.json`

```json
{
  "sucesso": true,
  "total": 133,
  "itens": [
    {
      "id": 149,
      "nome": "X-Burguer",
      "categoria": "Lanches",
      "descricao": null,
      "precos": { "unico": 13 },
      "imagem": "/dashboard/cardapio/uploads/exemplo.jpg",
      "disponibilidade": false,
      "destaque": false,
      "status": "ativo",
      "adicionais": [],
      "promo": null
    }
  ]
}
```

- `precos`: use `"unico"` ou tamanhos como `"p"`, `"m"`, `"g"`.
- `status`: apenas `"ativo"` é exibido.
- `imagem`: caminho relativo (prefixado por `CONFIG.imageBaseUrl`) ou URL absoluta.

## `adicionais.json`

```json
{
  "sucesso": true,
  "adicionais": [
    {
      "id": 1,
      "nome": "Bacon",
      "preco": "3.00",
      "categorias": "Lanches,Pastel,Assados,Tapioca"
    }
  ]
}
```

- `categorias`: lista separada por vírgulas, usada para filtrar adicionais por tipo de produto.

## Origem dos dados

Você pode exportar o retorno de `api_cardapio.php` e `api_adicionais.php` do ambiente de produção e colar aqui sem alterar o código da aplicação.
