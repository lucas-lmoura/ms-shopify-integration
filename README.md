## Sobre
```bash
A presente aplicação recebe uma notificação da shopify sempre que uma compra for aprovada e a registra no banco de dados,
enquanto isso o usuário pode fazer requisições e verificar os pedidos que estão pendentes na listagem.
```


## Executando

```bash
Crie um arquivo .env a partir do .env.example
Preencha os valores com suas informações locais

Caso não tenha um banco de dados postgres pode executar um docker-compose up para obter um container executando.

# development
$ npm run start

# production mode
$ npm run start:prod

# Google cloud run
- Criar pipeline CI/CD com cloud build utilizando o Dockerfile
- Criar instancia do cloud run utilizando a imagem da aplicação como source code
```


## Features
- Integração com correios
- Processamento automático do pedido ao receber código dos correios.
