import * as express from 'express';
import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';

passport.use(
  new LocalStrategy(function(username, password, done) {
    if (username === 'admin' && password === 'secret') {
      return done(null, username);
    } else {
      return done('Invalid Credentials');
    }
  })
);

@Middleware({ type: 'before' })
export class AuthMiddleware implements ExpressMiddlewareInterface {
  authenticate = (callback: (err: any, user: any, info: any) => any) =>
    passport.authenticate('local', { session: false }, callback);

  async use(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<passport.Authenticator> {
    return this.authenticate((err, user, info) => {
      if (err || !user) {
        res.status(401).send(err);
        return;
      }
      return next();
    })(req, res, next);
  }
}
