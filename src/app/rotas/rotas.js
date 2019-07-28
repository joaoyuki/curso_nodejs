// Com esse require, estamos criando uma instancia do banco de dados dentro da constante db
const db = require('../../config/database');

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
        db.all('select * from livros', function(erro, resultados){
            res.marko(
                require('../views/livros/listagem/listagem.marko'), 
                {
                    livros: resultados
                }
            );
        });
    });

}