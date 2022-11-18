module.exports = (sequelize, dataTypes) => {

    let alias = 'Image';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING
        },
        path: {
            type: dataTypes.STRING
        }
    };
    
    let config = {
        timestamps: false,
        tableName: 'images'
    };

    
    const Image = sequelize.define(alias, cols, config);


    return Image;
};