import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { UserController } from './controllers/UserController';
import { createConnection } from 'typeorm';

require('dotenv').config();
const port = process.env.PORT || 3000;

createConnection()
  .then(async connection => {
    const app = createExpressServer({
      controllers: [UserController]
    });
    app.listen(port, () => console.log(`listening ${port}`));
  })
  .catch(e => console.error(e));
