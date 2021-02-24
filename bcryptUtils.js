const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = password => {    
bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) =>{
        // Store hash in your password DB.
    });
});
}

const comparePassword = (plain, hash) => {
    bcrypt.compare(plain, hash, (err, result) => {
        // result == true
    });
}

module.exports = {
    hashPassword,
    comparePassword
};