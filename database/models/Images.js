module.exports = (sequelize, dataTypes) => {

    let alias = 'images';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRINF
        },
        path: {
            type: dataTypes.STRINF
        }
    };
    
    let config = {
        timestamps: false,
        tableName: 'images'
    };

    
    const Image = sequelize.define(alias, cols, config);


    return Image;
};