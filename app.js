import express from 'express';
import path from 'path';
import applyPriorMiddlewares from './middlewares/prior';
import applyPostMiddlewares from './middlewares/post';
import { getLogger, useLog } from './middlewares/log';
import homeController from './controllers/home-controller';
import userController from './controllers/user-controller';

const app = express();
app.set('views', path.posix.join(__dirname, 'views'));
app.engine('art', require('express-art-template'));

/* 应用日志中间件 */
const defaultLogger = getLogger();
app.use(useLog(defaultLogger));

applyPriorMiddlewares(app);
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.static(path.resolve(__dirname, 'public')));

// router
app.get('/', homeController.index);
app.get('/users', userController.users);
app.get('/user/:id', userController.user);

applyPostMiddlewares(app);

const port = process.env.NODE_ENV === 'development' ? 3000 : process.env.PORT;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
