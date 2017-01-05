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
    var session = {
        query: (T) => {
            return {
                findOne: (query) => {
                    return {
                        asPromise: () => {
                            return new Promise((resolve, reject) => { return new User(); });
                        }
                    };
                }
            };
        }
    };
    var repostory = new repository_1.Repository(session);
    it('Should create a repository', () => {
        chai_1.assert.isDefined(repostory.session);
    });
    it('Should find a entity', () => __awaiter(this, void 0, void 0, function* () {
        var repostory = new repository_1.Repository(session);
        var email = "email@email";
        var user = yield repostory.get(User, { email: email });
        chai_1.assert.equal(email, user.email);
    }));
});
class User {
}
