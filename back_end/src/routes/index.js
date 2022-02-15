const authRouter = require('./modules/auth');
const categoryRouter = require('./modules/category');
const productRouter = require('./modules/product');
const orderRouter = require('./modules/order');
const userRouter = require('./modules/user');
const chatRouter = require('./modules/chat');
const roomRouter = require('./modules/room');
function route(app) {
  app.use('/auth', authRouter);
  app.use('/category', categoryRouter)
  app.use('/product', productRouter)
  app.use('/order', orderRouter)
  app.use('/user', userRouter)
  app.use('/chat', chatRouter)
  app.use('/room', roomRouter)
}
module.exports = route;