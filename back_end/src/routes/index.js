const authRouter = require('./modules/auth');
const categoryRouter = require('./modules/category');
const productRouter = require('./modules/product');
const orderRouter = require('./modules/order');
const userRouter = require('./modules/user');
const chatRouter = require('./modules/chat');
const roomRouter = require('./modules/room');
const logRouter = require('./modules/log')
const fillterRouter = require('./modules/filter')
const blogRouter = require('./modules/blog')
const commentRouter = require('./modules/commentBlog')
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
  app.use('/blog', blogRouter)
  app.use('/comment-blog', commentRouter)
}
module.exports = route;