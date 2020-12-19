const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const models = require('../models');
const tokenServices = require('../services/token.js');

exports.login = async (req, res, next) => {
    try {
        
        const user = await models.Usuario.findOne({ where: { email : req.body.email } });

        if (user ) {
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            
            if (passwordIsValid) {
                const token = await tokenServices.encode(user)
                res.status(200).send({
                    auth: true,
                    tokenReturn: token,
                    
                    user: user
                })
            } else {
                res.status(401).json({

                    error: 'Error en el usuario o contraseña'
                })

            }
        } else {
            res.status(404).json({

                error: 'User Not Found.'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error aqui->',



        })
        next(error);
    }
};

exports.register = async (req, res, next) => {
    try {
        const user = await models.Usuario.findOne({ where: { email : req.body.email } });
        // const prueba = user.email
        // if (req.body.email === await models.Usuario.findOne({ WHERE: { email : req.body.email } })) {
        if (user) {
            res.status(409).send({
                message: "Sorry the email is already use you want "+ req.body.email+
                " and there is a "
                
                
            })
        } else {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const user = await models.Usuario.create(req.body);
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).send({
            message: "Error --> " 
        })
        next(error);

    }
    
};


exports.listar = async (req, res, next) => {
    try {
        const user = await models.Usuario.findAll();

        if (user) {

            res.status(200).json(user);
        } else {
            res.status(404).send({
                message: "There is no user in the system"
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "Error!!"
        })
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const user = await models.Usuario.findOne({ where: { email : req.body.email } });

        if (user){

            const user = await models.Usuario.update({name: req.body.name},
                {
                    where: {
                        email: req.body.email
                    },
            });
            res.status(200).json(user);
        } else {
            res.status(404).send({
                message: "User not found."
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "Error!!"
        })
        next(error);
    }
};