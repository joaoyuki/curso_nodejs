require('marko/node-require').install();
require('marko/express');
const express = require('express');

// Vamos usar o objeto que o express retorna para configurar a aplicação
const app = express();

const rotas = require('../app/rotas/rotas');

const bodyParser = require('body-parser');

const methodOverride = require('method-override');

//Criamos um novo midleware para que, toda vez que a URL /estatico foi chamado,  o express vai ativar o midleware ativado pelo comando .static
app.use('/estatico', express.static('src/app/public'));

// bodyParser.urlencoded() define como o body-parser vai funcionar
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use('*', (req, res, next) => {
    console.log('1.1');
    next();
    console.log('1.2');
 });
 
 app.use('*', (req, res, next) => {
    console.log('2.1');
    next();
    console.log('2.2');
 });

 app.use('*', (req, res, next) => {
    const inicio = new Date().getTime();
    next();
    const final = new Date().getTime();
 
    const milissegundosDecorridos = final - inicio;
    console.log(milissegundosDecorridos);
 });

// Forçamos o nosso módulo a receber um parâmetro, nesse caso, a constante app
rotas(app);

// Informamos ao node que o módulo esta exportante o app
module.exports = app;