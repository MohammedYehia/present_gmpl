import models from './database/models/index';
import app from './app';

const port = app.get('port');

models.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`see magic on port ${port}`);
  });
}).catch((e) => {
  console.warn('error', e);
});
