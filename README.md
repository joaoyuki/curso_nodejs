## Acessando o Banco de dados (28/07/2019)

- Versão do nodeJs
- - 10.x

- Instalando o sqlIte
- - > npm install sqlite3@4.0.2 --save-exact

- Rodando a aplicação
- - Com o nodemon
- - - npm start

## O padrão DAO (28/07/2019)

## DAO com Promises (28/07/2019)

- O padrão do javascript para trabalhar com funções assincronas, é utilizar Promises

## Middlewares (02/08/2019)

- Middlewares são filtros, aonde podemos manipular a nossa requisição antes dela chegar na nossa rota
- Para conseguirmos pegar os dados da requisição, precisamos instalar o body-parser
- - > npm install body-parser@1.18.3 --save-exact

- Para se aprofundar um pouco mais nas possibilidades que os middlewares nos oferecem, João pesquisou um pouco sobre o assunto e descobriu que o método use() do Express pode receber dois parâmetros, sendo o primeiro uma string que define as URLs que serão atendidas pelo middleware e como segundo parâmetro uma função. É essa função que irá definir o que o middleware deverá fazer e, por sua vez, recebe três parâmetros, a requisição, a resposta e uma função (normalmente chamada de next) que deve ser invocada para que o Express avance para o próximo middleware existente e caso não exista mais nenhum, passa a execução para a rota ativada. Sendo assim, a ordem em que os middlewares são definidos é de extrema importância! Além disso, um detalhe a ser observado, é que tudo que estiver antes da chamada da função next será executado antes da rota ativada e o que estiver após a chamada da função next será executado somente ao término da rota ativada!

- Configurando o middleware do **express** para acessar arquivos estáticos

``` javascript
const express = require('express');
const app = express();

app.use('/estatico', express.static('src/app/public'));
```

## Rotas

### Passando parâmetro pela rota

- Para passarmos parâmetros pela rota, usamod o **:**, como no exemplo abaixo:
``` javascript
    app.get('livros/form/:id')
``` 
- - Estamos esperando um variável com o nome **id** e recuperamos o valor dela pelo objeto request que é usado na função callback:
``` javascript
const variavelQueRecebeOId = req.params.id
```

``` javascript
    app.get('/livros/form/:id', function(req, res) {
        const id = req.params.id;
        const livroDAO = new LivroDao(db);

        livroDAO.buscaPorId(id)
            .then(livro => 
                res.marko(
                    require('../livros/form/form.marko'), {livro : livro}))
            .catch(erro => console.log(erro));
    });
```