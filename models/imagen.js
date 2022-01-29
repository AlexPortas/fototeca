// Definir el esquema de esta entidad

const mongoose = require('mongoose');

const imagenSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        maxlength: 10
    },
    url: {
        type: String,
        required: true,
        validate: {
            validator: function (url) {
                return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(url);
            }
        }
    },
    fecha: {
        type: Date,
        required: true
    },
    color: mongoose.Schema.Types.Mixed
    // color: [] <-- Esto es tipo Mixed igualmente
});

Imagen = mongoose.model('imagenes', imagenSchema);

module.exports = Imagen


/*
function ordenarFechaDecreciente(fotos) {
    fotos.sort((foto1, foto2) => {
        // Si la fecha de la foto1 es mayor que la fecha de la foto2 (es más actual); debería ir más al principio
        // Más al principio significa que tenemos que devolver un número negativo (-1)

        if (foto1.fecha > foto2.fecha) {
            return -1;
        }
        if (foto1.fecha < foto2.fecha) {
            return 1;
        }
        return 0;
    });
}*/