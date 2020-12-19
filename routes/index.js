const routerx = require('express-promise-router');
const apiRouterUser = require('./api/users.js');
const apiRouterCategoria = require('./api/categoria');
const apiRouterArticulo = require('./api/articulo');

const router = routerx();

//Actualización reto4**
router.use('/usuario', apiRouterUser); 
//Actualización reto4**
router.use('/categoria', apiRouterCategoria); 
// //Actualización reto4**
router.use('/articulo', apiRouterArticulo); 


module.exports = router;

