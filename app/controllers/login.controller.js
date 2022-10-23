const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
    if(req.body.user === 'admin' && req.body.pass === '123456') {
        const payload = {
            check: true
        }
        const token = jwt.sign(payload, req.app.get('key'), {
            expiresIn: '1d'
        })

        res.json({
            message: 'Login correcto',
            token
        })
    } else {
        res.json({
            message: 'Usuario o contraseña incorrectos'
        })
    }
};

exports.logout = (req, res) => {
    
};