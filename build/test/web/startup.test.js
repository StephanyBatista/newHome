// import * as express from 'express';
// import * as sinon from 'sinon';
// import {assert} from 'chai';
// import {Startup} from '../../server/web/startup';
// import {RouterManager} from '../../server/web/router.manager';
// import {ErrorsHandler} from '../../server/web/middlewares/errors.handler'
// import {SessionFactory} from "hydrate-mongodb";
// describe('Web Startup', () => {
//     var routerManager = <RouterManager>{
//         router: {
//             post: (path, func) => {},
//             put: (path, func) => {},
//             get: (path, func) => {}
//         }
//     };
//     var errorsHandler = <ErrorsHandler>{
//         generic: (err, req, res, next) => {}
//     };
//     var sessionFactory: SessionFactory = null;
//     it('should create the app', () =>  {
//         var app = <express.Application>{
//             use: (param: any) => {},
//             set: (param1: any, param2: any) => {},
//             get: (param: any) => {return ''},
//             engine: (param1: any, param2: any) => {}
//         };
//         var startup = new Startup(app, routerManager, errorsHandler, sessionFactory);
//         assert.isDefined(startup.app);
//     });
//     it('shoud set the routers througt of the routers manager', () =>{
//         var app = <express.Application>{
//             use: (func) => {},
//             engine: (param1: any, param2: any) => {},
//             set: (param1: any, param2: any) => {},
//             get: (param: any) => {return ''}
//         };
//         var useSpy = sinon.spy(app, 'use');
//         var startup = new Startup(app, routerManager, errorsHandler, sessionFactory);
//         sinon.assert.calledWith(useSpy, '/', routerManager.router);
//     });
//     it('shoud set the middleware of erros generic', () =>{
//         var errorsHandler = new ErrorsHandler();
//         var funcExpected = errorsHandler.generic;
//         var app = <express.Application>{
//             use: (func) => {},
//             engine: (param1: any, param2: any) => {},
//             set: (param1: any, param2: any) => {},
//             get: (param: any) => {return ''}
//         };
//         var useSpy = sinon.spy(app, 'use');
//         var startup = new Startup(app, routerManager, errorsHandler, sessionFactory);
//         sinon.assert.calledWithExactly(useSpy, funcExpected);
//     });
//     it('should start the listener', (done) =>  {
//         var app = <express.Application>{
//             use: (param: any) => {},
//             set: (param1: any, param2: any) => {},
//             get: (param: any) => {return ''},
//             engine: (param1: any, param2: any) => {},
//             listen: (port, callback) => {
//                 assert.equal('3000', port);
//                 process.nextTick(callback);
//             },
//             on: (type, func) => {}
//         };
//         var startup = new Startup(app, routerManager, errorsHandler, sessionFactory);
//         startup.listen("3000", done);
//     });
//     it('should have a option to select the port of the app', (done) =>  {
//         var app = <express.Application>{
//             use: (param: any) => {},
//             set: (param1: any, param2: any) => {},
//             get: (param: any) => {return ''},
//             engine: (param1: any, param2: any) => {},
//             listen: (port, callback) => {
//                 assert.equal('4000', port);
//                 process.nextTick(callback);
//             },
//             on: (type, func) => {}
//         };
//         var startup = new Startup(app, routerManager, errorsHandler, sessionFactory);
//         startup.listen('4000', done);
//     });
// });
//# sourceMappingURL=startup.test.js.map