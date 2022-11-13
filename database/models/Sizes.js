module.exports = (sequelize, dataTypes) => {

    let alias = 'sizes';

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
    };
    
    let config = {
        timestamps: false,
        tableName: 'sizes'
    };

    
    const Sizes = sequelize.define(alias, cols, config);


    return Sizes;
};