module.exports = (sequelize, dataTypes) => {

    let alias = 'Line';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING
        },
    };
    
    let config = {
        timestamps: false,
        tableName: 'line_product'
    };

    
    const Line = sequelize.define(alias, cols, config);

    Line.associate = function(models){
        Line.hasMany(models.Product, {
            as : "Product",
            foreignKey : "line_id"
        })
    }

    return Line;
};