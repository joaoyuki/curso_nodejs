// Com esse require, estamos criando uma instancia do banco de dados dentro da constante db
const db = require('../../config/database');

// Ficou o L maisculo por ser uma referência a uma classe
const LivroDao = require('../infra/livro-dao');

// Esrou exportando uma função do módulo capaz de receber um parâmetro chamado app
module.exports = (app) => {

    app.get('/', function(req, res){
        res.end(`
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1> Casa do código </h1>
                </body>
            </html>
        `);
    });

    app.get('/livros', function(req, res) {
        const livroDao = new LivroDao(db);
        livroDao.lista()
            .then(livros => {
                res.marko(
                    require('../views/livros/listagem/listagem.marko'), 
                    {
                        livros: livros
                    }
                );  
            })
            .catch(erro => console.log(erro));
        });


    app.get('/livros/form', function(req, res) {
        res.marko(require('../views/form/form.marko'), {livro: {} });
    });

    app.post('/livros', function(req, res) {
        console.log(req.body);

        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
            .then(res.redirect('/livros'))
            .catch(erro => console.log(erro));        
    });

    app.delete('/livros/:id', function (req, res) {
        const idLivro = req.params.id; //O express identifica que o :alguma coisa é uma variável.
        const livroDAO = new LivroDao(db);
        livroDAO.remove(idLivro)
            .then(() => res.status(200).end())
            .catch(erro => console.log(erro));
    });

    app.get('/livros/form/:id', function(req, res) {
        const id = req.params.id;
        const livroDAO = new LivroDao(db);

        livroDAO.buscaPorId(id)
            .then(livro => 
                res.marko(
                    require('../views/form/form.marko'), {livro : livro}))
            .catch(erro => console.log(erro));
    });
   

}