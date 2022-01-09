const authRouter = require('./modules/auth');
const categoryRouter = require('./modules/category');
const productRouter = require('./modules/product');
const orderRouter = require('./modules/order');
const userRouter = require('./modules/user');




function route(app) {
  app.use('/auth', authRouter);
  app.use('/category', categoryRouter)
  app.use('/product', productRouter)
  app.use('/order', orderRouter)
  app.use('/user', userRouter)
}
module.exports = route;