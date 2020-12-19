const routerx = require('express-promise-router');
// const router = require('express').Router();
const userController = require ('../../controllers/UserController'); 
const auth = require('../../middlewares/auth')

const router = routerx();

router.get('/list',auth.verifyUsuario,userController.listar); //agregue list*****
router.post('/register',auth.verifyUsuario,userController.register);
router.put('/update',auth.verifyUsuario ,userController.update);

router.post('/login',userController.login);


module.exports = router;