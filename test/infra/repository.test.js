"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const chai_1 = require("chai");
const repository_1 = require("../../server/infra/repository");
describe('Repository', () => {
    class User {
        constructor(id, email) {
            this.id = id;
            this.email = email;
        }
    }
    var userFound = new User(1, "user@gmail.com");
    it('Should create a repository', () => {
        var session = {};
        var repostory = new repository_1.Repository(session);
        chai_1.assert.isDefined(repostory.session);
    });
    it('Should find a entity', () => __awaiter(this, void 0, void 0, function* () {
        var asPromise = () => {
            return Promise.resolve(userFound);
        };
        var findOne = (query) => {
            return {
                asPromise: asPromise
            };
        };
        var query = (T) => {
            return {
                findOne: findOne
            };
        };
        var session = {
            query: query
        };
        var repository = new repository_1.Repository(session);
        var email = userFound.email;
        var user = yield repository.get(User, { email: email });
        chai_1.assert.equal(email, user.email);
    }));
    it('Should save a entity', (done) => __awaiter(this, void 0, void 0, function* () {
        var save = (user) => {
            done();
        };
        var session = {
            save: save
        };
        var repostory = new repository_1.Repository(session);
        var user = new User(2, "user2@gmail.com");
        yield repostory.save(User, user);
    }));
});
