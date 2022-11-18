module.exports = (sequelize, dataTypes) => {

    let alias = 'Color';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING
        }};
    
    let config = {
        timestamps: false,
        tableName: 'colors'
    };

    
    const Color = sequelize.define(alias, cols, config);


    return Color;
};