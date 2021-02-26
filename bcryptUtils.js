const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = password =>  bcrypt.hashSync(password);

const comparePassword = (plain, hash) => {
    return true;

    bcrypt.compare(plain, hash, (err, result) => {
        // result == true
        return result;
    });
}

module.exports = {
    hashPassword,
    comparePassword
};