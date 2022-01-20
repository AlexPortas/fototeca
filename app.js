// Importamos la biblioteca de terceros 'express'
const express = require('express');

// Crear una nueva instancia del objeto Express
const app = express();

// "Base de datos" de las fotos que me han subido al servidor
let fotos = [];

// Si te vienen peticiones POST; procesalas adecuadamente (enriquece el objeto req con la propiedad body)
app.use(express.urlencoded({ extended: false }))

// Ofrece una carpeta en el servidor para poder 'colgar' todos los recursos que deben ser accedidos sin reestrición y de manera directa por parte del cliente
app.use(express.static('public'));

// el método .set modifica una característica de nuestro servidor. Mi motor por defecto de plantillas va a ser EJS
app.set('view engine', 'ejs');


// Define un endpoint a la URL '/', método GET, y ejecutrá la función de callback del segundo parámetro cada vez que reciba una petición

app.get('/', function (req, res) {
    res.render("pages/index", {
        numFotos: fotos.length,
        fotos
    });
    console.log("req.body en raiz:",req.body);
})

app.get('/nueva-foto', (req, res) => {
    res.render("pages/form", {
        error: "",
        info: ""
    });
    console.log("req.body:",req.body);
});

// endpoint recibir peticiones de tipo POST a '/nueva-foto'; y de momento, simplemente hacer un console.log del objeto req.body
app.post('/nueva-foto', (req, res) => {
    // 1 Crear un nuevo objeto que almacene los campos de la foto
    console.log("cuerpo de req:",req.body);
    let foto = {
        titulo: req.body.nombre,
        url: req.body.url,
        fecha: req.body.fecha
    }

    let fotoExiste = existeFotoBBDD(req.body.url);
    if (fotoExiste) {
        // Devolver al usuario a la página del formularo indicándole que la URL ya existe
        res.render("pages/form", {
            error: `La URL ${req.body.url} ya existe.`
        })

        return; // debo salir de la función para no ejecutar más código
    }

    // 2 Añadir el objeto al array fotos
    fotos.push(foto);

    // 3. REspondar el cliente con un mensaje simple diciendo el número de foto que hay subidas hasta el momento
    res.status(201).render("pages/form", {
        info: `Imagén subida correctamente`
    });
});


/**
 * Función que determina si existe una foto en la base de datos 'fotos'
 * 
 * @param {string} url URL de la foto que quieres comprobar
 */
// function existeFotoBBDD(url) {
//     let existeFoto = false;
//     let i = 0;

//     while (!existeFoto && i < fotos.length) {
//         existeFoto = fotos[i].url == url;
//         i++;
//     }

//     return existeFoto;
// }

function existeFotoBBDD(url) {

    let encontrado = fotos.some(foto => url == foto.url)

    return encontrado;
}

app.listen(3000);