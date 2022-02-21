const userR = require ('./userResolver');
const orderR = require ('./orderResolver');
const movieR = require('./movieResolver');
const serieR = require('./serieResolver');
const personR = require('./personResolver');
const categoryR = require('./categoryResolver');
const profilR = require('./profilResolver');
const profilImageR = require('./profilImageResolver');

module.exports =  listResolvers = [userR, orderR, categoryR,movieR, serieR, personR, profilR, profilImageR]