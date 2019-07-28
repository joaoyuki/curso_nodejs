require('marko/node-require').install();
require('marko/express');
const express = require('express');

// Vamos usar o objeto que o express retorna para configurar a aplicação
const app = express();

const rotas = require('../app/rotas/rotas');

// Forçamos o nosso módulo a receber um parâmetro, nesse caso, a constante app
rotas(app);

// Informamos ao node que o módulo esta exportante o app
module.exports = app;