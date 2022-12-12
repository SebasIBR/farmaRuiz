const express = require('express');
const path = require('path');
const methodOverride= require('method-override');
const session=require('express-session');
const coolieParser= require('cookie-parser')
const routerProductos = require('./routers/routerProductos');
const routerMain = require('./routers/routerMain');
const routerUsuarios = require('./routers/routerUsuarios');
const routerCarrito = require('./routers/routerCarrito');
const cors = require('cors');

const app = express();

app.use('/public', express.static(path.resolve(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method')) 
app.use (session({secret:"Identificador de Seguridad", resave: true,saveUninitialized: false,}))
app.use(coolieParser());
app.use(cors());

const mdUserCookie = require('./middlewares/mdUserCookie.js');
app.use(mdUserCookie)

app.set('view engine', 'ejs');
app.set('views', '../views');

app.use('/', routerMain);
app.use('/', routerProductos);
app.use('/', routerUsuarios);
app.use('/', routerCarrito);


app.use((req,res,next)=>{
    res.status(404).render('not-found', {errno: 404, errmsg:"Pagina no encontrada."});
})

app.listen(process.env.PORT || 3001);
