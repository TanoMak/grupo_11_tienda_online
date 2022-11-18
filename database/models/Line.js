module.exports = (sequelize, dataTypes) => {

    let alias = 'line_product';

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
        tableName: 'line_product'
    };

    
    const LineProduct = sequelize.define(alias, cols, config);


    return LineProduct;
};