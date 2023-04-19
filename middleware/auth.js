const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        const error = new Error('No auttenticado, no hay JWT')
        error.statusCode = 401
        throw error;
    }
   
    const token = authHeader.split(' ')[1]
 
    try {
        revisarToken = jwt.verify(token,'CRM');

    } catch (error) {
        error.statusCode = 500
        throw error;
    }

    //si es un token valido pero hay algun error

    if (!revisarToken) {
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }
    next();

   

}