const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const adminSchema = new mongoose.Schema({
    userid: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    emailverified: { type: Boolean, default: false },
    phoneverified: { type: Boolean, default: false },
    loginid: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    datecreated: { type: Date, default: Date.now },  // Automatically set on creation
    dateupdated: { type: Date }
});

// Pre-save hook to hash password before saving
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare input password with the hashed password
adminSchema.methods.comparePassword = async function (inputPassword) {
    return bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
