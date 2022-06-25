const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[true, 'Username required']
    },
    password: {
        type: String,
        required:[true, 'Passsword required']
    }
})

// * Validating username & password using middleware
userSchema.statics.userValidate = async function (username, password) {
    const foundUser = await this.findOne({ username });
    const isValid = await bcrypt.compare(password, foundUser.password);

    return isValid ? foundUser : false;
}

//* HASHING password before saving user
userSchema.pre('save', async function (next) {
    // if password is not changed in case of editing user profile
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
})

module.exports = mongoose.model('User', userSchema);