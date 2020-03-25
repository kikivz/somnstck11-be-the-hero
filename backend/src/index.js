const express = require('express');
const routes = require('./routes')
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({}))
app.use(routes);
/**
 * Métodos HTTP: 
 * GET: Buscar informaçao
 * POST: Criar informação 
 * PUT: Alterar informação 
 * DELETE: Apagar informação 
 */

/**
 * Tipos de parametros
 * 
 * Query: Parametros NOMEADOS enviados na rota apos o "?" (filtros, paginacao, etc ) "&" anexa parametros
 * Route: Parametros para identificar recursos (users/:id) 
 * Body: Corpo da requisiçao 
 */


/**
 * SQL: MySQL, SQLLite, PostgreSQL, Oracle, Microsoft SQL Server ....
 * NoSQL: MongoDB, CouchDB .....
 */

/**
 * Drive: SELECT * FROM users
 * Query: Builder: table('users').select('*').where()
 */



app.listen(3333);

