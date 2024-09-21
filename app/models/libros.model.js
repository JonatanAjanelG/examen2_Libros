module.exports = (sequelize,Sequelize) => {

    const Libros = sequelize.define('libro', {

        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: Sequelize.STRING
        },
        id_autor:{
            type: Sequelize.INTEGER
        },
        isbn:{
            type: Sequelize.STRING
        },
        editorial:{
            type: Sequelize.STRING
        },
        anio_publicacion:{
            type: Sequelize.INTEGER
        },
        categoria:{
            type: Sequelize.STRING
        },
        cantidad_disponible:{
            type: Sequelize.INTEGER
        },
        ubicacion:{
            type: Sequelize.STRING
        }
    });
    
    return Libros;
}