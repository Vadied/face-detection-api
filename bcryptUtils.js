const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async password => bcrypt.hashSync(password, saltRounds);
const comparePassword = async (plain, hash) => bcrypt.compareSync(plain, hash);

module.exports = {
    hashPassword,
    comparePassword
};