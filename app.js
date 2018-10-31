import express from 'express';
import path from 'path';
import applyPriorMiddlewares from './middlewares/prior';
import applyPostMiddlewares from './middlewares/post';
import homeController from './controllers/home-controller';
import userController from './controllers/user-controller';

const app = express();
app.set('views', __dirname + '/views');
// app.set('view engine', 'pug')
// app.set('view engine','ejs');
app.engine('art', require('express-art-template'));
applyPriorMiddlewares(app);
app.use(express.static(path.resolve(__dirname, 'static')));

// router
app.get('/', homeController.index);
app.get('/users', userController.users);
app.get('/user/:id', userController.user);

applyPostMiddlewares(app);

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
