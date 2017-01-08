"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class Repository {
    constructor(session) {
        this.session = session;
    }
    get(ctr, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.session.query(ctr).findOne(query).asPromise();
        });
    }
    all(ctr) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.session.query(ctr).findAll().asPromise();
        });
    }
    save(ctr, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.session.save(entity, (err) => {
                    if (err)
                        reject(err);
                    resolve();
                });
            });
        });
    }
}
exports.Repository = Repository;
