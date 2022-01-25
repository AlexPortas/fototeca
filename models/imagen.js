// "Base de datos" de las fotos que me han subido al servidor
let fotos =  [{
    titulo: 'Bosque',
    url: 'https://i.picsum.photos/id/260/200/200.jpg?hmac=Nu9V4Ixqq3HiFhfkcsL5mNRZAZyEHG2jotmiiMRdxGA',
    fecha: '2012-01-14',
    color: '150,95,25'
},
{
    titulo: 'Faro',
    url: 'https://i.picsum.photos/id/870/200/300.jpg?blur=2&grayscale&hmac=ujRymp644uYVjdKJM7kyLDSsrqNSMVRPnGU99cKl6Vs',
    fecha: '2022-01-12',
    color: '24,78,122'
},
{
    titulo: 'Montaña',
    url: 'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
    fecha: '2021-01-01',
    color: '80,0,100'
}
];

ordenarFechaDecreciente(fotos);

exports.añadirNuevaImagen = (titulo, url, fecha, color) => {

    let imagen = {
        titulo,
        url,
        fecha,
        color
    };

    fotos.push(imagen);

    ordenarFechaDecreciente(fotos);
};

exports.existeImagenBBDD = (url) => {

    let encontrado = fotos.some(foto => url == foto.url)

    return encontrado;
};

exports.obtenerImagenes = () => {
    return fotos;
};


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
}