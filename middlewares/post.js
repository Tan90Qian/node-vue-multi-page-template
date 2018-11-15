function apply404Middlewares(app) {
  app.use(function(req, res, next) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
      res.render('pages/404.art', { url: req.url });
      return;
    }

    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
  });
}

function applyRequestErrorMiddleware(app) {
  app.use((error, req, res, next) => {
    if (error) {
      res.status(500).send(error);
    } else {
      next();
    }
  });
}

// app: express-instance
export default function(app) {
  applyRequestErrorMiddleware(app);
  apply404Middlewares(app);
}
