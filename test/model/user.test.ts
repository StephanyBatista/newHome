import {assert} from 'chai';
import {User} from '../../server/model/user';

var name = "user";
var email = "user@gmail.com";
var birthday = new Date('1985/11/25');

describe('Domain User', () => {
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

    it('should not create with a birthday invalid', () => {
        
        assert.throws(() => {new User(name, email, new Date('25/11/1985'))}, "Birthday is not valid");
    });

    it('should set the password', () => {
        
        var user = new User(name, email, birthday);
        var password = "xpt45";

        user.updatePassword(password);

        assert.equal(user.password, password);
    });

    it('should not set the password in empty or null', () => {
        
        var user = new User(name, email, birthday);
        
        assert.throws(() => {user.updatePassword('')}, "Password is required");
        assert.throws(() => {user.updatePassword(null)}, "Password is required");
    });

    it('should validate the password to have minimum 3 characters', () => {
        
        var user = new User(name, email, birthday);
        
        assert.throws(() => {user.updatePassword('12')}, "Password must have in the minimum 3 characters");
    });
});