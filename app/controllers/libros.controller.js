const db = require('../config/db.config.js');
const Libros = db.Libros;

exports.create = (req, res) => {
    let libro = {};
    try {
        libro.titulo = req.body.titulo;
        libro.id_autor = req.body.id_autor;
        libro.isbn = req.body.isbn;
        libro.editorial = req.body.editorial;
        libro.anio_publicacion = req.body.anio_publicacion;
        libro.categoria = req.body.categoria;
        libro.cantidad_disponible = req.body.cantidad_disponible;
        libro.ubicacion = req.body.ubicacion;

        // Create the new book in the database
        Libros.create(libro).then(result => {
            res.status(200).json({
                message: "Libro guardado con éxito, ID: " + result.id,
                libro: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo crear este libro en la BD",
            error: error.message,
        });
    }
};

exports.retrieveAllLibros = (req, res) => {
    Libros.findAll().then(librosInfos => {
        res.status(200).json({
            message: "Listado de Libros:",
            libros: librosInfos,
        });
    }).catch(err => {
        res.status(500).json({
            message: "Error -> " + err.message,
        });
    });
};

exports.getLibroById = (req, res) => {
    Libros.findByPk(req.params.id).then(libroInfo => {
        if (!libroInfo) {
            return res.status(404).json({
                message: "No se encontró el libro con el ID: " + req.params.id,
            });
        }

        res.status(200).json({
            message: "El libro con el ID: " + req.params.id + " es:",
            libro: libroInfo,
        });
    }).catch(err => {
        res.status(500).json({
            message: "Error -> " + err.message,
        });
    });
};

exports.updateLibroById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libros.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No se encontró ningún libro con el ID = " + libroId,
                error: "404",
            });
        } else {
            let updatedObject = {
                titulo: req.body.titulo,
                id_autor: req.body.id_autor,
                isbn: req.body.isbn,
                editorial: req.body.editorial,
                anio_publicacion: req.body.anio_publicacion,
                categoria: req.body.categoria,
                cantidad_disponible: req.body.cantidad_disponible,
                ubicacion: req.body.ubicacion,
            };

            let result = await Libros.update(updatedObject, { returning: true, where: { id: libroId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar los datos del Libro con el ID = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Libro actualizado correctamente con el ID = " + libroId,
                libro: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Error de Libro con el ID = " + req.params.id,
            error: error.message,
        });
    }
};

exports.deleteLibroById = (req, res) => {
    Libros.destroy({
        where: {
            id: req.params.id,
        },
    }).then(num => {
        if (num == 1) {
            res.status(200).json({
                message: "El libro con el ID: " + req.params.id + " ha sido eliminado correctamente",
            });
        } else {
            res.status(404).json({
                message: "No se encontró el libro con el ID: " + req.params.id,
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: "Error -> " + err.message,
        });
    });
};
