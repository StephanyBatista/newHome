import {assert} from 'chai';
import {User} from '../../server/model/user';

var name = "user";
var email = "user@gmail.com";
var birthday = new Date('25/11/1985');

describe('domain user', () => {
    it('should be able create a user', () => {
        
        var user = new User(name, email, birthday);

        assert.equal(user.name, name);
        assert.equal(user.email, email);
        assert.equal(user.birthday, birthday);
    });

    it('should not create without name', () => {
        
        assert.throws(() => {new User(null, email, birthday)}, "Name is required");
    });

    it('should not create without email', () => {
        
        assert.throws(() => {new User(name, null, birthday)}, "E-mail is required");
    });

    it('should not create without birthday', () => {
        
        assert.throws(() => {new User(name, email, null)}, "Birthday is required");
    });

    it('should set the password', () => {
        
        var user = new User(name, email, birthday);
        var password = "xpt45";

        user.updatePassword(password);

        assert.equal(user.password, password);
    });
});