const express = require('express');
const routes = require('./routes')
const mongoose = require('mongoose');
const bodyParser= require('body-parser')
const cors = require('cors')
require('dotenv').config({path: 'variables.env'})
//Cors permite el intercambio de recursos


//conectar mongodb
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL , {
    useNewUrlParser: true,
  
})

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const whitelist = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: (origin, callback) => {
        //revisar si la peticion viene de un servidor que esta en whitelist
        const existe = whitelist.some(dominio => dominio === origin)
        if (existe) {
            callback(null, true)
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}


app.use(cors(corsOptions))
//carpeta publica
app.use(express.static('uploads'))

app.use('/', routes())


const host = process.env.HOST ||  '0.0.0.0'
const port = process.env.PORT || 5173


app.listen(port,host, () => {
    console.log('El servidor esta funcionando')
}
)
