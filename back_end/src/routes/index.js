const authRouter = require('./modules/auth');
const categoryRouter = require('./modules/category');
const productRouter = require('./modules/product');
const orderRouter = require('./modules/order');
const userRouter = require('./modules/user');
const chatRouter = require('./modules/chat');
const roomRouter = require('./modules/room');
const logRouter = require('./modules/log')
const fillterRouter = require('./modules/filter')
function route(app) {
  app.use('/auth', authRouter);
  app.use('/category', categoryRouter)
  app.use('/product', productRouter)
  app.use('/order', orderRouter)
  app.use('/user', userRouter)
  app.use('/chat', chatRouter)
  app.use('/room', roomRouter)
  app.use('/log', logRouter)
  app.use('/fillter-product', fillterRouter)
}
module.exports = route;