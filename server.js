const express = require("express");
const cors = require("cors");
const { response } = require("express");

const app = express();

var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  };
app.use(cors(corsOptions));


const keys = require('./app/settings/keys')
app.set('key', keys.key)


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const jwt = require('jsonwebtoken')
const verification = express.Router()
verification.use( (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']

    if(!token) {
        return res.status(401).send({
            error: 'Token Inválido'
        })
    }
    if(token.startsWith('Bearer ')){
        token = token.slice(7, token.length)
    }
    if(token){
        jwt.verify(token, app.get('key'), (error, decoded) => {
            if (error) {
                return res.status(401).send({
                    error: 'Token Inválido'
                })
            } else {
                req.decoded = decoded
                next()
            }
        })
    }
})

require("./app/routes/ventas.routes")(app, verification);
require("./app/routes/login.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});