const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },

    edad: {
        type: Number,
        require: true
    },

    dni: {
        type: Number,
        require: true
    },

    email: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('User', userSchema)