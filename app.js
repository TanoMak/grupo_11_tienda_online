const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const session = require("express-session");
const mainRouter = require("./routes/mainRoutes");
const userRouter = require("./routes/userRoutes");
const productsRouter = require("./routes/productsRoutes");
const localsMiddleware = require('./middlewares/localsMiddlware');
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");
const cookieParser = require('cookie-parser');
const models = require('./database/models').default


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret:"Secreto",
  resave: false ,
  saveUninitialized: true 
}));

app.use(localsMiddleware);
app.use(userLoggedMiddleware)


// Routers
app.use('/', mainRouter); 
app.use('/products', productsRouter);
app.use('/users', userRouter);


app.listen(3030, () => {
  console.log("Servidor corriendo, puerto 3030");
});
