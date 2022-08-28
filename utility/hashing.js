const bcrypt= require('bcrypt');

function generateHash(password) {
    return bcrypt.hashSync(password, 10);
}
module.exports = {
    generateHash
}
