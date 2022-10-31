const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const mainRouter = require("./routes/mainRoutes");
const userRouter = require("./routes/userRoutes");
const productsRouter = require("./routes/productsRoutes");
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const cookies = require('cookie-parser');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(methodOverride("_method"));

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}))

app.use(cookies());

app.use(userLoggedMiddleware);


app.use('/', mainRouter); 
app.use('/products', productsRouter);
app.use('/users', userRouter);



/* app.use("home", indexRoutes)  */
app.use(express.static(path.join(__dirname, "./public")));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* app.use(indexRoutes.default); */



app.listen(3030, () => {
  console.log("Servidor corriendo, puerto 3030");
});
