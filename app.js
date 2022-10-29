const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const mainRouter = require("./routes/mainRoutes");
const userRouter = require("./routes/userRoutes");
const productsRouter = require("./routes/productsRoutes");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', mainRouter); 
app.use("/users", userRouter);
app.use('/products', productsRouter);
app.use('/users', userRouter);




app.listen(3030, () => {
  console.log("Servidor corriendo, puerto 3030");
});
