import {assert} from 'chai';
import {User} from '../../server/model/user';

var name = "user";
var email = "user@gmail.com";
var birthday = new Date('25/11/1985');

describe('Domain User', () => {
    it('should be able create a user', () => {
        
        var user = new User(null, name, email, birthday);

        assert.equal(user.name, name);
        assert.equal(user.email, email);
        assert.equal(user.birthday, birthday);
    });

    it('should be able create a user with id', () => {
        
        var id = "5";
        var user = new User(id, name, email, birthday);

        assert.equal(user.name, name);
        assert.equal(user.email, email);
        assert.equal(user.birthday, birthday);
        assert.equal(user.id, id);
    });

    it('should say that user has id', () => {
        
        var id = "5";
        var user = new User(id, name, email, birthday);

        assert.isTrue(user.hasId());
    });

    it('should say that user does not have id', () => {
        
        var id = null;
        var user = new User(id, name, email, birthday);

        assert.isFalse(user.hasId());
    });

    it('should not create without name', () => {
        
        assert.throws(() => {new User(null, null, email, birthday)}, "Name is required");
    });

    it('should not create without email', () => {
        
        assert.throws(() => {new User(null, name, null, birthday)}, "E-mail is required");
    });

    it('should not create without birthday', () => {
        
        assert.throws(() => {new User(null, name, email, null)}, "Birthday is required");
    });

    it('should set the password', () => {
        
        var user = new User(null, name, email, birthday);
        var password = "xpt45";

        user.updatePassword(password);

        assert.equal(user.password, password);
    });
});