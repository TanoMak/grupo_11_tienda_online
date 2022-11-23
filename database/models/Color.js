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
        timestamps: true,
        tableName: 'colors',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid : true
    };

    
    const Color = sequelize.define(alias, cols, config);


    return Color;
};