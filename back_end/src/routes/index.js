const authRouter = require('./modules/auth');
const categoryRouter = require('./modules/category');

function route(app) {
  app.use('/auth', authRouter);
  app.use('/category', categoryRouter)
}
module.exports = route;